import React, { Component } from 'react'

import {
  View,
} from 'react-native'

import ImageHeader from './ImageHeader'
import theMetLogo from '../images/the_met_logo.png'

class MetHeader extends Component {

  static propTypes = {
    style: View.propTypes.style,
  }

  render () {
    return (
      <ImageHeader
        style={this.props.style}
        source={theMetLogo}
      />
    )
  }
}


export default MetHeader
