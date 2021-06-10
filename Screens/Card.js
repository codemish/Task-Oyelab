import React, { Component } from 'react'
import { FlatList, Text, View,Image ,Dimensions} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
const {width,height}=Dimensions.get('window')
 class card extends Component {
    render() {
        return (
               <Card style={{marginBottom:height*0.01, backgroundColor:'#e0ffff', height:height*0.2}}>
               <Card.Title title={this.props.item.title} left={()=>
               <View style={{flex:1}}>
               <Image style={{flex:1,width:width*0.1,height:height*0.2,backgroundColor:'red'}} source={{uri:this.props.item.url}} />
                </View>
                }
                 right={()=>
                 <View>
                 <AntDesign name="delete" size={24} color="black" style={{marginRight:width*0.05}} onPress={()=>{
                  this.props.delete(this.props.item)
                 }}/>
                 </View>
                 }   
                />
                <Card.Content>
                <Title> Description: {this.props.item.des}</Title>
                <Paragraph> Likes-: {this.props.item.likes}</Paragraph>
                </Card.Content>
                <Card.Actions>
                <Button onPress={()=>{
                    this.props.navigation.navigate("EditItem",{item:this.props.item})
                 }}>
                Edit
                </Button>
               </Card.Actions>
                </Card>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
return {
delete:(item)=>{
  dispatch({
    type:"deleteItem",
    payload:{
        item:item
    }
  })}
}
}
export default connect(null,mapDispatchToProps)(card)