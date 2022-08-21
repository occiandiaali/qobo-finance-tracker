import React from 'react';
import {View, StyleSheet} from 'react-native';

const FieldContainer = ({children}) => (
  <View style={styles.root}>{children}</View>
);

export default FieldContainer;

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
});
