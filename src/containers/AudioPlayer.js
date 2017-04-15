import React, { Component } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Animated
} from 'react-native'

import playButton from '../images/play_button.png'
import pauseButton from '../images/pause_button.png'

class AudioPlayer extends Component {

  static propTypes = {
    style: View.propTypes.style
  }

  constructor(props) {
    super(props)

    const progress = new Animated.Value(0)
    this.state = {
      didEnd: true,
      hasStarted: false,
      isPlaying: false,
      progress: progress,
      inverseProgress: progress.interpolate({
        inputRange: [0, 100],
        outputRange: [100, 0]
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isPlaying && this.state.isPlaying) {
      Animated.timing(
        this.state.progress,
        {
          toValue: 100,
          // @TODO(shrugs) - figure out the rest of the duration of the track here
          duration: 4000
        }
      ).start(() => {
        if (this.state.didEnd) {
          this.end()
        }
      })
    }
  }

  start = () => {
    this.state.progress.setValue(0)
    this.play()
  }

  end = () => {
    this.pause()
    this.setState({ hasStarted: false })
  }

  play = () => {
    // play music
    // animate to 100 over the length of the song
    this.setState({
      isPlaying: true,
      hasStarted: true,
      didEnd: true
    })
  }

  pause = () => {
    // stop animation and stop playing
    this.setState({ didEnd: false }, () => {
      this.state.progress.stopAnimation(val => {
        this.setState({
          isPlaying: false,
          // progress: this.state.
        })
      })
    })
  }

  togglePlayPause = () => {
    if (this.state.isPlaying) {
      this.pause()
    } else {
      if (!this.state.hasStarted) {
        this.start()
      } else {
        this.play()
      }
    }
  }

  playPauseImage = () => {
    return this.state.isPlaying
      ? pauseButton
      : playButton
  }

  render () {
    return (
      <View style={[this.state.style, styles.container]}>
        <TouchableHighlight style={styles.playPause} onPress={this.togglePlayPause}>
          <Image
            style={styles.image}
            source={this.playPauseImage()}
          />
        </TouchableHighlight>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, { flex: this.state.progress }]} />
          <Animated.View style={[styles.spacer, { flex: this.state.inverseProgress }]} />
        </View>
      </View>
    )
  }
}

// <View style={[styles.spacer, { width: this.state.inverseProgress }]} />

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  playPause: {
  },
  image: {
    backgroundColor: '$PrimaryColor',
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '$PrimaryColor'
  },
  progress: {
    backgroundColor: '$DarkPrimaryColor',
  },
  spacer: {

  }
})


export default AudioPlayer
