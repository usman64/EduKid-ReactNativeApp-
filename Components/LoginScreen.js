import React, { Component } from 'react'
import {Alert, Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'
import { Login } from '../Server/firebaseFunc'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

    }

    loginUser = async() => {

        const { navigation } = this.props 
        const { email, password } = this.state

        try {
            const user = await Login(email, password)
            if(user) {
                navigation.navigate('Home', {user: user})
            }

            else {
              Alert.alert('Invalid Login')  
            }
        }

        catch(err) {
            Alert.alert('Invalid Login')
        }
    } 
   
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        
                <Text style={styles.welcome}>WELCOME</Text>
                <View style={{height:30}}/>

                <View style={styles.emailContainer}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={email=> {
                            this.setState({email})
                        }}/>

                </View>

                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={password=> {
                            this.setState({password})
                        }}
                    />
                </View>
            
                <TouchableOpacity>
                    <View style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </View>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={()=> this.loginUser()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </View>
                </TouchableOpacity>

                <View style={{paddingTop: 100}}>
                    <View style={styles.normalContainer}>
                        <Text style={styles.normalText}>Do not have account?</Text>
                    </View>
                    <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Signup')
                    }}>
                        <View style={styles.createAccount}>
                            <Text style={styles.createText}>Create new account</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

        ) 
    }
}    