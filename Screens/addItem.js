import React, { Component } from 'react'
import { Text,KeyboardAvoidingView, View,StyleSheet,Dimensions ,Image,ImageBackground} from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {store} from '../Redux/store'
import { Provider } from 'react-redux';
const {width,height}=Dimensions.get('window')
class addItem extends Component {
    state={
        url:"",
        title:"",
        des:"",
        likes:0,
    }
    selectImage=async()=>{
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        url:result.uri
      })
    }
    }
    render() {
        return (
            <Provider store={store}>
             <ImageBackground source={require('../images/imagebackground.png')} style={{width:width,height:height*0.85}} resizeMode="cover">
            <KeyboardAvoidingView style={styles.mainContainer}>
            <View style={{flex:1,marginTop:height*0.05}}>
            {
                this.state.url
                ?
                <Image style={{flex:1,width:width*0.7 ,borderRadius:10,justifyContent:'flex-start'}} source={{uri:this.state.url}} />
                :
                <View>
                <Entypo name="image" size={100} color="black" onPress={()=>{
                    this.selectImage()
                }}/>
                <Text style={{alignSelf:'center',fontSize:20}}>
                Add Image
                </Text>
                </View>
            }
            </View>
            <View style={{flex:3,alignSelf:'stretch',marginTop:height*0.03}}>
             <TextInput
             label="Title"
             onChangeText={text => this.setState({
                 title:text
             })}
             />
              <TextInput
             style={{marginTop:height*0.03}}
             label="Description"
             onChangeText={text => this.setState({
                 des:text
             })}
             />
              <TextInput
                style={{marginTop:height*0.03}}
             label="Likes"
             onChangeText={text => this.setState({
                 likes:text
             })}
             />
             <Button style={{backgroundColor:"#e0ffff",alignSelf:'center',marginTop:width*0.1,width:width*0.4}} onPress={async()=>{
              this.props.addItem(this.state.url,this.state.title,this.state.des,this.state.likes)
              console.log(this.props.Item)
              this.props.navigation.goBack()
             }}>
             Save
             </Button>
            </View>
            </KeyboardAvoidingView>
            </ImageBackground>
            </Provider>
        )
    }
}
const styles= StyleSheet.create({
 mainContainer:{
     alignItems:'center',
     flex:1,
 }
})
const mapStateToprops=(state)=>{
   return {
       Item:state.Items
   } 
}
const mapDispatchToProps=(dispatch)=>{
return {
addItem:(url,title,des,likes)=>{
    dispatch({
        type:"addItems",
        payload:{
            url:url,
            title:title,
            des:des,
            likes:likes
        }
    })
}
}
}
export default connect(mapStateToprops,mapDispatchToProps)(addItem)
