import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


const TrendComponent = ({xCoefficients}) => {

    


    var data = []

    for(var i = 0; i < xCoefficients.length; i++){

        data.push((xCoefficients[0]) + (xCoefficients[1] * (i)) + (xCoefficients[2] * (i ^ 2)) + (xCoefficients[3] * (i ^ 3)) + (xCoefficients[4] * (i ^ 4)) + (xCoefficients[5] * (i ^ 5)));

        console.log(data)
    }

    return (
        <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(255, 165, 0, 0.5)' }}
            >
                <Grid />
        </AreaChart>

    );
};

const styles = StyleSheet.create({
  },);

export default TrendComponent;
