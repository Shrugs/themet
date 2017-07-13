import _ from 'lodash'
import React from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  MessageBarManager,
} from 'react-native-message-bar'

import {
  TabViewAnimated,
  TabBar,
} from 'react-native-tab-view'

import {
  View,
  ScrollView,
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

class MainScene extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      recordings: [],
      refreshing: false,
      loading: true,
      index: 0,
      routes: [
        { key: 'popular', title: 'Popular Numbers' },
        { key: 'all', title: 'All Numbers' },
      ],
    }
  }

  componentWillReceiveProps (nextProps) {
    const recordings = this.getRecordings(nextProps)
    this.setState({
      recordings,
      loading: recordings.length === 0,
    })
  }

  goToNumber = (id) => {
    const recording = this.props.store.state.tracks[id]
    if (!recording) {
      MessageBarManager.showAlert({
        title: 'We don\'t know that art.',
        message: 'So like, we know art, but maybe not all of them, you know?',
        alertType: 'warning',
        stylesheetWarning: {
          backgroundColor: Style.PrimaryBlue,
        },
        viewTopInset: 15,
        viewRightInset: 5,
        viewBottomInset: 15,
      })
      return
    }

    this.props.navigator.push({
      scene: 'show-num',
      index: 1,
      params: { recording },
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.store.update(true, () => {
      this.setState({ refreshing: false })
    })
  }

  getRecordings = props => _((props || this.props).store.state.tracks).values().sortBy('id').value()

  handleChangeTab = index => this.setState({ index });

  renderHeader = props => <TabBar
    {...props}
    style={styles.tabbar}
    labelStyle={styles.labelStyle}
    indicatorStyle={styles.indicatorStyle}
  />

  renderScene = (opts) => {
    const { route } = opts
    const props = {
      goToNumber: this.goToNumber,
      didFail: this.props.store.state.didFail,
      loading: this.state.loading || this.state.refreshing,
      recordings: route.key === 'popular'
        ? this.state.recordings.filter(r => r.popular)
        : this.state.recordings,
    }

    return <NumberList {...props} />
  }

  render () {
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
          <TabViewAnimated
            style={styles.tabview}
            navigationState={this.state}
            renderScene={this.renderScene}
            renderHeader={this.renderHeader}
            onRequestChangeTab={this.handleChangeTab}
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
    height: '30%',
    width: '100%',
  },
  input: {
    backgroundColor: '$PrimaryColor',
  },
  tabview: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: Style.InverseBackgroundColor,
  },
  indicatorStyle: {
    backgroundColor: Style.PrimaryColor,
  },
  labelStyle: {
    color: Style.White,
    fontWeight: 'bold',
  },
})


export default MainScene
