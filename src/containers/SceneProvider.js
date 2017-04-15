import React, { Component, Children } from 'react'

import {
} from 'react-native'

class SceneProvider extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    navigator: React.PropTypes.any.isRequired,
    route: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
  }

  static childContextTypes = {
    navigator: React.PropTypes.any.isRequired,
    route: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
  }

  static displayName = 'SceneProvider'

  constructor (props, context) {
    super(props, context)
    this.navigator = props.navigator
    this.route = props.route
  }

  getChildContext () {
    return { navigator: this.navigator, route: this.route, store: this.props.store }
  }

  render () {
    return Children.only(this.props.children)
  }
}

export default SceneProvider
