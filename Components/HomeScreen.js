import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableHighlight} from 'react-native';
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
        Firebase.database().ref('/users/' + this.props.navigation.getParam('userid')).on('value',snapshot => {
            const object = snapshot.val()
            this.setState({name: object.name})
        }) 
    }


    render() {
        return (
            <View style = {styles.container}>
                <Text style={styles.welcome}>{`Hi ${this.state.name}`}</Text>
                <View style={{height:30}}/>
            </View>
        )
    }
}


