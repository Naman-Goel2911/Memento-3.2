import * as React from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'
import {RFValue} from 'react-native-responsive-fontsize'

export default class SettingsScreen extends React.Component{
    constructor()
    {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            emailId: '',
            docId: ''
        }
    }

    componentDidMount = ()=> {
        this.getUserDetails()
    }

    //this function gets the details of the users from the db and sets them in states
    getUserDetails = () => {
        var user = firebase.auth().currentUser;
        var email = user.email
        db.collection('users').where('email_id', '==', email).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                var data = doc.data()
                this.setState({
                    emailId: data.email_id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    contact: data.contact,
                    docId: doc.id
                })
            })
        })
    }

    //this functions updates the deatils of the user in the db if the user changes it 
    updateUserDetails = () => {
        db.collection('users').doc(this.state.docId).update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact
        })
        
        alert('Profile updated successfully')
    }

    //this renders all the text input boxes and buttons for all the details of the user
    render()
    {
        return(
            <View style = {styles.container}>
                <KeyboardAvoidingView>
               <View style = {{flex: 0.12}}>
                <MyHeader 
                title = 'Settings'
                navigation = {this.props.navigation}
                />
               </View>
                <View style = {styles.formContainer}>
                    <View style = {{flex: 0.99, padding: RFValue(10)}}>
                        <Text style = {styles.label}>First Name</Text>
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = 'First Name'
                        maxLength = {8}
                        onChangeText = {(text)=> {
                            this.setState({
                                firstName: text
                            })
                        }}
                        value = {this.state.firstName}
                        />
                        <Text style = {styles.label}>Last Name</Text>
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = 'Last Name'
                        maxLength = {8}
                        onChangeText = {(text)=> {
                            this.setState({
                                lastName: text
                            })
                        }}
                        value = {this.state.lastName}
                        />
                        <Text style = {styles.label}>Contact Name</Text>
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = 'Contact'
                        maxLength = {10}
                        keyboardType = 'numeric'
                        onChangeText = {(text)=> {
                            this.setState({
                                contact: text
                            })
                        }}
                        value = {this.state.contact}
                        />
                        <Text style = {styles.label}>Address</Text>
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = 'Address'
                        multiline = {true}
                        onChangeText = {(text)=> {
                            this.setState({
                                address: text
                            })
                        }}
                        value = {this.state.address}
                        />
                    </View>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=> {
                        this.updateUserDetails()
                    }}
                    >
                        <Text style = {styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
       // alignItems: "center", 
        justifyContent: "center", 
        backgroundColor:"#6fc0b8" 
    }, 
    formContainer:{ 
        flex: 0.88, 
        justifyContent:'center' 
    }, 
    label:{ 
        fontSize:RFValue(18), 
        color:"#717D7E", 
        fontWeight:'bold', 
        padding:RFValue(10), 
        marginLeft:RFValue(20) 
    }, 
    formTextInput: { width: "95%", height: RFValue(50), padding: RFValue(10), borderWidth:1, borderRadius:2, borderColor:"grey", marginBottom:RFValue(20), }, 
    button: { width: "75%", height: RFValue(60), justifyContent: "center", alignItems: 'center',alignSelf: 'center', borderRadius: RFValue(50), backgroundColor: "#32867d", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop: RFValue(20), }, 
    buttonView:{ flex: 0.22, alignItems: "center", marginTop:RFValue(100) 
},
buttonText: { fontSize: RFValue(23), fontWeight: "bold", color: "#fff", }, 
}); 
