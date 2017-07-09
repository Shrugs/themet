import React, { Component } from 'react'

import KeepAwake from 'react-native-keep-awake'
import EStyleSheet from 'react-native-extended-stylesheet'

import {
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
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

    this.state = {
      loading: true,
      isPlaying: false,
      progress: 0,
    }
  }

  componentDidMount () {
    this.didUnmount = false
    this.lastSeek = 0
    this.player = new Player(this.props.source, {
      autoDestroy: false,
      continuesToPlayInBackground: true,
    })
    // This apparently doesn't compute in the background on android, so
    // we'll throw it into a timeout so it happens after the animation
    // @TODO(Shrugs) - figure out how to run this in the background.
    this.preparePlayerTimeout = setTimeout(() => {
      this.player.prepare(() => {
        if (this.didUnmount) { return }
        this.startTimeout = setTimeout(() => {
          this.start()
        }, 2000)
        // also, because of https://github.com/futurice/react-native-audio-toolkit/issues/41
        // we're just going to wait 5 seconds because fuck everything
      })

      this.updateState()

      this.player.on('ended', this.end)
      this.player.on('pause', this.pause)

      this.progressInterval = setInterval(() => {
        if (this.player && this.shouldUpdateProgressBar()) {
          this.setState({
            progress: (Math.max(0, this.player.currentTime) / this.player.duration) * 100,
          })
        }
      }, 100)
    }, 500)
  }

  componentWillUnmount () {
    this.didUnmount = true
    clearTimeout(this.preparePlayerTimeout)
    clearTimeout(this.startTimeout)
    clearInterval(this.progressInterval)
    this.player.destroy()
  }

  onProgressBarLayout = (evt) => {
    this.progressBarWidth = evt.nativeEvent.layout.width
  }

  updateState () {
    this.setState({
      isPlaying: this.player && this.player.isPlaying,
      canPlay: this.player && this.player.canPlay,
    })
  }

  shouldUpdateProgressBar = () => Date.now() - this.lastSeek > 200

  start = () => {
    this.updateState()
    this.setState({
      progress: 0,
      loading: false,
    })
    this.play()
  }

  end = () => {
    this.pause()
    this.updateState()
  }

  play = () => {
    this.player.play(() => {
      this.updateState()
      this.player.play()
    })
  }

  pause = () => {
    this.player.pause(() => {
      this.updateState()
    })
  }

  togglePlayPause = () => {
    if (!this.state.canPlay) { return }

    this.player.playPause(() => {
      this.updateState()
    })
  }

  seek (percentage) {
    if (!this.player) { return }

    this.lastSeek = Date.now()

    const position = percentage * this.player.duration
    this.player.seek(position, () => {
      this.updateState()
      if (!this.player.isPlaying) {
        this.play()
      }
    })
  }

  // eslint-disable-next-line no-confusing-arrow
  playPauseImage = () => this.state.isPlaying ? pauseButton : playButton

  handlePlayerPress = (e) => {
    if (this.progressBarWidth) {
      this.seek(e.nativeEvent.locationX / this.progressBarWidth)
    }
  }

  render () {
    const inverseProgress = 100 - this.state.progress

    return (
      <View style={[this.props.style, styles.container]}>
        <KeepAwake />
        <TouchableHighlight
          style={styles.playPause}
          onPress={this.togglePlayPause}
        >
          <Image
            style={styles.image}
            source={this.playPauseImage()}
          />
        </TouchableHighlight>
        <View
          style={styles.progressBar}
          onLayout={this.onProgressBarLayout}
          onResponderRelease={this.handlePlayerPress}
          pointerEvents='box-only'
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
        >
          <View
            style={[styles.progress, { flex: this.state.progress }]}
          />
          <View
            style={[styles.spacer, { flex: inverseProgress }]}
          />
        </View>
        {(!this.state.canPlay || this.state.loading) &&
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
