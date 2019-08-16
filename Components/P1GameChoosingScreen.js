import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'

export class P1GameChoosingScreen extends Component {

    goToGame=(game) => {
        let user = this.props.navigation.getParam('user')
        let name = this.props.navigation.getParam('name')
        this.props.navigation.navigate('Player1Game', {game: game, user: user, name: name})
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text style={styles.welcome}>CHOOSE A GAME</Text>
                <View style={{height:30}}/>

                <TouchableOpacity onPress={()=> this.goToGame('capital')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>COUNTRY CITY</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.goToGame('homo')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>HOMOPHONES</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.goToGame('math')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>GREATER LESSER</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.goToGame('color')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>COLOR MATCH</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.goToGame('game5')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>GAME 5</Text>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }
}

export default P1GameChoosingScreen
