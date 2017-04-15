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
    // start loading the audo track here
    this.setState({ loading: false })
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

    const {
      recording
    } = this.context.route.params

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.inner}>
          <BackBanner onTap={this.goBack} />
          <ImageHeader style={styles.header} source={{ uri: recording.image }} />
          <View style={styles.list}>
            <View style={styles.row}>
              <Text style={[styles.text, styles.bold]}>{recording.id}</Text>
              <Text style={[styles.text, styles.faded]}>{`Narrarated by ${recording.narrarator}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, styles.title]}>{recording.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, styles.faded]}>{recording.author}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, styles.transcript]}>{recording.transcript}</Text>
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
