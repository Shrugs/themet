import React, { Component } from 'react'

import {
  Navigator,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import SceneProvider from './SceneProvider'
import MainScene from '../scenes/MainScene'

import { Style, FontStyle } from '../constants'

EStyleSheet.build({
  PrimaryColor: Style.PrimaryColor,
  BackgroundColor: Style.BackgroundColor,
  FontPrimaryColor: FontStyle.PrimaryColor,
  FontOffBackgroundColor: FontStyle.OffBackgroundColor,
  FontHighlightColor: FontStyle.HighlightColor,
  ButtonFontSize: FontStyle.ButtonFontSize,
})

const Scenes = {
  main: MainScene,
}

class Index extends Component {
  render () {
    return (
      <Navigator
        initialRoute={{ scene: 'main', index: 0 }}
        renderScene={(route, navigator) => {
          const SceneToRender = Scenes[route.scene]
          return (
            <SceneProvider route={route} navigator={navigator}>
              <SceneToRender />
            </SceneProvider>
          )
        }}
      />
    )
  }
}

export default Index
