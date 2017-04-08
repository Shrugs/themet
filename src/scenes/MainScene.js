import React, { Component } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  View,
  Text,
} from 'react-native'

import SceneComponent from './SceneComponent'

class MainScene extends Component {

  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <View style={styles.view}>
        <Text>
          TEST
        </Text>
      </View>
    )
  }
}

const styles = EStyleSheet.create({

})


export default SceneComponent(MainScene)
