import React, {useState, useEffect} from 'react';
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

const styles = StyleSheet.create({
  loadingText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 8,
  },
});

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

const NewsScreen = ({theme, navigation}) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderItem = item => (
    <View style={{padding: 12}}>
      <View>
        <Text style={{fontSize: 16, padding: 6, color: '#5184ad'}}>
          {item.title}
          <View style={{paddingLeft: 6}}>
            <Text
              onPress={() =>
                navigation.navigate('News Detail', {
                  articleLink: item.link,
                })
              }
              style={{fontSize: 18, paddingLeft: 4, top: 6, color: '#6666ff'}}>
              READ...
            </Text>
          </View>
        </Text>
      </View>
      <Text style={{fontSize: 12, padding: 6, color: '#aaabad'}}>
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
    // <View
    //   source={{
    //     uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
    //   }}
    //   resizeMode="cover"
    //   style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <>
          <ActivityIndicator
            size={'large'}
            style={{color: '#3333ff', alignSelf: 'center', marginTop: '50%'}}
          />
          <Text style={styles.loadingText}>
            Please wait, while we load stories...
          </Text>
        </>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={apiData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
          ItemSeparatorComponent={Divider}
        />
      )}
    </View>
  );
};

export default withTheme(NewsScreen);
