import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../assets/colors';

export default Separator = ({width, height, style}) => (
  <View
    style={[
      styles.separator,
      {width: width || '100%', height: height || 0.8},
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  separator: {
    height: 0.8,
    alignSelf: 'center',
    backgroundColor: colors.separator,
  },
});
