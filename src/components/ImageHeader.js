import React, { Component } from 'react'

import {
  View,
  Image,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

class ImageHeader extends Component {

  static propTypes = {
    style: View.propTypes.style,
    source: React.PropTypes.any.isRequired,
  }

  render () {
    return (
      <View style={this.props.style}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={this.props.source}
        />
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  image: {
    width: null,
    height: null,
    flex: 1,
  },
})


export default ImageHeader
