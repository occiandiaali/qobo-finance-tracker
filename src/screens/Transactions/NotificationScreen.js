import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const NotificationScreen = ({theme}) => {
  return (
    <View>
      <Text>Your Notification</Text>
    </View>
  );
};

export default withTheme(NotificationScreen);
