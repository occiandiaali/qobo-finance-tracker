import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#fff',
  },
});

const VideoPlayer = ({route}) => {
  const {link} = route.params;
  const linkString = JSON.stringify(link);
  const embedable = linkString.split('watch?v=').join('embed/');

  const LoadingIndicatorView = () => (
    <ActivityIndicator
      style={{alignSelf: 'center', marginBottom: '50%'}}
      color="#3333ff"
      size="large"
    />
  );

  const LoadingErrorView = () =>
    Alert.alert('Ooops! Cannot load this page!\nIs your internet okay?');

  return (
    <View style={styles.webViewContainer}>
      <WebView
        originWhitelist={['*']}
        renderLoading={LoadingIndicatorView}
        renderError={LoadingErrorView}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={
          Platform.OS !== 'android' || Platform.Version >= 17
            ? false
            : undefined
        }
        containerStyle={{flex: 1, width: screenWidth}}
        androidLayerType="hardware"
        mixedContentMode="always"
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        source={{
          html: `<html><body><iframe width=100% height=100% src=${embedable}?autoplay=1&mute=1 frameborder='0'  allow='autoplay' allowfullscreen></iframe></body></html>`,
        }}
      />
    </View>
  );
};

export default VideoPlayer;
