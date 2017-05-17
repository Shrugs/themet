import React, { Component } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  Image,
  TouchableHighlight,
} from 'react-native'

import DownArrow from '../images/down_arrow.png'

class BackBanner extends Component {

  static propTypes = {
    onTap: React.PropTypes.func.isRequired,
  }

  render () {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.props.onTap}
      >
        <Image
          source={DownArrow}
        />
      </TouchableHighlight>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: '$InverseBackgroundColor',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export default BackBanner
