import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation'
import LoginScreen from './Components/LoginScreen'
import SignUpScreen from './Components/SignUpScreen'
import HomeScreen from './Components/HomeScreen'
import StartScreen from './Components/StartScreen'

const MainNav = createStackNavigator({
  Start: {
    screen: StartScreen,
    navigationOptions: {
      title: null,
    }
  },

  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
    },
  },

  Signup: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Signup',
    },
  },

  Home: {
    screen: HomeScreen,
    navigationOptions : {
      title: 'Home',
    }
  }
},
{
  initialRouteName: 'Start'
})

const AppContainer = createAppContainer(MainNav)

export default class App extends Component {
  render() {
    return (
        <AppContainer />
    );
  }
}
