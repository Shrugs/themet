/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
 AppRegistry,
} from 'react-native'

import Index from './src/containers/Index'

export default class themet extends Component {
  render () {
    return (
      <Index />
    )
  }
}

AppRegistry.registerComponent('themet', () => themet)
