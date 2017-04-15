import React from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  View,
  ScrollView,
  Text,
} from 'react-native'

import SceneComponent from './SceneComponent'
import BackBanner from '../components/BackBanner'
import ImageHeader from '../components/ImageHeader'
import AudioPlayer from '../containers/AudioPlayer'

class ShowNumScene extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    // request the information for this scene from the api, then populate the state
    this.setState({
      loading: false,
      recording: {
        image: 'https://placekitten.com/300/400.png',
        num: 222,
        narrarator: 'Alex Cohen',
        author: 'Matt Condon',
        title: 'Some Museum Thing',
        transcript: 'Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.',
        audio: 'whatever'
      }
    })
  }

  goBack = () => {
    this.context.navigator.pop()
  }

  render () {
    if (this.state.loading) {
      return (
        <Text>
          Loading...
        </Text>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.inner}>
          <BackBanner onTap={this.goBack} />
          <ImageHeader style={styles.header} source={{ uri: this.state.recording.image }} />
          <View style={styles.list}>
            <View style={styles.row}>
              <Text style={[styles.text, styles.bold]}>{this.state.recording.num}</Text>
              <Text style={[styles.text, styles.faded]}>{`Narrarated by ${this.state.recording.narrarator}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, styles.title]}>{this.state.recording.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, styles.faded]}>{this.state.recording.author}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, styles.transcript]}>{this.state.recording.transcript}</Text>
            </View>
          </View>
        </ScrollView>
        <AudioPlayer />
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  $baseFontSize: 18,
  container: {
    flex: 1,
    backgroundColor: '$BackgroundColor',
    maxWidth: '100%',
  },
  scrollView: {
    flex: 1
  },
  inner: {
    minHeight: '80%',
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
    paddingTop: 10,
    paddingBottom: 25
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    marginTop: 2,
    marginLeft: 15,
  },
  bold: {
    fontSize: '$baseFontSize',
    fontWeight: 'bold'
  },
  title: {
    fontSize: '$baseFontSize * 1.4',
    fontWeight: 'bold',
  },
  faded: {
    fontSize: '$baseFontSize',
    color: '$FontOffBackgroundColor'
  },
  transcript: {
    marginTop: 20,
  },
})


export default ShowNumScene
