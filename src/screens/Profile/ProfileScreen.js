import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: '15%',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'd9e7fc',
  },
});

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
        <Image
          source={{
            uri: 'https://img.freepik.com/free-icon/female-user-add-button_318-39502.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={{fontSize: 34, color: '#fff'}}>Hello, User!</Text>
        <View
          style={{
            width: 360,
            height: 320,
            marginTop: 16,
            borderRadius: 20,
            backgroundColor: '#9999ff',
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
