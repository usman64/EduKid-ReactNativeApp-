import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles'

export class GameInstructionScreen extends Component {
    name = this.props.navigation.getParam('name').split(" ")[0]
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.welcome, {letterSpacing: 2}]}>
                    Please Read the Instructions before Starting
                </Text>

                <View style={{paddingTop: 30}}>
                    <Text>Dear <Text style={{color: green}}>{this.name}</Text>, welcome to Edukid, a place to learn,
                    a place for fun.{'\n'} There are two modes of game you can play, Single Player and Multiplayer.
                    </Text>

                    <Text style={{paddingTop: 20, fontSize: 40, color: 'red'}}>BAAKI USMAN LIKHEGA</Text>
                </View>
            </View>
        )
    }
}

export default GameInstructionScreen
