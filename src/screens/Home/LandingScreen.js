import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  Dimensions,
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
import {SafeAreaView} from 'react-native-safe-area-context';
import PieChartComponent from '../../components/PieChartComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import {LineChart, PieChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const chartConfig = {
  backgroundGradientFrom: '#f2f2f2', //'#b3b3ff', //'#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff', //'#9999ff', //'#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  // strokeWidth: 2,
  // barPercentage: 0.5,
  // useShadowColorFromDataset: false,
};

const screenWidth = Dimensions.get('window').width;

const LandingScreen = ({theme}) => {
  const [byTransactionTypes, setByTransactionTypes] = useState([]);
  const RenderBSContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ['25%', '40%', '80%'], []);
  const handleSheetChanges = React.useCallback(index => {
    console.log('handle sheet changes ', index);
  }, []);
  const handlePresent = React.useCallback(() => {
    sheetRef.current.present();
  }, []);
  const renderItem = React.useCallback(
    item => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );
  // const data = React.useMemo(
  //   () =>
  //     Array(20)
  //       .fill(0)
  //       .map((_, index) => `index-${index}`),
  //   [],
  // );
  const data1 = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 9,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 9,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 9,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 9,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 9,
    },
  ];
  const DATA = Array.from({length: 29}, (v, i) => i);
  const ItemRender = ({item}) => (
    <View style={{padding: 12, flexDirection: 'row'}}>
      <Image
        style={{width: 50, height: 50, borderRadius: 25, marginRight: 8}}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKDPH3q6Lv1gFcHLmSekxg4uDP5n72gHLKg&usqp=CAU',
        }}
      />
      <Text style={{fontSize: 16}}>This is entry no. {item}</Text>
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
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [20, 46, 31, 80, 99, 3, 34, 16, 55, 62, 31, 80],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const finances = [
    {
      name: 'Expenses',
      value: 178000,
      color: '#F00',
      legendFontColor: '#fff', //'#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Income',
      value: 54000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#fff', //'#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Savings',
      value: 1200,
      color: 'rgba(225, 120, 210, 1)',
      legendFontColor: '#fff', //'#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Investments',
      value: 36000,
      color: '#0F0',
      legendFontColor: '#fff', //'#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <ImageBackground
      source={{
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gCbld6bch7MjYd5jHUhfn9StqDMMdQ4qkg&usqp=CAU',
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-5F_JrtgVh3J4oVy8ZpqxFDkiGf3aaAylg&usqp=CAU',
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7JejWoZc-3TH9krKkFh1n-ABafVimrU34Q&usqp=CAU',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      style={{
        flex: 1,
      }}>
      {/* <View style={styles.container}> */}
      {/* <View style={styles.pie}>
        <PieChartComponent title="Overview" data={byTransactionTypes} />
      </View> */}
      {/* <View style={styles.liner}>
        <LineChart
          data={data}
          width={screenWidth}
          height={360}
          center={[50, 50]}
          chartConfig={chartConfig}
          bezier
        />
      </View> */}
      <View style={styles.pieContainer}>
        <PieChart
          data={finances}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
          accessor={'value'}
          backgroundColor={'transparent'}
          paddingLeft={'9'}
          center={[10, 10]}
        />
        <Text style={{color: 'white', fontSize: 21, alignSelf: 'center'}}>
          Monthly overview
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          top: 25,
          right: 35,
          width: 55,
          height: 55,
          borderRadius: 27,
          backgroundColor: 'yellow',
        }}>
        <Icon name="rocket" size={35} color="#900" />
      </View>
      <Text style={styles.bar}>Bar Chart</Text>
      <Text style={styles.line}>Line Chart</Text>
      <Text onPress={() => sheetRef.current.open()} style={styles.showNews}>
        News
      </Text>
      <RBSheet
        ref={sheetRef}
        animationType="slide"
        closeOnDragDown={true}
        customStyles={{
          container: {
            height: '60%',
            borderTopLeftRadius: 21,
            borderTopRightRadius: 21,
            backgroundColor: '#c8d0e8',
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {/* <RenderBSContent /> */}
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={itemData => <ItemRender item={itemData.item} />}
          ItemSeparatorComponent={Divider}
        />
      </RBSheet>
      {/* </View> */}
    </ImageBackground>
  );
};

export default withTheme(LandingScreen);

const styles = StyleSheet.create({
  bar: {
    width: 250,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6666ff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: '15%', //28,
    marginLeft: -48, //-24,
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  bsContent: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // paddingTop: 200,
    backgroundColor: '#d9e7fc', //'white',
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  line: {
    width: 250,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6666ff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 28,
    marginLeft: '45%',
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  liner: {
    marginTop: 18,
  },
  pie: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginTop: '10%',
  },
  pieContainer: {
    height: '45%',
    backgroundColor: '#7788ff',
    borderRadius: 24,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
  },
  showNews: {
    width: 250,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2222ff', //'#6666ff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 28,
    marginLeft: -48, //-24,
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
