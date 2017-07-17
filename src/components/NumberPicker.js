import React, { Component } from 'react'

import {
  View,
  TextInput,
  LayoutAnimation,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Button from './Button'
import Spacer from './Spacer'

class NumberPicker extends Component {

  static propTypes = {
    style: View.propTypes.style,
    goToNumber: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      number: '',
    }
  }

  onChangeText = (text) => {
    LayoutAnimation.easeInEaseOut()
    this.setState({ number: text })
  }

  goToNumber = () => {
    this.props.goToNumber(this.state.number)
  }

  shouldShowGoButton () {
    return this.state.number.length >= 3
  }

  render () {
    return (
      <View>
        <View style={[this.props.style, styles.container]}>
          <Spacer size={1} />
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              keyboardType='numeric'
              placeholder='Audio Guide Number'
              onChangeText={this.onChangeText}
              onSubmitEditing={this.goToNumber}
              value={this.state.number}
              maxLength={4}
              underlineColorAndroid='transparent'
            />
            <Button
              onTap={this.goToNumber}
              style={this.shouldShowGoButton() ? styles.visible : styles.invisible}
            >
              GO
            </Button>
          </View>
          <Spacer size={1} />
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  $margin: 40,
  $padding: 20,
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 8,
    flexDirection: 'row',
    marginTop: '$margin',
    marginBottom: '$margin',
  },
  input: {
    flex: 8,

    fontSize: 20,
    paddingLeft: 20,
    textAlign: 'left',

    borderColor: '$FontOffBackgroundColor',
    borderWidth: 1,
    borderRadius: 5,

    height: 50,
    backgroundColor: '$BackgroundColor',
  },
  invisible: {
    width: 0,
    opacity: 0,
    flex: 0,
  },
  visible: {
    flex: 4,
  },
})


export default NumberPicker
