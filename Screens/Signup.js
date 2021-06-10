import React, { Component } from 'react'
import { Text, View ,TextInput,StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import {connect} from 'react-redux'
 class Signup extends Component {
    state={
        email:"",
        password:""
    } 
    signup=async()=>
    {
     if(this.state.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
     {
       if(this.state.password.length<5)
       {
         alert("Password too Short")
         return
       }
       await this.props.addUse(this.state.email,this.state.password)
       await this.props.isLoad()
        this.props.navigation.navigate("Home")
     }
     else{
         alert("Entered email address is wrong")
         return 
     }
    }
    render() {
        return (
        
        <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email:text })}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(text)=>{this.setState({password:text})}}
        />
        <Button mode="contained" style={{backgroundColor:'pink'}}   onPress={()=>{this.signup()}}>
          Sign Up
        </Button>
        <View>
        <Text> Already have an account?
         <Text onPress={() => {this.props.navigation.navigate("Login")}} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
       </View>
    
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
return {
    addUse:(email,password)=>{
       dispatch({
          type:"addUser",
          payload:{
              email:email,
              password:password
          } 
       })
    },
    isLoad:()=>{
        dispatch({
            type:"isLoaded",
            payload:{}
        })
    }
}
}
export default connect(null,mapDispatchToProps)(Signup)
const styles=StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#e0ffff'
  },
  textInput: {
    height: 40,
    fontSize:20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15
  }
})
