import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      style={{
        flex: 1,
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 34, color: '#f00', marginVertical: '25%'}}>
          Hello, User!
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'd9e7fc',
  },
});
