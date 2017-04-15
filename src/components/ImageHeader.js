import React, { Component } from 'react'

import {
  View,
  Image,
} from 'react-native'

class ImageHeader extends Component {

  static propTypes = {
    style: View.propTypes.style,
    source: React.PropTypes.any.isRequired
  }

  render () {
    return (
      <Image
        style={this.props.style}
        resizeMode='cover'
        source={this.props.source}
      />
    )
  }
}


export default ImageHeader
