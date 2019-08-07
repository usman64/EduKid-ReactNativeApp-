import React, { Component } from 'react'
import { Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity} from 'react-native';
import { YellowBox } from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'

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

    signupUser = async(navigation) => {
        console.log(this.state.name)
        console.log(this.state.email)
        console.log(this.state.password)
        try{
            const response= await Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            if(response) {
                Firebase.database().ref('users/' + response.user.uid).set({
                    email:this.state.email,
                    name:this.state.name
                })
            }

            navigation.navigate('Login')
        }
        
        catch(err) {
            console.log(err)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        
                <Text style={styles.welcome}>HELLO NEW USER</Text>
                <View style={{height:30}}/>

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
                    onPress={()=> this.signupUser(this.props.navigation)}    
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }
}
