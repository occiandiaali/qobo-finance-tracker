import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {YOUTUBE_KEY} from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
    color: '#fff',
  },
  rowLabel: {
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu-Bold',
    color: '#4444ff',
  },
  rowLabelContainer: {
    left: 16,
    top: 8,
  },
  textInputContainer: {
    height: 50,
    top: 6,
    marginBottom: 32,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#d2d6d9',
    margin: 12,
    borderRadius: 36,
  },
  videoView: {
    width: 200,
    height: 220,
    borderRadius: 20,
    borderColor: '#4444ff',
    // backgroundColor: '#6666ff',
    margin: 8,
  },
});
const MAX_RESULT = 6; //15;
const PLAYLIST_ID_1 = 'PLhKwz7hYMTDVUXV-hkJ2wnwnQECzn-egm';
const PLAYLIST_ID_2 = 'PL8uhW8cclMiNv8UT1NUawB-XpXVeJ8mN8';
const PLAYLIST_ID_3 = 'PLf5N6dqfQaNRHiN68HhNpFcRAl5Zfo0Qz';
const API_KEY = YOUTUBE_KEY;

const investingBasics = [
  {
    id: 1,
    uri: 'https://www.youtube.com/watch?v=IuyejHOGCro',
    poster: 'https://img.youtube.com/vi/IuyejHOGCro/hqdefault.jpg',
    title: 'Investing basics: Bonds',
  },
  {
    id: 2,
    uri: 'https://www.youtube.com/watch?v=hE2NsJGpEq4',
    poster: 'https://img.youtube.com/vi/hE2NsJGpEq4/hqdefault.jpg',
    title: 'Investing basics: Stocks',
  },
  {
    id: 3,
    uri: 'https://www.youtube.com/watch?v=kqr-h-pmky4',
    poster: 'https://img.youtube.com/vi/kqr-h-pmky4/hqdefault.jpg',
    title: 'Investing basics: ETFs',
  },
  {
    id: 4,
    uri: 'https://www.youtube.com/watch?v=_tEbIzKbZhY',
    poster: 'https://img.youtube.com/vi/_tEbIzKbZhY/hqdefault.jpg',
    title: 'Investing basics: Forex',
  },
  {
    id: 5,
    uri: 'https://www.youtube.com/watch?v=ngfKXvfzC74',
    poster: 'https://img.youtube.com/vi/ngfKXvfzC74/hqdefault.jpg',
    title: 'Investing basics: Mutual Funds',
  },
  {
    id: 6,
    uri: 'https://www.youtube.com/watch?v=3N6xlCxyWKY',
    poster: 'https://img.youtube.com/vi/3N6xlCxyWKY/hqdefault.jpg',
    title: 'Investing basics: Planning for retirement',
  },
];
const stockTrading = [
  {
    id: 1,
    uri: 'https://www.youtube.com/watch?v=ef_9kFyhi0k',
    poster: 'https://img.youtube.com/vi/ef_9kFyhi0k/hqdefault.jpg',
  },
  {
    id: 2,
    uri: 'https://www.youtube.com/watch?v=AeAj6FQYUIg',
    poster: 'https://img.youtube.com/vi/AeAj6FQYUIg/hqdefault.jpg',
  },
  {
    id: 3,
    uri: 'https://www.youtube.com/watch?v=PKA66mjQ79E',
    poster: 'https://img.youtube.com/vi/PKA66mjQ79E/hqdefault.jpg',
  },
  {
    id: 4,
    uri: 'https://www.youtube.com/watch?v=7ZDMv1Ox8cU',
    poster: 'https://img.youtube.com/vi/7ZDMv1Ox8cU/hqdefault.jpg',
  },
  {
    id: 5,
    uri: 'https://www.youtube.com/watch?v=ZYaujgRX1V8',
    poster: 'https://img.youtube.com/vi/ZYaujgRX1V8/hqdefault.jpg',
  },
  {
    id: 6,
    uri: 'https://www.youtube.com/watch?v=w0ZBpxx3bW8',
    poster: 'https://img.youtube.com/vi/w0ZBpxx3bW8/hqdefault.jpg',
  },
];
const financialPlanning = [
  {
    id: 1,
    uri: 'https://www.youtube.com/watch?v=LLdKcFpHgM8',
    poster: 'https://img.youtube.com/vi/LLdKcFpHgM8/hqdefault.jpg',
  },
  {
    id: 2,
    uri: 'https://www.youtube.com/watch?v=7-2dKzOG1pM',
    poster: 'https://img.youtube.com/vi/7-2dKzOG1pM/hqdefault.jpg',
  },
  {
    id: 3,
    uri: 'https://www.youtube.com/watch?v=0XYB7aiD20c',
    poster: 'https://img.youtube.com/vi/0XYB7aiD20c/hqdefault.jpg',
  },
  {
    id: 4,
    uri: 'https://www.youtube.com/watch?v=3hikDqf9GW4',
    poster: 'https://img.youtube.com/vi/3hikDqf9GW4/hqdefault.jpg',
  },
  {
    id: 5,
    uri: 'https://www.youtube.com/watch?v=SfXrTIoK_x8',
    poster: 'https://img.youtube.com/vi/SfXrTIoK_x8/hqdefault.jpg',
  },
  {
    id: 6,
    uri: 'https://www.youtube.com/watch?v=EKVW0zWGMdk',
    poster: 'https://img.youtube.com/vi/EKVW0zWGMdk/hqdefault.jpg',
  },
];

