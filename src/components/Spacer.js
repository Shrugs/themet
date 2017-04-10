import React from 'react'
import { View } from 'react-native'

// eslint-disable-next-line react/prop-types
export default ({ size, ...others }) => <View style={{ flex: size }} {...others} />
