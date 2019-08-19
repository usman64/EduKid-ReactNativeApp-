import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import styles from './styles'


export const CountDown = props => (
    <View style={styles.container}>
    <Text style={[styles.welcome, {fontSize: 30, letterSpacing: 1}]}>Game Begins in</Text>
        <View style={{height:10}}/>
        {/* <Text style={{fontSize: 20}}>Question</Text> */}
        <View style={{height:30}}/>
     
        <View>
             <Text style={mystyle.countdown}>{props.count}</Text>
        </View>
    </View>
)

const mystyle = StyleSheet.create({
    countdown: {
        textAlign: 'center', 
        fontSize: 150, 
        color: 'red'
    }
})