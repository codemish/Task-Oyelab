import React, { Component } from 'react'
import { Text, View,Dimensions,StyleSheet,Image, TouchableOpacity,ImageBackground } from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
const {width,height} =Dimensions.get('window')
 class editItem extends Component {
    state={
        index:0,
        url:this.props.route.params.item.url,
        title:this.props.route.params.item.title,
        des:this.props.route.params.item.des,
        likes:this.props.route.params.item.likes
    }
   async componentDidMount(){
       let ind=0;
      await this.props.item.forEach((item)=>{
          if(item.url==this.state.url&&item.title==this.state.title&&item.des==this.state.des&&item.likes==this.state.likes)
          {
              this.setState({
                  index:ind
              })
              return 
          }
         else{
             ind+=1;
         }
       })
       console.log(this.state.index)
    }
    selectImage=async()=>{
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({
        url:result.uri
      })
    }
    }
    render() {
        return (
            <View style={{flex:1}}>
             <ImageBackground source={require('../images/imagebackground.png')} style={{flex:1,width:width,height:height*0.85}} resizeMode="cover">
            <TouchableOpacity style={{flex:1}} onPress={()=>{
             this.selectImage()
            }}>
             <Image source={{uri:this.state.url}} style={{flex:1,width:width*0.7 ,borderRadius:10,alignSelf:'center',marginTop:width*0.09}}/>
             </TouchableOpacity>
             <View style={{flex:3,alignSelf:'stretch',justifyContent:'flex-start'}}>
             <TextInput
             style={{marginTop:height*0.03}}
             label="Title"
             onChangeText={text => this.setState({
                 title:text
             })}
             defaultValue={this.state.title}
             />
              <TextInput
             style={{marginTop:height*0.03}}
             label="Description"
             onChangeText={text => this.setState({
                 des:text
             })}
             defaultValue={this.state.des}
             />
              <TextInput
             label="Likes"
             style={{marginTop:height*0.03}}
             onChangeText={text => this.setState({
                 likes:text
             })}
             defaultValue={this.state.likes}
             />
             <Button style={{backgroundColor:"pink",alignSelf:'center',marginTop:width*0.1,width:width*0.4}} onPress={async()=>{
              this.props.editItem(this.state.url,this.state.title,this.state.des,this.state.likes,this.state.index)
              this.props.navigation.goBack()
             }}>
             Save
             </Button>
            </View>
            </ImageBackground>
            </View>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
return{
    editItem:(url,title,des,likes,index)=>{
     dispatch({
         type:"editItems",
         payload:{
            url:url,
            title:title,
            des:des,
            likes:likes,
            index:index
         }
     })
    }
}
}
const mapStateToprops=(state)=>{
    return {
        item:state.Items
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(editItem)