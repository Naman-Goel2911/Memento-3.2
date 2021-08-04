import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize'
import { Input } from 'react-native-elements'
import db from '../config'

export default class AddingShoppingListScreen extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemName: '',
            price: '',
            requestId: '',
            itemStatus: ''
        }
    }

    //this creates a unique id
    createUniqueId()
    {
        return Math.random().toString(36).substring(7) 
    }

    //this function adds the request
    addRequest = (itemName, price) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        //this adds it to the database
        db.collection('shoppingItems').add({
            'user_id': userId,
            'item_name': itemName,
            'price': price,
            'request_id': randomRequestId,
            item_status: 'added',
        })
    
        //this resets the states
        this.setState({
            itemName: '',
            price: '',
            requestId: randomRequestId,
            itemStatus: ''
        })

        return alert('Item added to the list');
    }

    //this renders all the text inputs boxes and the add item button
    render()
    {
        return (
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.1 }}>
                    <MyHeader title= "Add items" navigation={this.props.navigation} />
                  </View>
                  <View style={{ flex: 0.9 }}>
                    <Input
                      style={styles.formTextInput}
                      label={"Item Name"}
                      placeholder={"Item name"}
                      containerStyle={{ marginTop: RFValue(60) }}
                      onChangeText={(text) => {
                        this.setState({
                            itemName: text
                        })
                      }}
                      value={this.state.itemName}
                    />
                      <View style={{ alignItems: "center" }}>
                        <Input
                          style={styles.formTextInput}
                          containerStyle={{marginTop: RFValue(30)}}
                          label={"Price"}
                          placeholder={"Price"}
                          onChangeText={(text) => {
                            this.setState({
                              price: text,
                            });
                          }}
                          value={this.state.price}
                        />
                        <TouchableOpacity
                          style={[styles.button, { marginTop: RFValue(30) }]}
                          onPress={() => {
                            this.addRequest(
                              this.state.itemName,
                              this.state.price
                            );
                          }}
                        >
                          <Text
                            style={styles.requestbuttontxt}
                          >
                            Add item
                          </Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                </View>
              );
    }
}

const styles = StyleSheet.create({
    keyBoardStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formTextInput: {
      width: "75%",
      height: RFValue(35),
      borderWidth: 1,
      padding: 10,
    },
    ImageView:{
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
      marginTop:20
    },
    imageStyle:{
      height: RFValue(150),
      width: RFValue(150),
      alignSelf: "center",
      borderWidth: 5,
      borderRadius: RFValue(10),
    },
    bookstatus:{
      flex: 0.4,
      alignItems: "center",
  
    },
    requestedbookName:{
      fontSize: RFValue(30),
      fontWeight: "500",
      padding: RFValue(10),
      fontWeight: "bold",
      alignItems:'center',
      marginLeft:RFValue(60)
    },
    status:{
      fontSize: RFValue(20),
      marginTop: RFValue(30),
    },
    bookStatus:{
      fontSize: RFValue(30),
      fontWeight: "bold",
      marginTop: RFValue(10),
    },
    buttonView:{
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center",
    },
    buttontxt:{
      fontSize: RFValue(18),
      fontWeight: "bold",
      color: "#fff",
    },
    touchableopacity:{
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width: "90%",
    },
    requestbuttontxt:{
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#fff",
    },
    button: {
      width: "75%",
      height: RFValue(60),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(50),
      backgroundColor: "#32867d",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
    },
  });