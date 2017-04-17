import React, { Component } from 'react'

import {
  View,
  Navigator,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import SceneProvider from './SceneProvider'
import MainScene from '../scenes/MainScene'
import ShowNumScene from '../scenes/ShowNumScene'

import { Style, FontStyle } from '../constants'

import { getTracks } from '../lib/api'

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
})

// const initialRoute = {
//   scene: 'show-num',
//   index: 0,
//   params: { },
// }

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
      store: {},
    }
  }

  componentDidMount () {
    this.updateStore()
  }

  updateStore = (cb) => {
    getTracks()
      .then((tracks) => {
        this.setState({ store: { state: tracks, update: this.updateStore.bind(this) } })
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
              <SceneProvider route={route} navigator={navigator} store={this.state.store}>
                <SceneToRender />
              </SceneProvider>
            )
          }}
        />
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
