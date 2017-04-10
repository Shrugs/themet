import React, { Component } from 'react'

class SceneComponent extends Component {
  static contextTypes = {
    navigator: React.PropTypes.any.isRequired,
    route: React.PropTypes.object.isRequired,
  }
}

export default SceneComponent
