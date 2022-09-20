import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    width: 260,
    height: 160,
    borderRadius: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '35%',
  },
});

const Splasher = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Landing'));
    }, 5000);
  }, [navigation]);
  return (
    <>
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 0.5)"
        translucent={true}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/qobo_snap.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </>
  );
};

export default Splasher;
