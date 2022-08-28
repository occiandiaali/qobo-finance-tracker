import React from 'react';
import {Text, View} from 'react-native';
//import {PieChart} from 'react-native-gifted-charts';

const PieChartComponent = () => {
  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{color: 'white'}}>Excellent: 47%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#8F80F3')}
            <Text style={{color: 'white'}}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{color: 'white'}}>Good: 40%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: 'white'}}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        paddingVertical: 100,
        backgroundColor: '#34448B',
        flex: 1,
      }}>
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#232B5D',
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Performance
        </Text>
        <View style={{padding: 20, alignItems: 'center'}}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    47%
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default PieChartComponent;

// import React, {useCallback, useState, useEffect} from 'react';
// import {
//   Dimensions,
//   View,
//   StyleSheet,
//   Text,
//   ImageBackground,
// } from 'react-native';
// import {PieChart} from 'react-native-gifted-charts';
// import {withTheme} from 'react-native-paper';

// import {
//   getDBConnection,
//   createTransactionsTable,
//   getExpenseGroupedByMonth,
//   getIncomeGroupedByMonth,
//   getSavingsGroupedByMonth,
//   getInvestmentsGroupedByMonth,
// } from '../../data/db-service';

// const styles = StyleSheet.create({
//   dotsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: 120,
//     marginRight: 20,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   pieContainer: {
//     paddingVertical: 100,
//     backgroundColor: '#34448B',
//     flex: 1,
//   },
//   pieContainerLabel: {
//     margin: 20,
//     padding: 16,
//     borderRadius: 20,
//     backgroundColor: '#232B5D',
//   },
// });
// const screenWidth = Dimensions.get('window').width;

// const PieChartComponent = ({theme}) => {
//   const [monthlyIncome, setMonthlyIncome] = useState([]);
//   const [monthlyExpense, setMonthlyExpense] = useState([]);
//   const [monthlySavings, setMonthlySavings] = useState([]);
//   const [monthlyInvestments, setMonthlyInvestments] = useState([]);

//   const loadDataCallback = useCallback(async () => {
//     try {
//       const db = await getDBConnection();
//       await createTransactionsTable(db);
//       // const groupedByTransactionTypes =
//       //   await getTransactionsGroupedByTransactionType(db);
//       // if (groupedByTransactionTypes.length) {
//       //   setByTransactionTypes(groupedByTransactionTypes);
//       // }

//       const incomeMonth = await getIncomeGroupedByMonth(db);
//       if (incomeMonth) {
//         setMonthlyIncome(incomeMonth);
//       }

//       const expenseMonth = await getExpenseGroupedByMonth(db);
//       if (expenseMonth) {
//         setMonthlyExpense(expenseMonth);
//       }

//       const savingsMonth = await getSavingsGroupedByMonth(db);
//       if (savingsMonth) {
//         setMonthlySavings(savingsMonth);
//       }

//       const investmentMonth = await getInvestmentsGroupedByMonth(db);
//       if (investmentMonth) {
//         setMonthlyInvestments(investmentMonth);
//       }
//     } catch (error) {
//       console.error('transaction list err: ', error);
//     }
//   }, []);

//   useEffect(() => {
//     loadDataCallback();
//   }, [loadDataCallback]);

//   const hasMonthlyExpenses = monthlyExpense.length > 0;
//   const hasMonthlyIncome = monthlyIncome.length > 0;
//   const hasMonthlySavings = monthlySavings.length > 0;
//   const hasMonthlyInvestments = monthlyInvestments.length > 0;

//   const currentMonthData =
//     hasMonthlyExpenses ||
//     hasMonthlyIncome ||
//     hasMonthlySavings ||
//     hasMonthlyInvestments;

//   const [thisMonth, setThisMonth] = useState(1);
//   const [hasCurrentMonthData, setHasCurrentMonthData] =
//     useState(currentMonthData);
//   const [pieData, setPieData] = useState([]);
//   const [currentMonthColours, setCurrentMonthColours] = useState([]);

