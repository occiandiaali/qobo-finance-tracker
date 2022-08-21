import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';

const FieldLabel = ({text, theme}) => {
  const {fonts, colors} = theme;
  return (
    <View style={styles.root}>
      {/* <Text
        style={{
          fontSize: fonts,
          color: colors,
        }}>
        {text}
      </Text> */}
      <Text>{text}</Text>
    </View>
  );
};

export default withTheme(FieldLabel);

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
});
