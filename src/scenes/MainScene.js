import _ from 'lodash'
import React from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import EStyleSheet from 'react-native-extended-stylesheet'

import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  RefreshControl,
  StatusBar,
  Platform,
} from 'react-native'

import DualBackground from '../components/DualBackground'
import SceneComponent from './SceneComponent'
import MetHeader from '../components/MetHeader'
import NumberPicker from '../components/NumberPicker'

import { Style } from '../constants'

import { numToWords } from '../lib/helpers'

class MainScene extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      refreshing: false,
    }
  }

  goToNumber = (id) => {
    const recording = this.context.store.state[id]
    if (!recording) {
      // @TODO(shrugs) improper input, tell the user somehow
      return
    }

    this.context.navigator.push({
      scene: 'show-num',
      index: 1,
      params: { recording },
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.context.store.update(() => {
      this.setState({ refreshing: false })
    })
  }

  getRecordings = () => _(this.context.store.state).values().sortBy('id').value()

  render () {
    const recordings = this.getRecordings()

    return (
      <DualBackground
        style={styles.background}
        backgroundViews={[
          <View style={styles.topBackground} />,
          <View style={styles.bottomBackground} />,
        ]}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.inner}
          refreshControl={
            <RefreshControl
              tintColor={Style.BackgroundColor}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <StatusBar barStyle='light-content' backgroundColor={Style.PrimaryColor} animated />
          <MetHeader style={styles.header} />
          <NumberPicker
            style={styles.input}
            goToNumber={this.goToNumber}
          />
          <View style={styles.list}>
            {recordings.length === 0 &&
              <ActivityIndicator
                style={styles.loading}
                size='large'
                animating
              />
            }
            {recordings.length > 0 &&
              <Text style={[styles.text, styles.title, styles.faded, styles.listHeader]}>
                Popular Numbers
              </Text>
            }
            {recordings.map(rec =>
              <TouchableHighlight
                underlayColor={Style.OffBackgroundColor}
                key={rec.id}
                onPress={() => this.goToNumber(rec.id)}
              >
                <Text style={[styles.text, styles.entry]}>
                  {numToWords(rec.id)}
                </Text>
              </TouchableHighlight>
            )}
          </View>
        </ScrollView>
        {Platform.OS === 'ios' &&
          <KeyboardSpacer />
        }
      </DualBackground>
    )
  }
}

const styles = EStyleSheet.create({
  $baseFontSize: 18,
  background: {
    flex: 1,
  },
  topBackground: {
    backgroundColor: '$PrimaryColor',
  },
  bottomBackground: {
    backgroundColor: '$BackgroundColor',
  },
  container: {
    flex: 1,
    maxWidth: '100%',
  },
  inner: {
    minHeight: '100%',
  },
  header: {
    height: 300,
    width: '100%',
  },
  input: {
    backgroundColor: '$PrimaryColor',
  },
  list: {
    flex: 1,
    backgroundColor: '$BackgroundColor',
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
})


export default MainScene
