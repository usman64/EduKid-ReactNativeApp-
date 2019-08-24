import React, { Component } from 'react'
import { StyleSheet,UIManager, findNodeHandle, Button , Text, View, TextInput, TouchableOpacity,Alert, Image,Picker } from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'  
import { YellowBox } from 'react-native'; 
import { Icon } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'

const PassChange = props => {
    if(props.success) {
        return (
            <View style= {{paddingBottom: 10}}>
                <Text style={{color: 'green'}}>Password Changed Successfully</Text> 
            </View>
        )
    }

    else if(props.duration) {
        return (
            <View style= {{paddingBottom: 10}}>
                <Text style={{color: 'green'}}>Game Duration Changed Successfully</Text> 
            </View>
        )
    }

    else {
        return (
            <View>
            </View>
        ) 
    }
}




export default class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: (<TouchableOpacity
            onPress={() => navigation.navigate('Setting')}         
        >
            <View style={{padding: 10, paddingRight:20, paddingTop: 0}}>
                <Icon
                    // name='cog'
                    name='ellipsis-v'
                    type='font-awesome'
                    color='white'
                />
             </View>
           </TouchableOpacity>),
    })

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
        const theuser = this.props.navigation.getParam('user');
        const thename = theuser.displayName
        if(thename) {
            this.setState({name: thename})
        }

        else {
            Firebase.database().ref('/users/' + this.props.navigation.getParam('user').uid).on('value',snapshot => {
                const object = snapshot.val()
                this.setState({name: object.name})
            }) 
        }
    }


    render() {
        let thename =  
            <Text style={styles.welcome}>
                Hi <Text style={{color: 'green',alignSelf:'center'}}>{this.state.name}</Text>
            </Text>
        return (
            <View style = {[mystyles.thecontainer,{paddingTop: 0}]}>
                {/* <SettingButton nav = {this.props.navigation}/> */}
                

                <Image 
                    style={{height: 180, width: 180}}
                    source={require('../assets/images.png')}
                />
                
                <PassChange success = {this.props.navigation.getParam('success')}
                            duration = {this.props.navigation.getParam('dura')}/>
                <View style={{alignSelf:'center'}} >{thename}</View>
                <View style={{height:20}}/>
                <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Player1', {user: this.props.navigation.getParam('user'), 
                                                                   name: this.state.name,
                                                                   time: this.props.navigation.getParam('time')})
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Single Player</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Player2Game', { user: this.props.navigation.getParam('user'),
                                                                    name: this.state.name,
                                                                    time: this.props.navigation.getParam('time'),
                                                                    game_ColorMatch: this.props.navigation.getParam('game_ColorMatch'),
                                                                    game_Capitals: this.props.navigation.getParam('game_Capitals'),
                                                                    game_Homophones: this.props.navigation.getParam('game_Homophones'),
                                                                    game_Math: this.props.navigation.getParam('game_Math'),
                                                                })
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Multi-Player</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Instruction', {user: this.props.navigation.getParam('user'), name: this.state.name})
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Game Instructions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const mystyles = new StyleSheet.create({
    thecontainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex:1,
        paddingTop: 10,
    } 
})

