import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

 class Return extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Text> {this.props.Item.length} </Text>
            </View>
        )
    }
}

const mapStateToprops=(state)=>{
    return {
        Item:state.Items
    }
}
export default connect(mapStateToprops)(Return)