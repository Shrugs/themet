import React from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { Style } from '../constants'

// eslint-disable-next-line react/prop-types
const BannerEntry = ({ rec, onPress }) => (
  <TouchableHighlight
    underlayColor={'transparent'}
    key={rec.id}
    onPress={onPress}
  >
    <Image
      style={styles.listItem}
      resizeMode='cover'
      source={{ uri: rec.image_banner }}
    >
      <LinearGradient
        colors={[
          'transparent',
          'black',
        ]}
        style={styles.listItemTextContainer}
      >
        <Text style={[styles.listItemText, styles.listItemTitle]}>
          {rec.id}
        </Text>
        <Text style={[styles.listItemText, styles.listItemTitle]}>
          {rec.title}
        </Text>
        <Text style={[styles.listItemText, styles.faded, styles.listItemSubtitle]}>
          {rec.narrarator}
        </Text>
      </LinearGradient>
    </Image>
  </TouchableHighlight>
)

class NumberList extends React.Component {

  static propTypes = {
    recordings: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool,
    didFail: React.PropTypes.bool,
    goToNumber: React.PropTypes.func.isRequired,
  }

  render () {
    const {
      recordings,
      loading,
      didFail,
    } = this.props

    return (
      <View style={styles.list}>
        {loading && !didFail &&
          <ActivityIndicator
            style={styles.loading}
            size='large'
            animating
          />
        }
        {recordings.length === 0 && !loading && !didFail &&
          <Text
            style={[
              styles.text, styles.title,
              styles.faded, styles.listHeader,
              styles.centeredText,
            ]}
          >
            Could not find any audio tours.
          </Text>
        }
        {!loading && recordings.map(rec =>
          <BannerEntry
            key={rec.id}
            rec={rec}
            onPress={() => this.props.goToNumber(rec.id)}
          />
        )}
        {didFail &&
          <Text
            style={[
              styles.text, styles.title,
              styles.faded, styles.listHeader,
              styles.centeredText,
            ]}
          >
            No connection available. Pull to refresh to try again.
          </Text>
        }
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  $baseFontSize: 18,
  list: {
    width: '100%',
    flex: 1,
    backgroundColor: '$BackgroundColor',
  },
  loading: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  listItemText: {
    color: '$White',
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: '$baseFontSize * 0.9',
    fontWeight: 'bold',
  },
  faded: {
    color: '$FontOffBackgroundColor',
  },
  listHeader: {
    marginTop: 25,
  },
  listItem: {
    height: 125,
  },
  listItemTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  listItemTitle: {
    fontSize: '$baseFontSize',
    fontWeight: 'bold',
  },
  listItemSubtitle: {
    fontSize: '$baseFontSize * 0.9',
  },
  centeredText: {
    textAlign: 'center',
  },
})


export default NumberList
