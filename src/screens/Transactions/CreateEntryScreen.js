import React, {useState, useCallback, useEffect} from 'react';
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

import CustomDropDown from '../../components/CustomDropDown';

import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput, withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FieldContainer from '../../components/FieldContainer';
import FieldLabel from '../../components/FieldLabel';
import DropDown from 'react-native-paper-dropdown';

import {
  createTransactionsTable,
  getDBConnection,
  createTransaction,
} from '../../../data/db-service';

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
  disabledCreate: {
    width: 250,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#9099a3',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 28,
    alignSelf: 'center',
    //  marginLeft: -64, //-48,
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
  },
  enabledCreate: {
    width: 250,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#6666ff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 28,
    alignSelf: 'center',
    //  marginLeft: -64, //-48,
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#d7d9d7',
  },
  selectDate: {
    width: 220, //180,
    height: 50, //40,
    borderRadius: 20,
    backgroundColor: '#6666ff',
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //  marginLeft: '50%', //'57%',
  },
});

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

const CreateEntryScreen = ({navigation, theme}) => {
  const [transactionDate, setTransactionDate] = useState(
    new Date(), // new Date('Jan 01 2022'),
  );
  const [dateMode, setDateMode] = useState('date');
  const [dateShow, setDateShow] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [summary, setSummary] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [selected, setSelected] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || transactionDate;
    setDateShow(false);
    setTransactionDate(currentDate);
  };

  const showDatePicker = () => {
    setDateShow(true);
    setDateMode('date');
  };

  const createTransactionText = eventLoading ? 'Wait...' : 'Create';

  const createTransactionAction = useCallback(async () => {
    try {
      // if (transactionType === null && amount < 1) {
      if (!canCreate) {
        Alert.alert('Warning!', 'Input at least category and amount');
      } else {
        setEventLoading(true);
        const db = await getDBConnection();
        createTransaction(db, {
          transactionDate,
          summary,
          transactionType,
          amount,
        });
        console.log(
          `Entries: ${transactionDate} - ${transactionType} - ${amount} - ${summary}`,
        );
        setEventLoading(false);
        setTransactionDate(new Date());
        setSummary('');
        setTransactionType(null);
        setAmount(0.0);
        setSelected('');

        navigation.navigate('Notification');
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    canCreate,
    transactionDate,
    summary,
    transactionType,
    amount,
    navigation,
  ]);

  const loadDBCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTransactionsTable(db);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadDBCallback();
  }, [loadDBCallback]);

  //   const saveToDB = () => {
  //     if (amount === '') {
  //       Alert.alert('Warning!!', 'Entry cannot be saved!');
  //     } else {
  //       console.log('Entries 1 ', JSON.stringify(db));
  //       const timestamp = parseInt((date.getTime() / 1000).toFixed(0), 10);
  //       const insertQuery = `INSERT INTO transactions(transactionDate, summary, transactionType, amount) VALUES("${timestamp}", "${summary}", "${transactionType}", "${amount}")`;
  //       db.executeSql(insertQuery);
  //       console.log(`Date: ${date}`);
  //       console.log(`Type: ${JSON.stringify(transactionType)}`);
  //       console.log(`Summary: ${summary}`);
  //       console.log(`Amt: ${amount}`);
  //       console.log('db amt ', db.amount);
  //       console.log('db bio ', db.summary);
  //       console.log('db type ', db.transactionType);
  //       setTransactionType('');
  //       setSummary('');
  //       setAmount('');
  //       navigation.navigate('Notification');
  //     }
  //   };

  const {colors, fonts} = theme;
  const canCreate = amount > 0 && transactionType !== null;

  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
      }}
      resizeMode={'cover'}
      style={{
        flex: 1,
      }}>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.content}>
        <FieldContainer>
          <View style={styles.selectDate}>
            <Pressable onPress={showDatePicker}>
              <Text style={{color: '#fff', fontSize: 21, fontWeight: 'bold'}}>
                {transactionDate.toDateString().slice(4)}
              </Text>
            </Pressable>
          </View>
          {dateShow && (
            <DateTimePicker
              value={transactionDate}
              mode={dateMode}
              is24Hour={true}
              //  display="compact"
              onChange={onDateChange}
            />
          )}
        </FieldContainer>

        <View style={{padding: 8, marginTop: '10%'}}>
          <FieldContainer>
            {/* <Text style={{fontSize: 21, color: '#fff'}}>Type</Text> */}
            {/* <DropDown
              mode={'flat'}
              label={'Category'}
              // mode={'outlined'}
              value={transactionType}
              setValue={setTransactionType}
              list={transactionTypes}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              inputProps={{
                right: <TextInput.Icon name={'menu-down'} />,
                theme: {roundness: 0},
                style: styles.dropdown,
              }}
            /> */}
            <CustomDropDown
              label={!selected ? 'Select category' : selected.label}
              data={transactionTypes}
              onSelect={setTransactionType}
            />
          </FieldContainer>

          <FieldContainer>
            {/* <Text style={{fontSize: 21, color: '#fff'}}>Summary</Text> */}
            <TextInput
              mode="flat"
              underlineColor={colors.gray}
              theme={{roundness: 0}}
              style={styles.input}
              onChangeText={text => setSummary(text)}
              value={summary}
              placeholder="Description"
            />
          </FieldContainer>
          <FieldContainer>
            {/* <Text style={{fontSize: 21, color: '#fff'}}>Amount</Text> */}
            <TextInput
              mode="flat"
              underlineColor={colors.gray}
              theme={{roundness: 0}}
              style={styles.input}
              onChangeText={text => setAmount(text)}
              value={amount}
              placeholder="Amount"
              keyboardType="number-pad"
            />
          </FieldContainer>
          <FieldContainer>
            <Text
              onPress={createTransactionAction}
              style={!canCreate ? styles.disabledCreate : styles.enabledCreate}>
              {createTransactionText}
            </Text>
          </FieldContainer>
        </View>
      </View>

      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

export default withTheme(CreateEntryScreen);
