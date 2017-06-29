import React, { Component } from 'react'

class SceneComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.any.isRequired,
    route: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
  }
}

export default SceneComponent
