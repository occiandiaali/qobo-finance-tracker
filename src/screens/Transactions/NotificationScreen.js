import React, {useState, useEffect, useCallback} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const image = {
  //uri: 'https://img.freepik.com/free-vector/financial-technology-isometric-design-concept_1284-23504.jpg',
  //uri: 'https://img.freepik.com/free-vector/businessman-completing-online-survey-form-smartphone-screen-online-survey-internet-questionnaire-form-marketing-research-tool-concept-illustration_335657-2364.jpg',

  uri: 'https://img.freepik.com/free-vector/placeholder-concept-illustration_114360-4847.jpg',

  //uri: 'https://img.freepik.com/free-vector/user-feedback-internet-questionnaire-online-survey-ranking-system-service-clients-opinion-expression-users-with-laptops-cartoon-characters_335657-3529.jpg',
  //uri: 'https://img.freepik.com/free-vector/organic-flat-feedback-concept_23-2148958007.jpg',
};

const NotificationScreen = ({theme}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Success!</Text>
    </View>
  );
};

export default withTheme(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    //
    height: 400,
    width: 400,
    borderRadius: 150,
    alignSelf: 'center',
    marginTop: '15%',
  },
  text: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 34,
    fontWeight: 'bold',
    color: '#6666ff',
  },
});
