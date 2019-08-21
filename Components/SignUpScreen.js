import React, { Component } from 'react'
import { Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import { YellowBox } from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'
import { SignUp } from '../Server/firebaseFunc'

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: ''
        }

        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    signupUser = async() => {

        const { navigation } = this.props
        const { name, email, password } = this.state

        if(name.length <= 0) {
            Alert.alert('Error: Please enter your name for God sake')
            return;
        }

        else {
            try{

                const err = await SignUp(email, password, name)
                if(err) {
                    console.log(err)
                    Alert.alert(`Error: ${JSON.stringify(err.message)}`)
                }
                else {
                    navigation.navigate('Login', {signup: true})
                }
            }
            
            catch(err) {
                console.log(err)
                let errorMessage = err.Error
                Alert.alert(errorMessage)
            }

        } 

    }

    render() {
        return (
            <KeyboardAvoidingView style={[styles.container, {paddingTop: 30}]} behavior="padding" enabled>
        
                <Image 
                    style={{height: 180, width: 180}}
                    source={require('../assets/images.png')}
                />

                <View style={styles.emailContainer}>
                    <TextInput style={styles.textInput} placeholder="Full Name"
                        onChangeText={name=> this.setState({name})}/>
                </View>

                <View style={styles.emailContainer}>
                    <TextInput style={styles.textInput} placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={email=> this.setState({email})}
                        autoCapitalize="none"
                    />

                </View>

                <View style={styles.passwordContainer}>
                    <TextInput style={styles.textInput} placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={password=> this.setState({password})}/>
                </View>
        
                <TouchableOpacity style={{paddingTop: 30}} 
                    onPress={()=> this.signupUser()}    
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }
}
