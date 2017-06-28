import _ from 'lodash'
import React from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import EStyleSheet from 'react-native-extended-stylesheet'

import {
  TabViewAnimated,
  TabBar,
  SceneMap,
} from 'react-native-tab-view'

import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  RefreshControl,
  StatusBar,
  Platform,
} from 'react-native'

import DualBackground from '../components/DualBackground'
import SceneComponent from './SceneComponent'
import LogoHeader from '../components/LogoHeader'
import NumberPicker from '../components/NumberPicker'
import NumberList from '../components/NumberList'

import { Style } from '../constants'

import { numToWords } from '../lib/helpers'

class MainScene extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      refreshing: false,
      listState: {
        index: 0,
        routes: [
          { key: 'popular', title: 'Popular Numbers' },
          { key: 'all', title: 'All Numbers' },
        ],
      },
    }
  }

  goToNumber = (id) => {
    const recording = this.context.store.state.tracks[id]
    if (!recording) {
      // @TODO(shrugs) improper input, tell the user somehow
      return
    }

    this.context.navigator.push({
      scene: 'show-num',
      index: 1,
      params: { recording },
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.context.store.update(() => {
      this.setState({ refreshing: false })
    })
  }

  getRecordings = () => _(this.context.store.state.tracks).values().sortBy('id').value()

  _handleChangeTab = index => this.setState({ listState: {
    ...this.state.listState,
    index,
  } });

  _renderHeader = props => <TabBar {...props} />;

  // _renderScene = SceneMap({
  //   1: FirstRoute,
  //   2: SecondRoute,
  // });

  render () {
    const recordings = this.getRecordings()
    const didFail = this.context.store.state.didFail

    return (
      <DualBackground
        style={styles.background}
        backgroundViews={[
          <View style={styles.topBackground} />,
          <View style={styles.bottomBackground} />,
        ]}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.inner}
          refreshControl={
            <RefreshControl
              tintColor={Style.BackgroundColor}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <StatusBar hidden />
          <LogoHeader style={styles.header} />
          <NumberPicker
            style={styles.input}
            goToNumber={this.goToNumber}
          />
          <NumberList
            recordings={recordings}
            goToNumber={this.goToNumber}
            didFail={didFail}
          />
        </ScrollView>
        {Platform.OS === 'ios' &&
          <KeyboardSpacer />
        }
      </DualBackground>
    )
  }
}

const styles = EStyleSheet.create({
  $baseFontSize: 18,
  background: {
    flex: 1,
  },
  topBackground: {
    backgroundColor: '$PrimaryColor',
  },
  bottomBackground: {
    backgroundColor: '$BackgroundColor',
  },
  container: {
    flex: 1,
    maxWidth: '100%',
  },
  inner: {
    minHeight: '100%',
  },
  header: {
    aspectRatio: 1,
    minHeight: '40%',
    width: '100%',
  },
  input: {
    backgroundColor: '$PrimaryColor',
  },
})


export default MainScene
