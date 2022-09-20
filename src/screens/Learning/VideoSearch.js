import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {RAPID_API_KEY} from '@env';

const styles = StyleSheet.create({
  backIcon: {
    color: '#fff',
    left: 4,
    top: 24,
  },
  dataPlaceholder: {
    padding: 8,
    color: '#aaabad',
    fontSize: 16,
    fontFamily: 'Ubuntu-Light',
    textAlign: 'auto',
    lineHeight: 21,
  },
  dataPlaceholderContainer: {
    alignSelf: 'center',
    marginTop: '50%',
  },
  itemContainer: {
    flex: 1,
    width: '80%',
    alignContent: 'space-between',
    padding: 6,
    borderBottomColor: '#aaabad',
    borderBottomWidth: 0.2,
    marginBottom: 8,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 6,
    bottom: 8,
  },
  searchBar: {
    marginLeft: '5%',
    paddingRight: 8,
  },
  searchHeader: {
    padding: 8,
    flexDirection: 'row',
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#d2d6d9',
    margin: 12,
    borderRadius: 36,
  },
  thumbnail: {
    height: 80,
    width: 90,
    borderRadius: 10,
  },
  thumbnailContainer: {
    height: 80,
    width: 90,
    borderRadius: 10,
    position: 'absolute',
    marginLeft: '95%',
  },
  titleDesc: {
    paddingRight: 16,
  },
});

const VideoSearch = ({navigation}) => {
  const [apiData, setApiData] = useState([]);
  const [input, setInput] = useState('');

  const searchYouTube = async q => {
    q = encodeURIComponent(q);
    // setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(
        `https://simple-youtube-search.p.rapidapi.com/search?query=${q}`,
        options,
      );
      const body = await response.json();
      // setApiData(body.item.filter(item => item.type === 'video'));
      console.log('ApiData ', apiData);
      return setApiData(body.results);
    } catch (error) {
      console.error(error);
    }
  };

  const seoArray = [
    'investment management',
    'loans',
    'mortgage',
    'financial services',
    'life insurance',
    'personal loan',
    'investment planning',
    'investment bank',
    'mutual funds',
    'wealth management',
    'financial advice',
    'financial advisor',
    'stock exchange',
    'financial markets',
    'financial budget',
    'electronic wallet',
    'bitcoin',
    'crypto',
    'ethereum',
    'financial',
    'finance',
    'money fund',
    'funding',
    'money market',
    'pension',
    'invest',
    'stock',
    'trading',
  ];
  const areWordsInInput = (haystack, needle) => {
    return needle.some(word => haystack.includes(word));
  };

  const onChangeTextHandler = async text => {
    setInput(text);
    if (text.length < 2) {
      return setApiData([]);
    }
    if (areWordsInInput(text.toLowerCase(), seoArray)) {
      searchYouTube(text).catch(e => console.log(e));
    }
  };

  const renderItem = item => (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.titleDesc}>
          <Text
            onPress={() =>
              navigation.navigate('VideoPlayer', {
                link: item.url,
              })
            }
            numberOfLines={2}
            style={{fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#8888ff'}}>
            {item.title}
          </Text>
          <View style={{paddingTop: 6}}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Ubuntu-Regular',
                fontWeight: '800',
                paddingRight: 8,
              }}>
              by: {item.channel.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Ubuntu-Regular',
                fontWeight: '800',
                paddingRight: 8,
              }}>
              duration: {new Date(item.duration).toISOString().slice(11, 19)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Ubuntu-Regular',
                fontWeight: '800',
                paddingRight: 8,
              }}>
              uploaded: {item.uploadedAt}
            </Text>
          </View>
        </View>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{uri: `${item.thumbnail.url}`}}
            style={styles.thumbnail}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.searchHeader}>
        <View style={styles.backIcon}>
          <Icon
            name="arrow-back"
            size={24}
            // color="#4444ff"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            autoFocus={true}
            placeholder="Search financial videos"
            value={input}
            onChangeText={onChangeTextHandler}
            style={{
              left: 16,
              bottom: 4,
              width: '85%',
              height: 40,
            }}
          />
          <Icon
            name="close"
            size={24}
            // color="#4444ff"
            style={{right: 4, left: 4, top: 4}}
            onPress={() => {
              setInput('');
              setApiData([]);
            }}
          />
        </View>
      </View>
      <View style={styles.resultContainer}>
        {input.length < 3 && !seoArray.includes(input) ? (
          <View style={styles.dataPlaceholderContainer}>
            <Text style={styles.dataPlaceholder}>
              Search for videos about financial matters.
              {'\n'}
              e.g. "How to invest..", "stock market basics", "pension funds" ...
            </Text>
          </View>
        ) : !apiData.length ? (
          <ActivityIndicator
            size={'large'}
            style={{marginTop: '20%', alignSelf: 'center'}}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={apiData}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item.id}
          />
        )}
      </View>

      {/* <View style={styles.resultContainer}>
        {!apiData.length ? (
          <View style={styles.dataPlaceholderContainer}>
            <Text style={styles.dataPlaceholder}>
              Search for videos about financial matters.
              {'\n'}
              e.g. "How to invest..", "stock market basics", "pension funds" ...
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={apiData}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item.id}
          />
        )}
      </View> */}
    </SafeAreaView>
  );
};

export default VideoSearch;
