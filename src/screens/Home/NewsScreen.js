import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RAPID_API_KEY} from '@env';

const ItemRender = ({item}) => (
  <View style={{padding: 12, flexDirection: 'row'}}>
    <Image
      style={{width: 50, height: 50, borderRadius: 25, marginRight: 8}}
      source={{
        uri: 'https://img.freepik.com/free-vector/gradient-abstract-logo_52683-8517.jpg',
      }}
    />
    <Text style={{fontSize: 16}}>{item}</Text>
  </View>
);

const Divider = () => (
  <View
    style={{
      height: 1,
      width: '85%',
      backgroundColor: 'gray',
      alignSelf: 'center',
    }}
  />
);

const NewsScreen = ({theme}) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderItem = item => (
    <View style={{padding: 12}}>
      <View>
        <Text style={{fontSize: 16, padding: 6, color: '#ffffff'}}>
          {item.title}
          <View style={{paddingLeft: 6}}>
            <Text
              onPress={() => console.log(`${item.link}`)}
              style={{fontSize: 12, color: '#ff0000'}}>
              READ...
            </Text>
          </View>
        </Text>
      </View>
      <Text style={{fontSize: 12, padding: 6, color: '#ffffff'}}>
        Source: {item.source}
      </Text>
    </View>
  );

  const getData = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(
        'https://mboum-finance.p.rapidapi.com/ne/news',
        options,
      );
      const json = await response.json();
      setApiData(json);
      setLoading(false);
      // console.log('JSON Data ', json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      resizeMode="cover"
      style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={{color: '#3333ff', alignSelf: 'center', marginTop: '50%'}}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={apiData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
          ItemSeparatorComponent={Divider}
        />
      )}
    </ImageBackground>
  );
};

export default withTheme(NewsScreen);
