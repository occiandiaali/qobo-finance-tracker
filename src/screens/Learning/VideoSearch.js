import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
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
    textAlign: 'auto',
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
    right: 0,
    left: 4,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  titleDesc: {
    paddingRight: 16,
  },
});

const VideoSearch = ({navigation: {goBack}}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [showIcons, setShowIcons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
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

  const str = [
    'bitcoin',
    'crypto',
    'ethereum',
    'financial',
    'finance',
    'funds',
    'fund',
    'funding',
    'money market',
    'pension',
    'invest',
    'investment',
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
    if (areWordsInInput(text.toLowerCase(), str)) {
      searchYouTube(text).catch(e => console.log(e));
    }
  };

  const renderItem = item => (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.titleDesc}>
          <Text numberOfLines={2} style={{fontSize: 21, color: '#8888ff'}}>
            {item.title}
          </Text>
          <View style={{paddingTop: 6}}>
            <Text style={{fontSize: 12, paddingRight: 8}}>
              by: {item.channel.name}
            </Text>
            <Text style={{fontSize: 12, paddingRight: 8}}>
              duration: {new Date(item.duration).toISOString().slice(11, 19)}
            </Text>
            <Text style={{fontSize: 12, paddingRight: 8}}>
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
            onPress={() => goBack()}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            // placeholderTextColor="#9999ff"
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
      </View>
    </SafeAreaView>
  );
};

export default VideoSearch;
