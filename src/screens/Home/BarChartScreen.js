import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import BarChartComponent from '../../components/BarChartComponent';
import {StackedBarChart} from 'react-native-chart-kit';

import {
  getDBConnection,
  createTransactionsTable,
  getTransactionsGroupedByTransactionType,
  getExpenseGroupedByMonth,
  getIncomeGroupedByMonth,
  getSavingsGroupedByMonth,
  getInvestmentsGroupedByMonth,
} from '../../../data/db-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
});

const summonsConfig = {
  backgroundGradientFrom: '#2222ff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#9999ff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => '#023047',
  labelColor: (opacity = 1) => '#fff',
  strokeWidth: 2, // optional, default 3
  barPercentage: 2.5,
  useShadowColorFromDataset: false, // optional
};

const BarChartScreen = ({theme}) => {
  const {colors, fonts} = theme;
  const screenWidth = Dimensions.get('window').width;

  const [byTransactionTypes, setByTransactionTypes] = useState([]);
  const [byIncomeCategory, setByIncomeCategory] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState([]);
  const [monthlyInvestments, setMonthlyInvestments] = useState([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTransactionsTable(db);
      const groupedByTransactionTypes =
        await getTransactionsGroupedByTransactionType(db);
      if (groupedByTransactionTypes.length) {
        setByTransactionTypes(groupedByTransactionTypes);
      }

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

  const hasByTransactionTypes = byTransactionTypes.length > 0;
  const hasMonthlyIncome = monthlyIncome.length > 0;
  const hasMonthlyExpense = monthlyExpense.length > 0;
  const hasMonthlySavings = monthlySavings.length > 0;
  const hasMonthlyInvestments = monthlyInvestments.length > 0;

  const hasSavingsInvestment =
    monthlySavings.length > 0 || monthlyInvestments.length > 0;

  // const datasets = [];

  // if (monthlyExpense.length > 0) {
  //   datasets.push({
  //     data: monthlyExpense.map(item => item.value),
  //     color: (opacity = 1) => '#003049',
  //     strokeWidth: 2,
  //   });
  // }
  // if (monthlyIncome.length > 0) {
  //   datasets.push({
  //     data: monthlyIncome.map(item => item.value),
  //     color: (opacity = 1) => '#003049',
  //     strokeWidth: 2,
  //   });
  // }

  // if (hasMonthlySavings) {
  //   datasets.push({
  //     data: monthlySavings.map(item => item.value),
  //     color: (opacity = 1) => '#003049',
  //     strokeWidth: 2,
  //   });
  // }

  // if (hasMonthlyInvestments) {
  //   datasets.push({
  //     data: monthlyInvestments.map(item => item.value),
  //     color: (opacity = 1) => '#003049',
  //     strokeWidth: 2,
  //   });
  // }

  const savings = monthlySavings.map(item => {
    return item.name;
  });
  const investments = monthlyInvestments.map(item => {
    return item.name;
  });

  const savingsValues = monthlySavings.map(item => {
    return item.value;
  });
  const investmentValues = monthlyInvestments.map(item => {
    return item.value;
  });

  const savingsColours = monthlySavings.map(({color}) => color);
  const investmentColours = monthlyInvestments.map(({color}) => color);

  // const summonsData = {
  //   labels: [label2, label1],
  //   legend: ['Savings', 'Investments'],
  //   data: [[...values1], [...values2]],
  //   barColors: ['#61035b', '#fc81f4'],
  //   // barColors: ['#79d11b', '#2a4f03'],
  // };
  // const summonsData = {
  //   labels: ['Test1', 'Test2'],
  //   legend: ['L1', 'L2', 'L3'],
  //   data: [
  //     [60, 60, 60],
  //     [30, 30, 60],
  //   ],
  //   barColors: ['#ed665c', '#e63c30', '#660a03'],
  // };

  const summonsData = {
    labels: ['Savings', 'Investments'],
    // legend: ['L2', 'L3'],
    data: [[...savingsValues], [...investmentValues]],
    // barColors: ['#ed665c', '#e63c30', '#660a03'],
    barColors: [...savingsColours, ...investmentColours],
    // barColors: ['#a32626', '#3a8505'],
  };

  // const chartData = {
  //   labels: monthlyIncome.map(item => item.label),
  //   datasets,
  // };

  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          {hasSavingsInvestment && (
            <>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  alignSelf: 'center',
                  paddingBottom: 8,
                }}>
                {'Annual Savings vs. Investments'}
              </Text>
              <StackedBarChart
                style={{
                  paddingBottom: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                data={summonsData}
                width={screenWidth}
                height={220}
                chartConfig={summonsConfig}
                //withHorizontalLabels={false}
              />
            </>
          )}
          {hasMonthlyExpense && (
            <BarChartComponent
              title="Monthly Expense"
              data={monthlyExpense}
              fillShadowGradient="#00b4d8"
              color="#0077b6"
            />
          )}
          {hasMonthlyIncome && (
            <BarChartComponent
              title="Monthly Income"
              data={monthlyIncome}
              fillShadowGradient="#DF5353"
              color="#d62828"
            />
          )}
          {hasMonthlySavings && (
            <BarChartComponent
              title="Monthly Savings"
              data={monthlySavings}
              fillShadowGradient="#ac3363"
              color="#a32626"
            />
          )}
          {hasMonthlyInvestments && (
            <BarChartComponent
              title="Monthly Investments"
              data={monthlyInvestments}
              fillShadowGradient="#87fa7d"
              color="#3a8505"
            />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default withTheme(BarChartScreen);
