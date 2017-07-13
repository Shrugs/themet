import React, { Component } from 'react'

import {
  Text,
  Image,
  View,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Spacer from './Spacer'
import header from '../images/header.png'

class LogoHeader extends Component {

  static propTypes = {
    style: View.propTypes.style,
  }

  render () {
    return (
      <View style={[this.props.style, styles.container]}>
        <Spacer size={1} />
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode='contain'
            source={header}
          />
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageWrapper: {
    flex: 6,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})

export default LogoHeader