//   useEffect(() => {
//     const allData = [
//       ...monthlyExpense,
//       ...monthlyIncome,
//       ...monthlyInvestments,
//       ...monthlySavings,
//     ];
//     const monthNames = new Map([
//       [1, 'January'],
//       [2, 'February'],
//       [3, 'March'],
//       [4, 'April'],
//       [5, 'May'],
//       [6, 'June'],
//       [7, 'July'],
//       [8, 'August'],
//       [9, 'September'],
//       [10, 'October'],
//       [11, 'November'],
//       [12, 'December'],
//     ]);

//     const d = new Date();
//     const month = d.getMonth();
//     //const month = d.getMonth() < 10 ? String(d.getMonth()).padStart();
//     const year = d.getFullYear();
//     const d1 = month < 10 ? `0${month + 1}-${year}` : `${month + 1}-${year}`;

//     const monthsArray = monthlyExpense.map(m => m.label);
//     const allMonthsArray = allData.map(data => data.label);
//     const allMonthsArrayValues = allData.map(data => data.value);

//     setHasCurrentMonthData(allMonthsArray.includes(d1));
//     console.log('d1: ', d1);
//     console.log('split-d1 ', d1.split('-')[0]);
//     console.log('typeof split-d1 ', typeof d1.split('-')[0]);
//     console.log('split-d1 num ', parseInt(d1.split('-')[0], 10));
//     console.log('typeof split-d1 ', typeof parseInt(d1.split('-')[0], 10));
//     console.log('Includes?: ', allMonthsArray.includes(d1));
//     setThisMonth(monthNames.get(parseInt(d1.split('-')[0], 10)));
//     // console.log('Get Month ', monthNames.get(8));
//     console.log('Month: ', monthsArray);
//     console.log('All Data: ', allData);
//     const chosen = allData.filter(v => v.label === d1);
//     setCurrentMonthColours(chosen.map(({color}) => color));
//     setPieData(chosen);
//     console.log('All Chosen Values: ', chosen);
//   }, [monthlyExpense, monthlyIncome, monthlyInvestments, monthlySavings]);

//   const renderDot = colour =>
//     pieData.forEach(d => (
//       <View
//         style={{
//           height: 10,
//           width: 10,
//           borderRadius: 5,
//           backgroundColor: colour[d],
//           marginRight: 10,
//         }}
//       />
//     ));

//   const renderLegendComponent = () => {
//     {
//       hasCurrentMonthData && (
//         <View style={styles.legendContainer}>
//           <View style={styles.dotsContainer}>
//             {renderDot(currentMonthColours)}
//             {pieData.map(({name, value}) => (
//               <Text style={{color: '#fff'}}>
//                 `${name}: ${value}`
//               </Text>
//             ))}
//           </View>
//         </View>
//       );
//     }
//   };

//   return (
//     <ImageBackground
//       resizeMode="cover"
//       style={{flex: 1}}
//       // style={{height: '100%'}}
//       source={{
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGH6pNUqtl6T7TvQGZPgVAZEJtuOxoGcj3A&usqp=CAU',
//       }}>
//       <View style={styles.pieContainer}>
//         <View style={styles.pieContainerLabel}>
//           <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
//             {hasCurrentMonthData
//               ? `${thisMonth} overview`
//               : `No data for ${thisMonth}`}
//           </Text>
//         </View>
//         <View style={{padding: 20, alignItems: 'center'}}>
//           <PieChart
//             data={pieData}
//             donut
//             showGradient
//             sectionAutoFocus
//             radius={90}
//             innerRadius={60}
//             innerCircleColor={'#232B5D'}
//             centerLabelComponent={() => {
//               return (
//                 <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                   <Text
//                     style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
//                     47%
//                   </Text>
//                   <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
//                 </View>
//               );
//             }}
//           />
//         </View>
//         {renderLegendComponent()}
//       </View>
//     </ImageBackground>
//   );
// };

// export default withTheme(PieChartComponent);
