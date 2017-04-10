import React, { Component } from 'react'

import {
  View,
  Image,
} from 'react-native'

import theMetLogo from '../images/the_met_logo.png'

class MetHeader extends Component {

  static propTypes = {
    style: View.propTypes.style,
  }

  render () {
    return (
      <Image
        style={this.props.style}
        resizeMode='cover'
        source={theMetLogo}
      />
    )
  }
}


export default MetHeader
