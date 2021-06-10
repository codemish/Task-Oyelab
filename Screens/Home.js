import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image,Dimensions,ImageBackground} from 'react-native'
import {connect,Provider} from 'react-redux'
import Card from './Card'
import Return from './return'
import {store} from '../Redux/store'
const {width,height}=Dimensions.get('window')
class Home extends Component {
    render() {
        return (
            <Provider store={store}>
            <View style={{flex:1,alignItems:'stretch'}}>
            <ImageBackground source={require('../images/imagebackground.png')} style={{width:width,height:height*0.85}} resizeMode="cover">
                { 
                    this.props.Item.length
                    ? 
                     this.props.Item.map((item)=>(
                            <Card item={item} navigation={this.props.navigation}/>
                     ))
                    :
                    <View style={{ flex:1 ,justifyContent:'center'}}>
                    <Text style={styles.text}>
                    No Items as of now, Kindly add one
                    </Text>
                    </View>
                }
                 </ImageBackground>
            </View>
           
            </Provider>
        )
    }
}
var mapStateToprops=(state)=>{
 return {
     Item:state.Items
 }
}
export default connect(mapStateToprops)(Home)
const styles= StyleSheet.create({
text:{
   alignSelf:"center",
    fontSize:25,
}
})
