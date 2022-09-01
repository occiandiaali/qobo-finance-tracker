import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import SearchBarComponent from '../../components/SearchBarComponent';

import {RAPID_API_KEY} from '@env';

const styles = StyleSheet.create({
  backIcon: {
    color: '#fff',
    left: 4,
    top: 24,
  },
  searchBar: {
    marginLeft: '5%',
    paddingRight: 8,
  },
  searchHeader: {
    padding: 8,
    flexDirection: 'row',
    // alignContent: 'space-between',
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#d2d6d9',
    margin: 12,
    borderRadius: 36,
  },
});

const VideoSearch = ({navigation: {goBack}}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [showIcons, setShowIcons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [input, setInput] = useState('');

  const onChangeText = async text => {
    setInput(text);
    if (text.length === 0) {
      return setApiData([]);
    } else if (text.length > 2) {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/',
      );
      if (response) {
        const data = await response.json();
        if (data.length > 0) {
          setApiData(data);
        }
      }
    }
  };
  //   const getDataFromAPI = () => {
  //     fetch('http://dummy.restapiexample.com/api/v1/employees')
  //       .then(response => {
  //         return response.json();
  //       })
  //       .then(res => {
  //         for (let i = 0; i < res.data[i].length; i++) {
  //           setSearchPhrase(res.data[i].employee_name);
  //           apiData.push(res.data[i].employee_name);
  //         }
  //         setApiData(apiData);
  //       });
  //   };
  //   useEffect(() => {
  //     const loadData = async () => {
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/todos/',
  //       );
  //       const res = await response.json();
  //       setTodos(res);
  //     };

  //     loadData().catch(e => console.log(e));
  //   }, []);

  //   const searchYouTube = async q => {
  //     q = encodeURIComponent(q);
  //     setLoading(true);
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': RAPID_API_KEY,
  //         'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com',
  //       },
  //     };
  //     try {
  //       const response = await fetch(
  //         `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${q}`,
  //         options,
  //       );
  //       const body = await response.json();
  //       return body.item.filter(item => item.type === 'video');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);

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
            placeholder="Search videos"
            value={input}
            onChangeText={onChangeText}
            style={{
              left: 8,
              width: '85%',
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={apiData}
          renderItem={({item, index}) => (
            <Pressable
              style={{
                padding: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => console.log('Selection ', item)}>
              <Text>{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideoSearch;
