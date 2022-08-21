import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  Button,
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
    //  setDateShow(Platform.OS === 'ios');
    // setTransactionDate(currentDate);
  };

  // const showMode = currentMode => {
  //   if (Platform.OS === 'android') {
  //     setShow(false);
  //   }
  //   setMode(currentMode);
  // };

  const showDatePicker = () => {
    setShow(true);
    setMode('date');
  };

  const showSuccessScreen = () => {
    if (amount === '') {
      Alert.alert('Warning!!', 'Transaction cannot be saved!');
    } else {
      setAmount('');
      navigation.navigate('Notification');
    }
  };

  const {colors, fonts} = theme;

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>TransactionScreen</Text> */}
      <View style={styles.content}>
        <FieldContainer>
          {/* <Text style={{fontSize: 24}}>Date</Text> */}
          <View style={styles.selectDate}>
            <Pressable onPress={showDatePicker}>
              <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                {date.toDateString().slice(4)}
              </Text>
            </Pressable>
          </View>
        </FieldContainer>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onDateChange}
          />
        )}
        <FieldContainer>
          <Text style={{fontSize: 21, color: colors.white}}>Type</Text>
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
          <Text style={{fontSize: 21, color: colors.white}}>Summary</Text>
          <TextInput
            mode="flat"
            underlineColor={colors.white}
            theme={{roundness: 0}}
            style={styles.input}
            onChangeText={text => setSummary(text)}
            value={summary}
            placeholder="brief description..."
          />
        </FieldContainer>
        <FieldContainer>
          <Text style={{fontSize: 21, color: colors.white}}>Amount</Text>
          <TextInput
            mode="flat"
            underlineColor={colors.white}
            theme={{roundness: 0}}
            style={styles.input}
            onChangeText={text => setAmount(text)}
            value={amount}
            placeholder="amount..."
            keyboardType="number-pad"
          />
        </FieldContainer>
        <FieldContainer>
          <View style={styles.saveButton}>
            <Pressable onPress={showSuccessScreen}>
              <Text style={{fontSize: 21, fontWeight: 'bold'}}>Save</Text>
            </Pressable>
          </View>
        </FieldContainer>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(TransactionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#4b0082',
  },
  content: {
    marginTop: '25%',
  },
  dropdown: {
    height: 43,
    marginTop: 5,
  },
  saveButton: {
    width: 220,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    marginLeft: -32,
  },
  selectDate: {
    width: 220, //180,
    height: 50, //40,
    borderRadius: 20,
    backgroundColor: 'orange',
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '50%', //'57%',
  },
});
