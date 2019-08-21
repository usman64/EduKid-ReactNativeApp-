import React, { Component } from 'react'
import { Button, KeyboardAvoidingView , Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles'
import * as Facebook from 'expo-facebook'
import Expo from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from '../Server/firebase'
import firebase from 'firebase'

const SocialMediaIcons = props => (
    <View style={{paddingTop: 30}}>  
        <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={()=> {props.login()}}
        >
            Login with Facebook
        </Icon.Button> 

    </View>
)

export class StartScreen extends Component {
    static navigationOptions = {
        header: null
    }

    checkIfLoggedIn = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.navigation.navigate('Home',{user:user})
            }
        })
    }

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    loginWithFacebook = async() => {
        const { navigation } = this.props 
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '435112820428310',
            { permissions: ['public_profile']}
        );

        console.log(type, token)
        
        if(type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            Firebase.auth().signInWithCredential(credential)
            .then(res=> {
                Firebase.database().ref('users/' + res.user.uid).set({
                    name:res.user.displayName
                })
                navigation.navigate('Home', {user:res.user})
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }
    
    render() {
        return (
            <View style={[styles.container, {paddingTop: 80}]}>
                <Image 
                    style={{height: 200, width: 200}}
                    source={require('../assets/images.png')}
                />
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

                <SocialMediaIcons login={this.loginWithFacebook}/>
            </View>
        )
    }
}

export default StartScreen