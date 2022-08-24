import React, {useState, useEffect, useCallback} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import {withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import BarChartComponent from '../../components/BarChartComponent';

import {
  getDBConnection,
  createTransactionsTable,
  getTransactionsGroupedByTransactionType,
  getExpenseGroupedByMonth,
  getIncomeGroupedByMonth,
} from '../../../data/db-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
});

const BarChartScreen = ({theme}) => {
  const {colors, fonts} = theme;

  const [byTransactionTypes, setByTransactionTypes] = useState([]);
  const [byIncomeCategory, setByIncomeCategory] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);

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

  const dataset = [];

  if (monthlyExpense.length > 0) {
    dataset.push({
      data: monthlyExpense.map(item => item.value),
      color: (opacity = 1) => '#003049',
      strokeWidth: 2,
    });
  }
  if (monthlyIncome.length > 0) {
    dataset.push({
      data: monthlyIncome.map(item => item.value),
      color: (opacity = 1) => '#003049',
      strokeWidth: 2,
    });
  }

  const chartData = {
    labels: monthlyIncome.map(item => item.label),
    dataset,
  };

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
          {hasMonthlyIncome && (
            <BarChartComponent
              title="Monthly Income"
              data={monthlyIncome}
              fillShadowGradient="#DF5353"
              color="#d62828"
            />
          )}
          {hasMonthlyExpense && (
            <BarChartComponent
              title="Monthly Expense"
              data={monthlyExpense}
              fillShadowGradient="#00b4d8"
              color="#0077b6"
            />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default withTheme(BarChartScreen);
