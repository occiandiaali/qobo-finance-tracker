import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  Button,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput, withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FieldContainer from '../../components/FieldContainer';
import FieldLabel from '../../components/FieldLabel';
import DropDown from 'react-native-paper-dropdown';

import {
  getDBConnection,
  createCategoriesTable,
  createCategory,
  getCategories,
} from '../../../data/db-service';

// const TransactionTypes = Object.freeze({
//   Expense: Symbol('expense'),
//   Income: Symbol('income'),
// });
const transactionTypes = [
  {
    label: 'Expense',
    value: 'expense',
  },
  {
    label: 'Income',
    value: 'income',
  },
  {
    label: 'Investment',
    value: 'investment',
  },
  {
    label: 'Savings',
    value: 'savings',
  },
];

const TransactionScreen = ({navigation, theme}) => {
  // const [transactionDate, setTransactionDate] = useState(new Date(1598051730000));
  // const [date, setDate] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date('Jan 01 2022'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [showTransactionTypeDropDown, setShowTransactionTypeDropDown] =
    useState(false);
  const [summary, setSummary] = useState('');
  const [amount, setAmount] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
    setMode('date');
  };

  const showSuccessScreen = () => {
    if (amount === '') {
      Alert.alert('Warning!!', 'Transaction cannot be saved!');
    } else {
      loadDataCallback();
      console.log(`Type: ${JSON.stringify(transactionType)}`);
      console.log(`Summary: ${summary}`);
      console.log(`Amt: ${amount}`);
      console.log(`Date: ${date}`);
      setSummary('');
      setAmount('');
      navigation.navigate('Notification');
    }
  };

  const {colors, fonts} = theme;

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createCategoriesTable(db);
      await createCategory(db, transactionType);
      const storedCategories = await getCategories(db);
      if (storedCategories.length) {
        setTransactionType(storedCategories);
      }
    } catch (error) {
      console.error(error);
    }
  }, [transactionType]);

  // useEffect(() => {
  //   loadDataCallback();
  // }, [loadDataCallback]);

  return (
    <ImageBackground
      source={{
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gCbld6bch7MjYd5jHUhfn9StqDMMdQ4qkg&usqp=CAU',
        //uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-5F_JrtgVh3J4oVy8ZpqxFDkiGf3aaAylg&usqp=CAU',
        // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7JejWoZc-3TH9krKkFh1n-ABafVimrU34Q&usqp=CAU',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      style={{
        flex: 1,
      }}>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.content}>
        <FieldContainer>
          <View style={styles.selectDate}>
            <Pressable onPress={showDatePicker}>
              <Text style={{color: '#000', fontSize: 21, fontWeight: 'bold'}}>
                {date.toDateString().slice(4)}
              </Text>
            </Pressable>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onDateChange}
            />
          )}
        </FieldContainer>

        <View style={{padding: 12}}>
          <FieldContainer>
            <Text style={{fontSize: 21, color: '#fff'}}>Type</Text>
            <DropDown
              mode={'flat'}
              value={transactionType}
              setValue={setTransactionType}
              list={transactionTypes}
              visible={showTransactionTypeDropDown}
              showDropDown={() => setShowTransactionTypeDropDown(true)}
              onDismiss={() => setShowTransactionTypeDropDown(false)}
              inputProps={{
                right: <TextInput.Icon name={'menu-down'} />,
                theme: {roundness: 0},
                style: styles.dropdown,
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <Text style={{fontSize: 21, color: '#fff'}}>Summary</Text>
            <TextInput
              mode="flat"
              underlineColor={colors.gray}
              theme={{roundness: 0}}
              style={styles.input}
              onChangeText={text => setSummary(text)}
              value={summary}
              placeholder="brief description..."
            />
          </FieldContainer>
          <FieldContainer>
            <Text style={{fontSize: 21, color: '#fff'}}>Amount</Text>
            <TextInput
              mode="flat"
              underlineColor={colors.gray}
              theme={{roundness: 0}}
              style={styles.input}
              onChangeText={text => setAmount(text)}
              value={amount}
              placeholder="amount..."
              keyboardType="number-pad"
            />
          </FieldContainer>
          <FieldContainer>
            <Text onPress={showSuccessScreen} style={styles.saveButton}>
              Save
            </Text>
          </FieldContainer>
        </View>
      </View>

      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

export default withTheme(TransactionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#d9e7fc', //'white', //'#4b0082',
  },
  content: {
    marginTop: '25%',
  },
  dropdown: {
    height: 43,
    marginTop: 5,
  },
  saveButton: {
    width: 250,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#6666ff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 28,
    marginLeft: -48,
    color: '#000',
    fontSize: 21,
    fontWeight: 'bold',
  },
  selectDate: {
    width: 220, //180,
    height: 50, //40,
    borderRadius: 20,
    backgroundColor: '#6666ff',
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '50%', //'57%',
  },
});
