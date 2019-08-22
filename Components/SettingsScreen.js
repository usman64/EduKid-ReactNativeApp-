import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles'
import { Logout } from '../Server/firebaseFunc'
import { Icon } from 'react-native-elements'

const GameDuration = props => (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> {
            props.nav.navigate('Home', {time: 30, dura: true})
        }}>
            <View style={[styles.button,{width: 80, backgroundColor: 'grey',borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>30 Sec</Text>
            </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={()=> {
              props.nav.navigate('Home', {time: 60, dura: true})
         }}>
            <View style={[styles.button,{width: 80, backgroundColor: 'grey',borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>60 Sec</Text>
            </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={()=> {
              props.nav.navigate('Home', {time: 90, dura: true})
         }}>
            <View style={[styles.button,{width: 80, backgroundColor: 'grey',borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>90 Sec</Text>
            </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={()=> {
              props.nav.navigate('Home', {time: 120, dura: true})
         }}>
            <View style={[styles.button,{width: 80, backgroundColor: 'grey',borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>120 Sec</Text>
            </View>
        </TouchableOpacity>
    </View>    
)

export class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDuration: false,
        }
        
    }

    render() {


        return (
            <View style = {styles.container}>
                <Icon
                //  raised
                name='cog'
                type='font-awesome'
                size={55}
                //  color='#129793'
                color='#ddd'
                />
                <Text style={styles.welcome}>SETTINGS</Text>
                <View style={{height:30}}/>

                <TouchableOpacity onPress={()=> {
                    this.setState(prevState => ({showDuration: prevState.showDuration ? false: true}))
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Game Duration</Text>
                    </View>
                </TouchableOpacity>

                {
                    this.state.showDuration ?
                    <GameDuration nav={this.props.navigation}/> : null

                }

                <TouchableOpacity onPress={()=> {
                    Alert.alert('Ye Usman Karega!')
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Game Selection (Multiplayer)</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {
                    this.props.navigation.navigate('ChangePass')
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {
                    Logout().then(()=> {
                        this.props.navigation.navigate('Login', {logout: true});
                    })   
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

export default SettingsScreen
