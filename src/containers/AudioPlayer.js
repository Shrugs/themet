import React, { Component } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  View,
  Image,
  TouchableHighlight,
  Animated,
  ActivityIndicator,
  Easing,
} from 'react-native'

import {
  Player,
} from 'react-native-audio-toolkit'

import { Style } from '../constants'

import playButton from '../images/play_button.png'
import pauseButton from '../images/pause_button.png'

class AudioPlayer extends Component {

  static propTypes = {
    style: View.propTypes.style,
    source: React.PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)

    const progress = new Animated.Value(0)
    this.state = {
      loading: true,
      hasStarted: false,
      isPlaying: false,
      progress,
    }
  }

  componentDidMount () {
    this.player = new Player(this.props.source, {
      autoDestroy: false,
      continuesToPlayInBackground: true,
    })
    this.player.prepare(() => {
      this.setState({ loading: false })
      this.start()
    })
    this.player.on('ended', this.end)
  }

  componentDidUpdate (prevProps, prevState) {
    // if we started playing music, start animating that bar
    if (!prevState.isPlaying && this.state.isPlaying) {
      const currentTime = Math.max(0, this.player.currentTime)
      const timeLeft = this.player.duration - currentTime
      const currentProgress = (currentTime / this.player.duration) * 100

      this.state.progress.setValue(currentProgress)
      Animated.timing(
        this.state.progress,
        {
          easing: Easing.linear,
          toValue: 100,
          duration: timeLeft,
        }
      ).start()
    }
  }

  componentWillUnmount () {
    this.player.destroy()
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
    this.player.play(() => {
      this.setState({
        isPlaying: true,
        hasStarted: true,
      })
    })
  }

  pause = () => {
    // stop animation and stop playing
    this.player.pause(() => {
      this.setState({ isPlaying: false })
      this.state.progress.stopAnimation()
    })
  }

  togglePlayPause = () => {
    // early exit if we're loading
    if (this.state.loading) { return }

    if (this.state.isPlaying) {
      this.pause()
    } else {
      // eslint-disable-next-line no-lonely-if
      if (!this.state.hasStarted) {
        this.start()
      } else {
        this.play()
      }
    }
  }

  // eslint-disable-next-line no-confusing-arrow
  playPauseImage = () => this.state.isPlaying ? pauseButton : playButton

  render () {
    const inverseProgress = this.state.progress.interpolate({
      inputRange: [0, 100],
      outputRange: [100, 0],
    })

    return (
      <View style={[this.props.style, styles.container]}>
        <TouchableHighlight style={styles.playPause} onPress={this.togglePlayPause}>
          <Image
            style={styles.image}
            source={this.playPauseImage()}
          />
        </TouchableHighlight>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, { flex: this.state.progress }]} />
          <Animated.View style={[styles.spacer, { flex: inverseProgress }]} />
        </View>
        {this.state.loading &&
          <ActivityIndicator
            style={styles.loading}
            color={Style.BackgroundColor}
            size='large'
            animating
          />
        }
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
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '$PrimaryColor',
  },
  progress: {
    backgroundColor: '$DarkPrimaryColor',
  },
  spacer: {

  },
  loading: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})


export default AudioPlayer
