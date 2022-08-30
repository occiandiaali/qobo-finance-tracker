import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    width: screenWidth,
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
        mediaPlaybackRequiresUserAction={false}
        containerStyle={{flex: 1, width: screenWidth}}
        source={{
          html: `<html><body><iframe width="100%" height="100%" src=${embedable}?autoplay=1&wmode=opaque&yt:crop=16:9 frameborder="0" allowfullscreen allow="autoplay"></iframe></body></html>`,
        }}
      />
    </View>
  );
};

export default VideoPlayer;
