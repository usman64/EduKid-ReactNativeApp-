import React, { Component } from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex:1,
        paddingTop:100
    },


    text: {
        backgroundColor: '#fff',
        width: 200,
        height: 40,
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingRight: 10,
    },

    loginbutton : {
        backgroundColor: '#fff',
        color: '#3e3f8f',
        fontSize: 16,
        padding: 5,
        width: 110,
        height: 35,
        textAlign: 'center',
    },

    emailContainer: {
        width:325,
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height:50,
        padding:10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        // borderBottomWidth:0,
        backgroundColor:'#F5F6F7'
      },
      passwordContainer: {
        width:325,
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height:50,
        padding:10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        backgroundColor:'#F5F6F7'
        
      },
      forgotPassword: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height:30,
        alignItems: 'flex-end',
      },

      forgotText: {
        color:'#5B5A5A',
        fontSize:12,
        alignItems: 'flex-end',
        textAlign:'right',
        width:330,
      },
      buttonText: {
        color:'white',
        fontSize:15
      },

      button: {
        width:325,
        borderColor: '#129793',
        borderWidth: 1,
        height:50,
        padding:10,
        borderRadius:24,
        marginTop:20,
        backgroundColor:'#129793',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#129793',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
      },

      welcome: {
        fontSize:25,
        color:'#5B5A5A',
        letterSpacing:6
      },

      createAccount: {
        height:30,
      },

      normalContainer: {
        height:20,
      },

      normalText: {
        color:'#5B5A5A',
        fontSize:12,
        alignItems: 'center',
        textAlign:'center',
        width:330,
      },
      
      createText: {
        color:'#FF7260',
        fontSize:12,
        alignItems: 'center',
        textAlign:'center',
        width:330,
      },

});

export default styles
