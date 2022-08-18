import React, {useState, useEffect, useCallback} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const TransactionScreen = ({navigation, theme}) => {
  return (
    <View style={styles.container}>
      <Text>TransactionScreen</Text>
      <Button
        onPress={() => navigation.navigate('Notification')}
        title="Save"
        color="#841584"
      />
    </View>
  );
};

export default withTheme(TransactionScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
});
