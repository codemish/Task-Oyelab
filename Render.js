import React, { Component } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItem from './Screens/addItem'
import EditItem from './Screens/editItem'
import Signup from './Screens/Signup'
import Login from './Screens/Login'
import Home  from './Screens/Home'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import {store} from './Redux/store'
import { AntDesign } from '@expo/vector-icons';
const Stack= createStackNavigator();
const {width,height}=Dimensions.get('window')
 class Render extends Component {
        componentDidMount()
        {
          console.log(this.props.users)
        }
       render() {
        return (
           <NavigationContainer>
          
           <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"#66cdaa",height:height*0.09}}}>
           {
               !this.props.isLoade ?
               (
               <>
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login}/>
               </>
               ) : (
               <>
              
              <Stack.Screen name="Home"
               component={Home} 
               options={({navigation})=>({
                headerRight:()=>{
                   return ( 
                   <TouchableOpacity style={{marginRight:width*0.05,flexDirection:'row'}} onPress={()=>{
                        navigation.navigate("AddItem")
                    }}>
                   <Ionicons name="add-circle" size={24} color="black" />
                   <AntDesign name="logout" size={24} color="black" style={{marginLeft:width*0.03}} onPress={async()=>{
                      await this.props.isLoad()
                       navigation.navigate("Signup")
                   }}/>
                    </TouchableOpacity>)
                }
               })}
              />
              <Stack.Screen name="AddItem" component={AddItem}/>
              <Stack.Screen name="EditItem" component={EditItem} />
               </>
               )
           }
           </Stack.Navigator>

           </NavigationContainer>
        )
    }
}
const mapStateToprops=(state)=>{
    return {
        isLoade:state.isLoaded,
        user:state.users
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
export default connect(mapStateToprops,mapDispatchToProps)(Render)