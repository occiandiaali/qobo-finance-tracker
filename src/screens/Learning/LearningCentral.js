import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {withTheme} from 'react-native-paper';

import SearchBarComponent from '../../components/SearchBarComponent';
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
    color: '#3333ff',
  },
  rowLabelContainer: {
    left: 16,
    top: 8,
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
const imageUrls = [
  {
    id: 1,
    uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg',
  },
  {
    id: 2,
    uri: 'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072__340.jpg',
  },
  {
    id: 3,
    uri: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287__340.jpg',
  },
  {
    id: 4,
    uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  },
  {
    id: 5,
    uri: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg',
  },
  {
    id: 6,
    uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg',
  },
];

const LearningCentral = ({theme, navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const renderItem = ({item}) =>
    !loading ? (
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
        }}
        resizeMode="cover"
        style={{
          width: 200,
          height: 240,
          borderRadius: 20,
          margin: 8,
        }}>
        <Pressable
          //  key={item.videoId}
          // style={styles.videoView}
          onPress={() =>
            console.log(`VideoID: ${item.contentDetails.videoId}`)
          }>
          {/* <Text style={styles.item}>{item.snippet.title}</Text> */}
        </Pressable>
        <Text style={styles.item}>{item.snippet.title}</Text>
      </ImageBackground>
    ) : (
      <ActivityIndicator size={'large'} style={{marginTop: '60%'}} />
    );

  // const renderItem = ({item}) => (
  //   <View style={styles.videoView}>
  //     <Pressable
  //       style={styles.videoView}
  //       onPress={() => console.log(`VideoID: ${item.contentDetails.videoId}`)}
  //     />
  //     <Text>{item.snippet.title}</Text>
  //   </View>
  // );

  const fetchPlaylistData = async () => {
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID_1}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${YOUTUBE_KEY}`,
    // );
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID_1}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${YOUTUBE_KEY}`,
    );
    const json = await response.json();
    // setVideos(json.items);
    setVideos(json);
    // console.log('Videos: ', videos);
  };
  useEffect(() => {
    // fetchPlaylistData();
    console.log('Videos: ', videos);
    //.catch(e => console.log(e));
  }, [videos]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchPlaylistData()
  //     .then(() => setLoading(false))
  //     .catch(e => console.log(e));
  // }, [videos]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <View style={{paddingTop: 32}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={img}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={img}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
        </ScrollView>
      </View> */}

      <SearchBarComponent
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <View style={styles.rowLabelContainer}>
        <Text style={styles.rowLabel}>Crypto</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 24}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {imageUrls.map(({uri, id}) => (
            <View
              key={id}
              style={{
                width: 200,
                height: 220,
                borderRadius: 20,
                backgroundColor: '#6666ff',
                margin: 8,
              }}>
              <ImageBackground
                source={{
                  uri: uri,
                }}
                style={{width: 200, height: 220, borderRadius: 20}}>
                <Text
                  style={{
                    color: '#ffffff',
                    alignSelf: 'center',
                    marginTop: '60%',
                    fontSize: 24,
                  }}>
                  Image Sample
                </Text>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.rowLabelContainer}>
        <Text style={styles.rowLabel}>Stock Trading</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 24}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={videos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.videoView} key={item.videoId}>
              <Pressable
                onPress={() => {
                  console.log(`Video ID ${item.contentDetails.videoId}`);
                  console.log(
                    `Thumbnail ${item.snippet.thumbnails.medium.url}`,
                  );
                }}>
                <Text style={styles.item}>{item.snippet.title}</Text>
              </Pressable>
            </View>
          )}
        />
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {videos.item.map(({id, snippet = {}}) => {
            const {title, thumbnails = {}, resourceId = {}} = snippet;
            const {medium} = thumbnails;
            return (
              <View
                key={id}
                style={{
                  width: 200,
                  height: 220,
                  borderRadius: 20,
                  backgroundColor: '#6666ff',
                  margin: 8,
                }}>
                <Pressable>
                  <Image
                    source={{
                      uri: medium.url,
                    }}
                    style={{width: 200, height: 220, borderRadius: 20}}
                  />
                </Pressable>
                <Text style={styles.item}>{title}</Text>
              </View>
            );
          })}
        </ScrollView> */}
      </View>

      <View style={styles.rowLabelContainer}>
        <Text style={styles.rowLabel}>Investing Basics</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 24}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {imageUrls.map(({uri, id}) => (
            <View
              key={id}
              style={{
                width: 200,
                height: 220,
                borderRadius: 20,
                backgroundColor: '#6666ff',
                margin: 8,
              }}>
              <Image
                source={{
                  uri: uri,
                }}
                style={{width: 200, height: 220, borderRadius: 20}}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default withTheme(LearningCentral);
