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

import {
  getDBConnection,
  createTransactionsTable,
  getTransactionsGroupedByTransactionType,
  getExpenseGroupedByMonth,
  getIncomeGroupedByMonth,
  getSavingsGroupedByMonth,
  getInvestmentsGroupedByMonth,
} from '../../../data/db-service';

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
const screenHeight = Dimensions.get('window').height;

const LandingScreen = ({theme, navigation}) => {
  const sheetRef = React.useRef(null);

  const [apiData, setApiData] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState([]);
  const [monthlyInvestments, setMonthlyInvestments] = useState([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTransactionsTable(db);
      // const groupedByTransactionTypes =
      //   await getTransactionsGroupedByTransactionType(db);
      // if (groupedByTransactionTypes.length) {
      //   setByTransactionTypes(groupedByTransactionTypes);
      // }

      const incomeMonth = await getIncomeGroupedByMonth(db);
      if (incomeMonth) {
        setMonthlyIncome(incomeMonth);
      }

      const expenseMonth = await getExpenseGroupedByMonth(db);
      if (expenseMonth) {
        setMonthlyExpense(expenseMonth);
      }

      const savingsMonth = await getSavingsGroupedByMonth(db);
      if (savingsMonth) {
        setMonthlySavings(savingsMonth);
      }

      const investmentMonth = await getInvestmentsGroupedByMonth(db);
      if (investmentMonth) {
        setMonthlyInvestments(investmentMonth);
      }
    } catch (error) {
      console.error('transaction list err: ', error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const hasMonthlyExpenses = monthlyExpense.length > 0;
  const hasMonthlyIncome = monthlyIncome.length > 0;
  const hasMonthlySavings = monthlySavings.length > 0;
  const hasMonthlyInvestments = monthlyInvestments.length > 0;

  const currentMonthData =
    hasMonthlyExpenses ||
    hasMonthlyIncome ||
    hasMonthlySavings ||
    hasMonthlyInvestments;

  const [thisMonth, setThisMonth] = useState(1);
  const [hasCurrentMonthData, setHasCurrentMonthData] =
    useState(currentMonthData);
  const [pieData, setPieData] = useState([]);

  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  // const d = new Date();
  // const monthName = months[d.getMonth()];

  // const getMonthName = monthNum => {
  //   const d = new Date();
  //   d.setMonth(monthNum - 1);
  //   const monthName = d.toLocaleString('default', {month: 'long'});
  //   return monthName;
  // };

  useEffect(() => {
    const allData = [
      ...monthlyExpense,
      ...monthlyIncome,
      ...monthlyInvestments,
      ...monthlySavings,
    ];
    const monthNames = new Map([
      [1, 'January'],
      [2, 'February'],
      [3, 'March'],
      [4, 'April'],
      [5, 'May'],
      [6, 'June'],
      [7, 'July'],
      [8, 'August'],
      [9, 'September'],
      [10, 'October'],
      [11, 'November'],
      [12, 'December'],
    ]);

    const d = new Date();
    const month = d.getMonth();
    //const month = d.getMonth() < 10 ? String(d.getMonth()).padStart();
    const year = d.getFullYear();
    const d1 = month < 10 ? `0${month + 1}-${year}` : `${month + 1}-${year}`;

    const monthsArray = monthlyExpense.map(m => m.label);
    const allMonthsArray = allData.map(data => data.label);
    const allMonthsArrayValues = allData.map(data => data.value);

    // setHasCurrentMonth(monthsArray.includes(d1));
    // setHasCurrentMonthData(allMonthsArray.includes(1));
    setHasCurrentMonthData(allMonthsArray.includes(d1));
    console.log('d1: ', d1);
    console.log('split-d1 ', d1.split('-')[0]);
    console.log('typeof split-d1 ', typeof d1.split('-')[0]);
    console.log('split-d1 num ', parseInt(d1.split('-')[0], 10));
    console.log('typeof split-d1 ', typeof parseInt(d1.split('-')[0], 10));
    console.log('Includes?: ', allMonthsArray.includes(d1));
    setThisMonth(monthNames.get(parseInt(d1.split('-')[0], 10)));
    // console.log('Get Month ', monthNames.get(8));
    console.log('Month: ', monthsArray);
    console.log('All Data: ', allData);
    const chosen = allData.filter(v => v.label === d1);
    setPieData(chosen);
    console.log('All Chosen Values: ', chosen);
  }, [monthlyExpense, monthlyIncome, monthlyInvestments, monthlySavings]);

  useEffect(() => {
    // getData();
  }, []);

  // const ItemRender = ({item}) => (
  //   <View style={{padding: 12, flexDirection: 'row'}}>
  //     <Image
  //       style={{width: 50, height: 50, borderRadius: 25, marginRight: 8}}
  //       source={{
  //         uri: 'https://img.freepik.com/free-vector/gradient-abstract-logo_52683-8517.jpg',
  //       }}
  //     />
  //     <Text style={{fontSize: 16}}>{item}</Text>
  //   </View>
  // );
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
  // const ribbon = {
  //   uri: 'https://img.freepik.com/free-photo/isolated-red-badge-with-ribbon_125540-1053.jpg',
  // };

  return (
    <ImageBackground
      source={{
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gCbld6bch7MjYd5jHUhfn9StqDMMdQ4qkg&usqp=CAU',
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-5F_JrtgVh3J4oVy8ZpqxFDkiGf3aaAylg&usqp=CAU',
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7JejWoZc-3TH9krKkFh1n-ABafVimrU34Q&usqp=CAU',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      resizeMode="cover"
      style={{
        height: '100%',
      }}>
      <View style={styles.pieContainer}>
        {hasCurrentMonthData ? (
          <PieChart
            data={pieData}
            width={screenWidth}
            height={250}
            chartConfig={chartConfig}
            accessor={'value'}
            backgroundColor={'transparent'}
            paddingLeft={'9'}
            center={[10, 4]}
          />
        ) : (
          <View
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              margin: 12,
              alignSelf: 'center',
              backgroundColor: 'gray',
            }}
          />
        )}
        {/* <Text style={{color: 'white', fontSize: 21, alignSelf: 'center'}}>
          August overview
        </Text> */}
        {/* <Text style={{color: 'white', fontSize: 21, alignSelf: 'center'}}>
          {thisMonth} overview
        </Text> */}
        <Text
          style={{color: 'white', fontSize: 21, fontWeight: 'bold', left: 32}}>
          {hasCurrentMonthData
            ? `${thisMonth} overview`
            : `No data for ${thisMonth}`}
        </Text>
        {/* <View style={{alignSelf: 'flex-end'}}>
          <Image
            source={ribbon}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              transform: [{rotate: '20deg'}],
            }}
          />
        </View> */}
      </View>

      {/* <Text
        onPress={() => navigation.navigate('Bar Charts')}
        style={styles.bar}>
        Bar Charts
      </Text>
      <Text
        style={styles.line}
        onPress={() => navigation.navigate('Line Charts')}>
        Line Charts
      </Text>
      <Text onPress={() => sheetRef.current.open()} style={styles.showNews}>
        News
      </Text> */}
      {/* <RBSheet
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={apiData}
          keyExtractor={item => item.guid}
          renderItem={({item}) => (
            <View style={{padding: 12, flexDirection: 'row'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 8,
                }}
                source={{
                  uri: 'https://img.freepik.com/free-vector/gradient-abstract-logo_52683-8517.jpg',
                }}
              />
              <Text numberOfLines={1} style={{fontSize: 16}}>
                {item.title}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={Divider}
        />
      </RBSheet> */}
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
    backgroundColor: '#7777ff',
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
    backgroundColor: '#5555ff',
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
    marginTop: '50%', //16,
  },
  showNews: {
    width: 250,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3333ff', //'#6666ff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 28,
    marginLeft: -48, //-24,
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
