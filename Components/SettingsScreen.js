import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles'
import { Logout } from '../Server/firebaseFunc'
import { Icon } from 'react-native-elements'

const GameDuration = props => (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> {
            props.changer(30);
            props.nav.navigate('Home', {time: 30, dura: true})
        }}>
            <View style={[styles.button,{width: 80, backgroundColor: props.c30 || 'grey',borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>30s</Text>
            </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={()=> {
                props.changer(60);
                props.nav.navigate('Home', {time: 60, dura: true})
         }}>
            <View style={[styles.button,{width: 80, backgroundColor: props.c60 || 'red', borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>60s</Text>
            </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={()=> {
            props.changer(90);
            props.nav.navigate('Home', {time: 90, dura: true})
         }}>
            <View style={[styles.button,{width: 80, backgroundColor: props.c90 || 'grey' ,borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>90s</Text>
            </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={()=> {
            props.changer(120);
            props.nav.navigate('Home', {time: 120, dura: true})
         }}>
            <View style={[styles.button,{width: 80, backgroundColor: props.c120 || 'grey',borderColor: 'grey'}]}>
                <Text style={styles.buttonText}>120s</Text>
            </View>
        </TouchableOpacity>
    </View>    
)

let state = {
    showDuration: false,
    color30: '',
    color60: '',
    color90: '',
    color120: '',

    showGameSelection: false,
    game_ColorMatch: false,
    game_Math: false,
    game_Homophones: false,
    game_Capitals: false,
};

export class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = state;
        
    }

    componentWillUnmount() {
        state = this.state;
    }

    changeOptions = time => {
        if(time === 30) {
            this.setState({color30:'red', color60: 'grey', color90:'grey', color120: 'grey'})
        }

        else if(time === 60) {
            this.setState({color30:'grey', color60: 'red', color90:'grey', color120: 'grey'})
        }

        else if(time === 90) {
            this.setState({color30:'grey', color60: 'grey', color90:'red', color120: 'grey'})
        }

        else if(time === 120) {
            this.setState({color30:'grey', color60: 'grey', color90:'grey', color120: 'red'})
        }

        this.setState(prevState => ({showDuration: prevState.showDuration ? false: true}))
    }

    render() {


        return (
            <View style = {styles.container}>
                <Icon
                 raised
                name='cog'
                type='font-awesome'
                size={45}
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
                    <GameDuration nav={this.props.navigation} 
                                  c30={this.state.color30}
                                  c60={this.state.color60}
                                  c90={this.state.color90}
                                  c120={this.state.color120}
                                  changer = {this.changeOptions}
                    /> : null

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
