/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
 AppRegistry,
 UIManager,
} from 'react-native'

import Index from './src/containers/Index'

// eslint-disable-next-line no-unused-expressions
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

export default class themet extends Component {
  render () {
    return (
      <Index />
    )
  }
}

AppRegistry.registerComponent('themet', () => themet)
