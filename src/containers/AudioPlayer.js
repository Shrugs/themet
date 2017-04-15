import React, { Component } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'

import playButton from '../images/play_button.png'
import pauseButton from '../images/pause_button.png'

class AudioPlayer extends Component {

  static propTypes = {
    style: View.propTypes.style,
    isPlaying: React.PropTypes.bool.isRequired,
    progress: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    isPlaying: false,
    progress: 1
  }

  togglePlayPause = () => {
    // @TODO(shrugs) - do the thing
  }

  playPauseImage = () => {
    return this.props.isPlaying
      ? playButton
      : pauseButton
  }

  render () {
    const {
      progress
    } = this.props

    return (
      <View style={[this.props.style, styles.container]}>
        <TouchableHighlight style={styles.playPause} onPress={this.togglePlayPause}>
          <Image
            style={styles.image}
            source={this.playPauseImage()}
          />
        </TouchableHighlight>
        <View style={styles.progress}>
          <View style={[styles.progressBar, { flex: progress }]} />
          <View style={[styles.spacer, { flex: 100 - progress }]} />
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  playPause: {
  },
  image: {
    backgroundColor: '$PrimaryColor',
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '$PrimaryColor'
  },
  progressBar: {
    backgroundColor: '$DarkPrimaryColor',
  }
})


export default AudioPlayer