const LearningCentral = ({theme, navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textInputContainer}>
            <Icon
              name="search"
              size={20}
              // color="#fff"
              style={{left: 16, top: 6, marginRight: 16}}
            />
            <TextInput
              onFocus={() => navigation.navigate('VideoSearch')}
              placeholder="Search financial videos"
              style={{
                left: 8,
                bottom: 4,
                width: '100%',
                height: 40,
              }}
            />
          </View>
          <View style={styles.rowLabelContainer}>
            <Text style={styles.rowLabel}>Suggested - Investing Basics</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
            }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {investingBasics.map(({id, uri, poster, title}) => (
                <View
                  key={id}
                  style={{
                    width: 230,
                    height: 250,
                    borderRadius: 15,
                    backgroundColor: '#6666ff',
                    margin: 8,
                    overflow: 'hidden',
                  }}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('VideoPlayer', {
                        link: uri,
                      })
                    }>
                    <ImageBackground
                      source={{
                        uri: poster,
                      }}
                      style={{
                        width: 230,
                        height: 250,
                        borderRadius: 20,
                      }}
                    />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.rowLabelContainer}>
            <Text style={styles.rowLabel}>Suggested - Stock Trading</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 24}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {stockTrading.map(({id, uri, poster}) => {
                return (
                  <View
                    key={id}
                    style={{
                      width: 230,
                      height: 250,
                      borderRadius: 15,
                      backgroundColor: '#6666ff',
                      margin: 8,
                      overflow: 'hidden',
                    }}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('VideoPlayer', {
                          link: uri,
                        })
                      }>
                      <ImageBackground
                        source={{
                          uri: poster,
                        }}
                        style={{width: 230, height: 250, borderRadius: 20}}
                      />
                    </Pressable>
                    {/* <Text style={styles.item}>{title}</Text> */}
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.rowLabelContainer}>
            <Text style={styles.rowLabel}>Suggested - Financial Planning</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 24}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {financialPlanning.map(({id, uri, poster}) => (
                <View
                  key={id}
                  style={{
                    width: 230,
                    height: 250,
                    borderRadius: 15,
                    backgroundColor: '#6666ff',
                    margin: 8,
                    overflow: 'hidden',
                  }}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('VideoPlayer', {
                        link: uri,
                      })
                    }>
                    <ImageBackground
                      source={{
                        uri: poster,
                      }}
                      style={{width: 230, height: 250, borderRadius: 20}}
                    />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default withTheme(LearningCentral);
