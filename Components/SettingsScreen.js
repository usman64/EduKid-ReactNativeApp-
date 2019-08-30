import React, { Component } from 'react'
import { StyleSheet, Button ,ScrollView, Text, View, TextInput, TouchableOpacity, Image, Alert, BackHandler} from 'react-native';
import styles from './styles'
import { Logout } from '../Server/firebaseFunc'
import { Icon } from 'react-native-elements'
import MultipleChoice from 'rn-multiple-choice'
// import SelectMultiple from 'react-native-select-multiple'
import Dialog, {ScaleAnimation ,DialogContent,DialogButton,DialogFooter } from 'react-native-popup-dialog';
import {mybackhandler,changeCurrScreen, currScreen} from './backhandler'


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
    game_ColorMatch: true,
    game_Math: true,
    game_Homophones: true,
    game_Capitals: true,
    gameArray: ['Country Capitals','Homophones','Equations','Color Match']
};

export class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = state;
        
    }

    componentDidMount(){
        changeCurrScreen('Setting')
        console.log("Settings mounted")
        // if(mybackhandler.curr)
        // {
        //     this.prevbh = mybackhandler.curr
        //     mybackhandler.curr.remove()
        // }
        // mybackhandler.curr = BackHandler.addEventListener('hardwareBackPress',() => this.setState({showGameSelection:false}))
        // setmyBackHandler(BackHandler.addEventListener('hardwareBackPress',() => this.setState({showGameSelection:false})))
        this.backhandler = BackHandler.addEventListener('hardwareBackPress',() => this.setState({showGameSelection:false}))
    }

    componentWillUnmount() {
        console.log("Settings unmounted")
        // this.backhandler.remove()
        // setTimeout(() =>{
        changeCurrScreen('Home')
    // },1000)
        // if(mybackhandler.curr)
        // {  
        //     mybackhandler.curr.remove()
        //     mybackhandler.curr = this.prevbh
        // }
        // setmyBackHandler(this.prevBackhandler)
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

    gameSelection = (option) => {
        let Allgames = ['Country Capitals','Homophones','Equations','Color Match']
        
            switch(option){
                case 'Country Capitals':
                    this.setState(prevState => ({game_Capitals:!prevState.game_Capitals}))
                    break
                case 'Homophones':
                    this.setState(prevState => ({game_Homophones:!prevState.game_Homophones}))
                    break
                case 'Equations':

                    this.setState(prevState => ({game_Math:!prevState.game_Math}))
                    break
                case 'Color Match':

                    this.setState(prevState => ({game_ColorMatch:!prevState.game_ColorMatch}))
                    break
                default:
                    throw new Error(option)
            }

            if(!this.state.gameArray.includes(option)){
            console.log('remove',this.state.gameArray)
            this.setState(prevState=>({gameArray:prevState.gameArray.filter(game => game !== option)}))
        }else{
            this.setState(prevState=>({gameArray:[...prevState.gameArray]}))
        }
    }

    render() {


        return (
            <ScrollView>

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

                <TouchableOpacity onPress={()=> this.setState({showGameSelection:true})}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Game Selection (Multiplayer)</Text>
                    </View>
                </TouchableOpacity>

                <Dialog
                    visible={this.state.showGameSelection}
                    onTouchOutside={() => {
                        this.setState({ showGameSelection: false });
                      }}
                    dialogAnimation={new ScaleAnimation({
                        initialValue: 0, // optional
                        useNativeDriver: true, // optional
                      })}
                      footer={
                        <DialogFooter>
                          <DialogButton
                            text="OK"
                            onPress={() => {
                                let {navigation} = this.props
                                this.setState({ showGameSelection:false},() =>
                                navigation.navigate('Home',{
                                    game_ColorMatch: this.state.game_ColorMatch,
                                    game_Math: this.state.game_Math,
                                    game_Homophones: this.state.game_Homophones,
                                    game_Capitals: this.state.game_Capitals,
                                }))}}
                                

                                // this.setState({ showGameSelection:false},() =>
                            //     this.props.navigation.navigate('Home',{
                            //     game_ColorMatch: this.state.game_ColorMatch,
                            //     game_Math: this.state.game_Math,
                            //     game_Homophones: this.state.game_Homophones,
                            //     game_Capitals: this.state.game_Capitals,
                            // })}}
                          />
                        </DialogFooter>
                      }
                >
                    <DialogContent style={{height:180}}>
                   <View style={{padding:15}}>
                    <MultipleChoice
                        style={{width:260, height:350}}
                        options={[
                        'Country Capitals',
                        'Homophones',
                        'Equations',
                        'Color Match'
                        ]}
                        selectedOptions={this.state.gameArray}
                        maxSelectedOptions={4}
                        onSelection={(option)=> this.gameSelection(option)}
                    />
                    </View>  
                    </DialogContent>
                
                </Dialog>

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
            </ScrollView>
        )
    }
}

export default SettingsScreen
