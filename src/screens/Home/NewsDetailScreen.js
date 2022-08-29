import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({});

const LoadingIndicatorView = () => (
  <ActivityIndicator
    style={{alignSelf: 'center', marginBottom: '50%'}}
    color="#3333ff"
    size="large"
  />
);

const LoadingErrorView = () => Alert.alert('Ooops! Cannot load this page!');

const NewsDetailScreen = ({route}) => {
  const {articleLink} = route.params;
  console.log('Link ', articleLink);
  return (
    <WebView
      originWhitelist={['*']}
      source={{uri: `${articleLink}`}}
      renderLoading={LoadingIndicatorView}
      renderError={LoadingErrorView}
      startInLoadingState={true}
    />
  );
};

export default NewsDetailScreen;
