import React from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  View,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native'

import DualBackground from '../components/DualBackground'
import SceneComponent from './SceneComponent'
import BackBanner from '../components/BackBanner'
import ImageHeader from '../components/ImageHeader'
import AudioPlayer from '../containers/AudioPlayer'

class ShowNumScene extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
    }
  }

  componentDidMount () {
    // start loading the audo track here
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ loading: false })
  }

  goBack = () => {
    this.props.navigator.pop()
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
      recording,
    } = this.props.route.params

    return (
      <DualBackground
        style={styles.container}
        backgroundViews={[
          <View style={styles.topBackground} />,
          <View style={styles.bottomBackground} />,
        ]}
      >
        <View style={styles.container}>
          <StatusBar hidden />
          <BackBanner onTap={this.goBack} />
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.inner}>
            <ImageHeader style={styles.header} source={{ uri: recording.image }} />
            <View style={styles.list}>
              <View style={styles.row}>
                <Text style={[styles.text, styles.bold, styles.recordingId]}>{recording.id}</Text>
                <Text style={[styles.text, styles.faded, styles.narrarator]}>{`Narrarated by ${recording.narrarator}`}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.text, styles.title]}>{recording.title}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.text, styles.faded, styles.author]}>{recording.author}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.text, styles.transcript]}>{recording.transcript}</Text>
              </View>
            </View>
          </ScrollView>
          <AudioPlayer source={recording.audio} />
        </View>
      </DualBackground>
    )
  }
}

const styles = EStyleSheet.create({
  $baseFontSize: 18,
  topBackground: {
    backgroundColor: '$InverseBackgroundColor',
  },
  bottomBackground: {
    backgroundColor: '$BackgroundColor',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  inner: {
    minHeight: '80%',
  },
  header: {
    aspectRatio: 1,
    width: '100%',
  },
  input: {
    backgroundColor: '$PrimaryColor',
  },
  list: {
    flex: 1,
    backgroundColor: '$BackgroundColor',
    paddingTop: 10,
    paddingBottom: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    marginTop: 2,
    marginLeft: 15,
    marginRight: 15,
  },
  bold: {
    fontSize: '$baseFontSize',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '$baseFontSize * 1.4',
    fontWeight: 'bold',
  },
  faded: {
    fontSize: '$baseFontSize',
    color: '$FontOffBackgroundColor',
  },
  transcript: {
    fontSize: 18,
    marginTop: 20,
  },
  recordingId: {
    textAlign: 'right',
    marginRight: 0,
  },
  narrarator: {
    fontSize: 15,
    flex: 1,
  },
  author: {
    fontSize: 14,
  },
})


export default ShowNumScene
