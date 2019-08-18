import React, { Component } from 'react'
import {Alert, Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'
import { Login, ForgotPassword } from '../Server/firebaseFunc'
import Prompt from 'react-native-prompt-crossplatform';

const Status = props => {
   if(props.signup) {
       return (
            <View style={{paddingTop: 10}}>
                <Text style={{color: 'green'}}>Sign Up Successful</Text>
            </View>
       )
   }

   else if(props.logout) {
       return (
            <View style={{paddingTop: 10}}>
                <Text style={{color: 'green'}}>Logout Successful</Text>
            </View> 
       )
   }

   else {
       return (
           <View></View>
       )
   } 
   
}


export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            prompt: false,
            promptVal: '',
        }

    }

    change = text => {
        this.setState({ promptVal: text });
    }

    cancel = () => {
        this.setState({
                promptVal: '',
                prompt: false,
            });
    }

    submit = () => {
        this.setState({
            prompt: false,
        })
        this.forgetPassword(this.state.promptVal)
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
              Alert.alert('Invalid Login! Please Try Again.')  
            }
        }

        catch(err) {
            Alert.alert('Invalid Login! Please Try Again.')  
        }
    } 

    forgetPassword = async(email) => {
        try {
            const decision = await ForgotPassword(email)
            console.log(decision)
            if(decision) {
                Alert.alert('Please Check Email!')
            }

            else {
                Alert.alert('This email does not exist in our records')
            }
        }

        catch(err) {
            Alert.alert('This email does not exist in our records')
        }
    }

   
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <Prompt
                    title="Enter your email"
                    inputPlaceholder='email'
                    isVisible={this.state.prompt}
                    primaryColor= 'green'
                    onChangeText={(text) => {
                        this.change(text)
                    }}
                    onCancel={() => {
                        this.cancel()
                    }}
                    onSubmit={() => {
                        this.submit()
                    }}
                    onBackButtonPress = {() => {
                        this.setState({prompt:false})
                    }}
                />

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
            
                <TouchableOpacity onPress = {() => {
                    this.setState({prompt: true})
                }}>
                    <View style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </View>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={()=> this.loginUser()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </View>
                </TouchableOpacity>

                <Status signup={this.props.navigation.getParam('signup')}
                        logout={this.props.navigation.getParam('logout')} />    

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