import React, { Component } from 'react'

import {
  View,
} from 'react-native'

import ImageHeader from './ImageHeader'
import logo from '../images/logo.png'

class LogoHeader extends Component {

  static propTypes = {
    style: View.propTypes.style,
  }

  render () {
    return (
      <ImageHeader
        style={this.props.style}
        source={logo}
      />
    )
  }
}


export default LogoHeader
