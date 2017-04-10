import React from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  ScrollView,
  Text,
} from 'react-native'

import SceneComponent from './SceneComponent'
import MetHeader from '../components/MetHeader'
import NumberPicker from '../components/NumberPicker'

class ShowNumScene extends SceneComponent {

  goBack () {
    this.context.navigator.pop()
  }

  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
        <MetHeader style={styles.header} />
        <Text style={styles.list}>{this.context.route.params.num}</Text>
      </ScrollView>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$PrimaryColor',
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
})


export default ShowNumScene
