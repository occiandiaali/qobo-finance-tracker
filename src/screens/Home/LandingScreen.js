import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
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
  backgroundGradientFrom: '#f2f2f2',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pieContainer: {
    height: '40%', //'45%',
    backgroundColor: '#7788ff',
    borderRadius: 24,
    marginLeft: 8,
    marginRight: 8,
    marginTop: '35%',
  },
});

const LandingScreen = ({theme, navigation}) => {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState([]);
  const [monthlyInvestments, setMonthlyInvestments] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTransactionsTable(db);

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
    const unsubscribe = navigation.addListener('focus', () =>
      loadDataCallback(),
    );
    return () => unsubscribe;
  }, [loadDataCallback, navigation]);

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

  const pullLatestData = useCallback(() => {
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
    const year = d.getFullYear();
    const d1 = month < 10 ? `0${month + 1}-${year}` : `${month + 1}-${year}`;

    const monthsArray = monthlyExpense.map(m => m.label);
    const allMonthsArray = allData.map(data => data.label);
    const allNamesArray = allData.map(data => data.name);
    console.log('All names array: ', allNamesArray);
    setHasCurrentMonthData(allMonthsArray.includes(d1));
    console.log('d1: ', d1);
    // console.log('split-d1 ', d1.split('-')[0]);

    // console.log('split-d1 num ', parseInt(d1.split('-')[0], 10));

    // console.log('Includes?: ', allMonthsArray.includes(d1));
    setThisMonth(monthNames.get(parseInt(d1.split('-')[0], 10)));

    console.log('Month: ', monthsArray);
    console.log('All Data: ', allData);

    const chosen = allData.filter(v => v.label === d1);
    //  chosen.map(({label}) => console.log(`Labels: ${label}`));
    //  chosen.map(({color}) => console.log(`Colours: ${color}`));
    setPieData(chosen);
    console.log('All Pie Chosen Values: ', chosen);
  }, [monthlyExpense, monthlyIncome, monthlyInvestments, monthlySavings]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDataCallback();
    wait(2000).then(() => setRefreshing(false));
  }, [loadDataCallback]);

  useEffect(() => {
    pullLatestData();
  }, [pullLatestData]);

  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(false);

  const ComponentOne = () => (
    <PieChart
      data={pieData}
      width={screenWidth}
      height={250}
      chartConfig={chartConfig}
      accessor={'value'}
      backgroundColor={'transparent'}
      paddingLeft={'9'}
      center={[10, 0]}
    />
  );
  const ComponentTwo = () => (
    <View
      style={{
        height: 250,
        width: screenWidth,
        backgroundColor: '#7777ff',
      }}
    />
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      // showOne === true ? setShowOne(false) : setShowOne(true);
      //  showTwo === false ? setShowTwo(true) : setShowTwo(false);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [showOne, showTwo]);

  return (
    <SafeAreaView style={styles.landingContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#fff']}
            progressBackgroundColor={'#8888ff'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Text
          style={{
            alignSelf: 'center',
            top: '5%',
            color: '#4444ff',
            fontSize: 70,
            fontWeight: '200',
          }}>
          qobo
        </Text>

        <View style={styles.pieContainer}>
          {hasCurrentMonthData ? (
            (showOne && ComponentOne()) || (showTwo && ComponentTwo())
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
          <Text
            style={{
              color: '#5555ff',
              fontSize: 21,
              fontWeight: 'bold',
              left: 32,
            }}>
            {hasCurrentMonthData
              ? `${thisMonth} overview`
              : `No data for ${thisMonth}`}
          </Text>
          {!hasCurrentMonthData && (
            <Text style={{left: '10%'}}>Pull to refresh</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTheme(LandingScreen);
