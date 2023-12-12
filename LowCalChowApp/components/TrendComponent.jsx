import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


const TrendComponent = ({trendObject}) => {

    var data = []

    for(var i = 0; i < 5; i++){

        data.push((trendObject.coeff0) + (trendObject.coeff1 * (i)) + (trendObject.coeff2 * (i ^ 2)) + (trendObject.coeff3 * (i ^ 3)) + (trendObject.coeff4 * (i ^ 4)) + (trendObject.coeff5 * (i ^ 5)));

        console.log(data)
    }

    //xMax = xMax timestamp (in Unix time) - xMin timestamp (in Unix time)
    //parsing to Date objects
    var x_min = Date.parse(trendObject.x_min)
    var x_max = Date.parse(trendObject.x_max)

    console.log(x_min + " ," + x_max);

    //convert to Unix time
    x_min = Math.floor(x_min / 1000);
    x_max = Math.floor(x_max / 1000);

    x_max = x_max - x_min;

    return (

        <View>

            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(255, 165, 0, 0.5)' }}
                xMin = {0}
                xMax = {x_max}
            >
                <Grid />
            </AreaChart>

            <Text>{trendObject.trend_type}</Text>

        </View>

        

    );
};

const styles = StyleSheet.create({
  },);

export default TrendComponent;
