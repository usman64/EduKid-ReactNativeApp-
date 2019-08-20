import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
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
                    <View style={[styles.button, {flexDirection: 'row'}]}>
                        <Text style={styles.buttonText}>Country Capitals</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.goToGame('homo')}>
                    <View style={[styles.button, {flexDirection: 'row'}]}>
                        <Text style={styles.buttonText}>Homophones</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.goToGame('math')}>
                    <View style={[styles.button, {flexDirection: 'row'}]}>
                        <Text style={styles.buttonText}>Equations</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.goToGame('color')}>
                    <View style={[styles.button, {flexDirection: 'row'}]}>
                        <Text style={styles.buttonText}>Color Match</Text>
                    </View>
                </TouchableOpacity>
               
                <View style={{paddingTop: 30, paddingRight: 170}}>
                    <Text style={{fontSize: 15, color: 'grey', textAlign: 'left'}}>
                        <Text style={{textDecorationLine: 'underline'}}>Rules: {'\n'}</Text>
                        <Text>Correct Answer: <Text style={{color: 'green'}}>1</Text>{'\n'}</Text>
                        <Text>Wrong Answer: <Text style={{color: 'red'}}>-1</Text></Text>
                    </Text>    
                </View>


            </View>
        )
    }
}

export default P1GameChoosingScreen
