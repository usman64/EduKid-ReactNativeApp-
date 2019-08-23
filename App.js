import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import LoginScreen from './Components/LoginScreen'
import SignUpScreen from './Components/SignUpScreen'
import HomeScreen from './Components/HomeScreen'
import StartScreen from './Components/StartScreen'
import P1GameChoosingScreen from './Components/P1GameChoosingScreen'
import P1GameScreen from './Components/P1GameScreen';
import P1TopScoreScreen from './Components/P1TopScoreScreen';
import ChangePasswordScreen from './Components/ChangePasswordScreen'
import MultiplayerGameScreen from './Components/MultiplayerGameScreen'
import SettingsScreen from './Components/SettingsScreen'
import GameInstructionScreen from './Components/GameInstructionScreen';
import P1GlobalScoreScreen from './Components/P1GlobalScoreScreen'

ScoreTabs = createMaterialTopTabNavigator({
  User: P1TopScoreScreen,
  Global: P1GlobalScoreScreen,
},
{
  initialRouteName: 'User', 
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: '#129793'
    }
  }
}
)

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
      headerStyle: {
        backgroundColor: '#129793',
      },
      headerTitleStyle: {
         color: 'white',
      },
      headerTintColor: 'white'
    },
  },

  Signup: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Signup',
    headerStyle: {
      backgroundColor: '#129793',
    },
    headerTitleStyle: {
       color: 'white',
    },
    headerTintColor: 'white'
  },

  },

  Home: {
    screen: HomeScreen,
    navigationOptions : {
      title: 'Home',
      headerLeft: null,

      headerStyle: {
        backgroundColor: '#129793',
      },
      headerTitleStyle: {
         color: 'white',
      },
    }
  },

  Setting: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      headerStyle: {
        backgroundColor: '#129793',
      },
      headerTitleStyle: {
         color: 'white',
      },
      headerTintColor: 'white'
    }
  },

  ChangePass : {
    screen: ChangePasswordScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#129793',
      },
      headerTitleStyle: {
         color: 'white',
      },
      headerTintColor: 'white'
    }
  },

  Player1: {
    screen: P1GameChoosingScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#129793',
      },
      headerTitleStyle: {
         color: 'white',
      },
      headerTintColor: 'white'
    }
  },

  Player1Game: {
    screen: P1GameScreen,
    
  },

  Player1Score: {
    screen: ScoreTabs,
    navigationOptions : {
        headerStyle: {
          backgroundColor: '#129793',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        headerLeft: null
      }

  },

  Player2Game: {
    screen: MultiplayerGameScreen,
  },

  Instruction: {
    screen: GameInstructionScreen,
    navigationOptions: {
      title: 'Game Instructions',
      headerStyle: {
        backgroundColor: '#129793',
      },
      headerTitleStyle: {
         color: 'white',
      },
      headerTintColor: 'white'
    }
  }
},

{
  // initialRouteName: 'Player2Game'
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
