import React, { Component } from 'react'
import {withNavigationFocus} from 'react-navigation'
import { StyleSheet,UIManager, findNodeHandle, Button , Text, View, TextInput,BackHandler, TouchableOpacity,Alert, Image,Picker } from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase' 
import { Logout } from '../Server/firebaseFunc' 
import { YellowBox } from 'react-native'; 
import { Icon } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import {mybackhandler, setmyBackHandler,removemyBackHandler, changeCurrScreen,currScreen} from './backhandler'

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



class HomeScreen extends Component {
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
            name:'',
            myScreen: currScreen,
        }

        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit',
            'Do you want to logout?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => {
                    console.log('shit')
                    Logout().then(()=> {
                        this.props.navigation.navigate('Login', {logout: true});
                        // return true
                    })
                }
            }, ], {
                cancelable: false
            }
        )

        return true;
    }

    componentWillMount() {
        this.readFromDb();
        // if(this.props.navigation.isFocused())
        // {
        //     this.backhandler=BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // }
        console.log("Home mounted")
        changeCurrScreen('Home')
        // if(mybackhandler.curr)
        // {
           
        // }
        // this.backhandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // setmyBackHandler(BackHandler.addEventListener('hardwareBackPress', this.handleBackButton))
    }

    componentWillUnmount() {
        console.log("Home unmounted")
        changeCurrScreen('Login')
        // if(!this.props.navigation.isFocused())
        // {
        //     this.backhandler.remove()
        // }
        // if(mybackhandler.curr)
        // {   
            // mybackhandler.prev = mybackhandler.curr
            // mybackhandler.curr = null

            // mybackhandler.remove()
            // removemyBackHandler(mybackhandler)
        // }
        if(this.backhandler)
        {

            this.backhandler.remove()
        }
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
       if(currScreen === 'Home' && this.props.isFocused)
       {
           console.log("hi")
           if(this.backhandler)
           {
               console.log("hi3")
               this.backhandler.remove()
           }
            this.backhandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
       }
       else
       {
           console.log("hi2")
           if(this.backhandler)
           {
               this.backhandler.remove()
           }
       }
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

export default withNavigationFocus(HomeScreen)

const mystyles = new StyleSheet.create({
    thecontainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex:1,
        paddingTop: 10,
    } 
})

