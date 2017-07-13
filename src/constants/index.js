import { Platform } from 'react-native'

export const MET_RED = '#ea0029'
export const MET_BLUE = '#0000ff'

export const Style = {
  PrimaryColor: MET_RED,
  PrimaryBlue: MET_BLUE,
  BackgroundColor: '#FFFFFF',
  InverseBackgroundColor: '#020202',
  OffBackgroundColor: '#DDD',
  DarkPrimaryColor: 'rgb(123, 5, 28)',
  White: '#ffffff',
}

export const FontStyle = {
  PrimaryColor: '#1a1a1a',
  OffBackgroundColor: '#999',
  HighlightColor: MET_RED,
  KeyFamily: Platform.OS === 'ios' ? 'Georgia-Italic' : 'notoserif',
  KeyStyle: Platform.OS === 'ios' ? 'normal' : 'italic',
  ButtonFontSize: 16,
}

