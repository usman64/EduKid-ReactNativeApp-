import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'  
import { YellowBox } from 'react-native'; 

export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state={
            name:''
        }

        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    componentDidMount() {
        this.readFromDb();
    }

    readFromDb = () => {
        Firebase.database().ref('/users/' + this.props.navigation.getParam('user').uid).on('value',snapshot => {
            const object = snapshot.val()
            this.setState({name: object.name})
        }) 
    }


    render() {
        let thename =  
            <Text style={styles.welcome}>
                Hi <Text color: 'green'>{this.state.name}</Text>
            </Text>
        return (
            <View style = {styles.container}>
                <View>thename</View>
                <View style={{height:30}}/>

                <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Player1', {user: this.props.navigation.getParam('user'), name: this.state.name})
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>PLAYER 1</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{

                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>PLAYER 2</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


