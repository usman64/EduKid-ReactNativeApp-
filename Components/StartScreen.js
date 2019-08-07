import React, { Component } from 'react'
import { Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'

export class StartScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>WELCOME TO EDUKID</Text>
                <View style={{height:30}}/>

                <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Login')
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Signup')}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default StartScreen