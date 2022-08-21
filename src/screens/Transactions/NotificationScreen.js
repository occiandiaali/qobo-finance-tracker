import React, {useState, useEffect, useCallback} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const image = {
  uri: 'https://img.freepik.com/free-vector/financial-technology-isometric-design-concept_1284-23504.jpg',
};

const NotificationScreen = ({theme}) => {
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Hooraay!!!</Text>
      </ImageBackground>
    </View>
  );
};

export default withTheme(NotificationScreen);

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    marginTop: '65%',
    fontSize: 64,
    fontWeight: 'bold',
    color: 'orange',
  },
});
