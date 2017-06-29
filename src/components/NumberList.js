import React from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  ActivityIndicator,
  View,
  Text,
  TouchableHighlight,
} from 'react-native'

import { Style } from '../constants'

import { numToWords } from '../lib/helpers'

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
          <TouchableHighlight
            underlayColor={Style.OffBackgroundColor}
            key={rec.id}
            onPress={() => this.props.goToNumber(rec.id)}
          >
            <Text style={[styles.text, styles.entry]}>
              {numToWords(rec.id)}
            </Text>
          </TouchableHighlight>
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
    flex: 1,
    backgroundColor: '$BackgroundColor',
    paddingTop: 15,
    paddingBottom: 15,
  },
  loading: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
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
  entry: {
    fontSize: '$baseFontSize * 1.2',
    fontWeight: 'bold',
  },
  centeredText: {
    textAlign: 'center',
  },
})


export default NumberList
