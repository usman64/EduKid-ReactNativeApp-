import React, { Component } from 'react'
import {Alert, Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'
import firebase from 'firebase' 
import { Login, ChangePass } from '../Server/firebaseFunc'


export class ChangePasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cpass: '',
            npass1: '',
            npass2: '',
        }
    }

    changePassword = async() => {
        const { cpass, npass1, npass2 } = this.state
        const user = Firebase.auth().currentUser

        const credential = firebase.auth.EmailAuthProvider.credential(user.email, cpass);
        console.log(credential)

        try {
            await user.reauthenticateWithCredential(credential)
        }

        catch(err) {
            console.log(err)
            Alert.alert('Current Password is Wrong')
            return
        }
        
        if(npass1 !== npass2) {
            Alert.alert('Passwords does not match')
        }

        else {
            try {
                await ChangePass(npass1)
                console.log('Password Changed Successfully')
                this.props.navigation.navigate('Home', {success: true})
                
            }

            catch(err) {
                console.log(err)
            }
        }


        
        
    }

     render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        
                <Text style={styles.welcome}>CHANGE PASSWORD</Text>
                <View style={{height:30}}/>

                <View style={styles.passwordContainer}>
                    <TextInput style={styles.textInput} 
                        placeholder="Current Password"
                        onChangeText={cpass => this.setState({cpass})}
                        secureTextEntry={true}
                    />     
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput style={styles.textInput} 
                        placeholder="New Password"
                        onChangeText={npass1=> this.setState({npass1})}
                        secureTextEntry={true}
                    />

                </View>

                <View style={styles.passwordContainer}>
                    <TextInput style={styles.textInput} 
                        placeholder="Re-type Password"
                        onChangeText={npass2=> this.setState({npass2})}
                        secureTextEntry={true}
                    />    
                </View>
        
                <TouchableOpacity style={{paddingTop: 30}} 
                    onPress={()=> this.changePassword()}    
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </View>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }
}

export default ChangePasswordScreen
