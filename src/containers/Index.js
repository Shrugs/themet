import React, { Component } from 'react'

import {
  View,
  Navigator,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import {
  MessageBarManager,
  MessageBar,
} from 'react-native-message-bar'

import MainScene from '../scenes/MainScene'
import ShowNumScene from '../scenes/ShowNumScene'

import { Style, FontStyle } from '../constants'

import { getRecordings } from '../lib/api'

EStyleSheet.build({
  PrimaryColor: Style.PrimaryColor,
  DarkPrimaryColor: Style.DarkPrimaryColor,
  BackgroundColor: Style.BackgroundColor,
  InverseBackgroundColor: Style.InverseBackgroundColor,
  OffBackgroundColor: Style.OffBackgroundColor,
  FontPrimaryColor: FontStyle.PrimaryColor,
  FontOffBackgroundColor: FontStyle.OffBackgroundColor,
  FontHighlightColor: FontStyle.HighlightColor,
  ButtonFontSize: FontStyle.ButtonFontSize,
  KeyFamily: FontStyle.KeyFamily,
  KeyStyle: FontStyle.KeyStyle,
  White: Style.White,
})

const initialRoute = {
  scene: 'main',
  index: 0,
}

const Scenes = {
  main: MainScene,
  'show-num': ShowNumScene,
}

class Index extends Component {

  constructor (props) {
    super(props)

    this.state = {
      store: { state: { tracks: {} }, update: this.updateStore.bind(this) },
    }
  }

  componentDidMount () {
    this.updateStore()
    MessageBarManager.registerMessageBar(this.alert)
  }

  componentWillUnmount () {
    MessageBarManager.unregisterMessageBar()
  }

  updateStore = (bustCache = false, cb) => {
    getRecordings(bustCache)
      .then((tracks) => {
        this.setState({
          store: {
            state: { tracks, didFail: false },
            update: this.updateStore.bind(this),
          },
        })
        if (cb) { cb() }
      })
      .catch(() => {
        this.setState({
          store: {
            state: { tracks: {}, didFail: true },
            update: this.updateStore.bind(this),
          },
        })
        if (cb) { cb() }
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={initialRoute}
          configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
          renderScene={(route, navigator) => {
            const SceneToRender = Scenes[route.scene]
            return (
              <SceneToRender
                route={route}
                navigator={navigator}
                store={this.state.store}
              />
            )
          }}
        />
        <MessageBar ref={r => this.alert = r} />
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$PrimaryColor',
  },
})

export default Index
