import React, { Component } from 'react'

const SceneComponent = ComposedComponent => class extends Component {
  static contextTypes = {
    navigator: React.PropTypes.any.isRequired,
    route: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <ComposedComponent {...this.props} />
    )
  }
}

export default SceneComponent
