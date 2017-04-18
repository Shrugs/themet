import React, { Component } from 'react'

import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import { Style } from '../constants'

class Button extends Component {

  static propTypes = {
    style: View.propTypes.style,
    children: React.PropTypes.node,
    onTap: React.PropTypes.func,
  }

  render () {
    const {
      onTap,
      children,
    } = this.props

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableHighlight
          underlayColor={Style.OffBackgroundColor}
          style={styles.button}
          onPress={onTap}
        >
          <Text style={styles.text}>{children}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  $margin: 10,
  $padding: 15,
  container: {
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    marginRight: '$margin',
    marginLeft: '$margin',
    paddingLeft: '$padding',
    paddingRight: '$padding',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$BackgroundColor',
  },
  text: {
    fontSize: '$ButtonFontSize',
    fontWeight: 'bold',
    color: '$FontPrimaryColor',
  },
})


export default Button
