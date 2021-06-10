import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput } from 'react-native'
import {Button} from 'react-native-paper'
import { connect } from 'react-redux'

import {store} from '../Redux/store'
 class Login extends Component {
    state={
        email:"",
        password:""
    } 
    componentDidMount(){
    console.log(this.props.users)
    }
    logIn=async()=>
    {
      
      let temp=0;
     this.props.users.forEach((item)=>{
      if(item.email==this.state.email && item.password==this.state.password){
         temp=1;
         return
      }
     })
     if(temp==1)
     {
      await this.props.isLoad()
       this.props.navigation.navigate("Home")
       return ;
     }
     else
     {
       alert("Invalid email or password")
       return 
     }
    }
    render() {
        return (
        <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button  mode="contained" style={{backgroundColor:'pink'}}  onPress={()=>{this.logIn()}} >
        Login
        </Button>
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
        </View>  
        )
    }
}
const mapStateToprops=(state)=>{
return {
  users:state.users
}
}
const mapDispatchToProps=(dispatch)=>{
return {
    isLoad:()=>{
        dispatch({
            type:"isLoaded",
            payload:{}
        })
    }
}
}
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
export default connect(mapStateToprops,mapDispatchToProps)(Login)