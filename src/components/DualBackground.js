import React, { Component, Children, cloneElement } from 'react'

import {
  View,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

class DualBackground extends Component {

  static propTypes = {
    backgroundViews: React.PropTypes.arrayOf(React.PropTypes.node),
    style: View.propTypes.style,
    children: React.PropTypes.node,
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.backgroundContainer}>
          {Children.map(this.props.backgroundViews, v =>
            cloneElement(v, {
              style: [styles.backgroundTile, v.props.style],
            })
          )}
        </View>
        <View style={styles.foregroundContainer}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {},
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  foregroundContainer: {
    flex: 1,
  },
  backgroundTile: {
    flex: 1,
  },
})


export default DualBackground
