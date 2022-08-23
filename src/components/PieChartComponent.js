import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {PieChart} from 'react-native-chart-kit';
import Legend from './Legend';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  // strokeWidth: 2,
  // barPercentage: 0.5,
  // useShadowColorFromDataset: false,
};

const PieChartComponent = ({title, data}) => {
  return (
    <View style={styles.chartContainer}>
      {data.length > 0 ? (
        <>
          <PieChart
            data={data}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            backgroundColor={'transparent'}
            center={[0, 0]}
          />
          <View style={styles.legendContainer}>
            {data.map(({name, color}) => {
              return <Legend key={name} name={name} color={color} />;
            })}
          </View>
        </>
      ) : (
        <PieChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          backgroundColor={'#ccccff'}
          center={[0, 0]}
          hasLegend={false}
        />
      )}
    </View>
  );
};

export default PieChartComponent;

const styles = StyleSheet.create({
  chartContainer: {
    // flex: 0.7,
    // flexDirection: 'row',
  },
  legendContainer: {
    // flex: 1,
    // marginTop: 20,
  },
});
