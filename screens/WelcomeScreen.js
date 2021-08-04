import * as React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView,  KeyboardAvoidingView } from 'react-native'
import MyHeader from '../components/MyHeader'
import * as firebase from 'firebase'
import db from '../config'
import {RFValue} from 'react-native-responsive-fontsize'

export default class WelcomeScreen extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=> {
            this.props.navigation.navigate('Drawer')
        })
        .catch((error)=> {
            var errorCode = error.code 
            var errorMessage = error.errorMessage
            return alert(errorMessage)
        })
    }

    userSignUp = (email, password, confirmPassword) => {
        if(password !== confirmPassword)
        {
            return alert('Password does not match\nCheck your password')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=> {
                db.collection('users').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    address: this.state.address,
                    email_id: this.state.emailId,
                })
                return alert('User added successfully',
                '',
                [
                    {text: 'Ok', onPress: ()=>
                        this.setState({
                            isModalVisible: false
                        })
                    },
                ])
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                return alert(errorMessage)
            })
        }
    }

    showModal = () => {
        return(
            <Modal
            animationType = "fade"
            transparent = {true}
            visible = {this.state.isModalVisible}
            >
                <ScrollView style = {styles.scrollview}>
                        <View style = {styles.signupView}>
                            <Text style = {styles.signupText}>Sign Up</Text>
                        </View>
                        <KeyboardAvoidingView style = {{flex: 0.95}}>
                            <View style = {{flex: 0.95}}>
                                <Text style = {styles.label}>First Name</Text>
                                <TextInput
                                style = {styles.formInput}
                                placeholder = {'First Name'}
                                maxLength = {8}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                                />
                                <Text style = {styles.label}>Last Name</Text>
                                <TextInput 
                                style = {styles.formInput}
                                placeholder = {'Last Name'}
                                maxLength = {8}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                                />
                                <Text style = {styles.label}>Contact</Text>
                                <TextInput 
                                style = {styles.formInput}
                                placeholder = {'Contact'}
                                maxLength = {10}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        contact: text
                                    })
                                }}
                                />
                                <Text style = {styles.label}>Address</Text>
                                <TextInput 
                                style = {styles.formInput}
                                placeholder = {'Address'}
                                multiline = {true}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        address: text
                                    })
                                }}
                                />
                                <Text style = {styles.label}>Email-ID</Text>
                                <TextInput 
                                style = {styles.formInput}
                                placeholder = {'Email ID'}
                                keyboardType = {'email-address'}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        emailId: text
                                    })
                                }}
                                />
                                <Text style = {styles.label}>Password</Text>
                                <TextInput 
                                style = {styles.formInput}
                                placeholder = {'Password'}
                                secureTextEntry = {true}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        password: text
                                    })
                                }}
                                />
                                <Text style = {styles.label}>Confirm Password</Text>
                                <TextInput 
                                style = {styles.formInput}
                                placeholder = {'Confrim Password'}
                                secureTextEntry = {true}
                                onChangeText = {(text)=> {
                                    this.setState({
                                        confirmPassword: text
                                    })
                                }}
                                />
                            </View>
                            <View style = {{flex: 0.2, alignItems: 'center'}}>
                                <TouchableOpacity
                                style = {styles.registerButton}
                                onPress = {()=>{
                                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                }}
                                >
                                    <Text style = {styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style = {styles.cancelButton}
                                onPress = {()=>{
                                    this.setState({
                                        isModalVisible: false
                                    })
                                }}
                                >
                                    <Text style = {styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
            </Modal>
        )
    }

    render()
    {
        return(
            <View style = {styles.container}>
                {this.showModal()}
                <View style = {{flex: 0.1}}>
                    <MyHeader title = 'Memento' navigation = {this.props.navigation} />
                </View>
                <View>
                    <KeyboardAvoidingView>
                        <View style = {{flex: 0.45, marginTop: 30, marginLeft: 60}}>
                            <TextInput 
                            style = {styles.loginBox}
                            placeholder = {'abc@email.com'}
                            placeholderTextColor = {'gray'}
                            keyboardType = 'email-address'
                            onChangeText = {(text)=> {
                                this.setState({
                                    emailId: text
                                })
                            }}
                            value = {this.state.emailId}
                            />
                            <TextInput 
                            style = {[styles.loginBox, {marginTop: RFValue(15)}]}
                            placeholder = {'Password'}
                            placeholderTextColor = {'gray'}
                            secureTextEntry = {true}
                            onChangeText = {(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                            />
                        </View>
                        <View style = {{flex: 1, marginTop: 150, alignItems: 'center'}}>
                            <TouchableOpacity 
                            style = {styles.button}
                            onPress=  {()=> {
                                this.login(this.state.emailId, this.state.password)
                            }}
                            >
                                <Text style = {styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style = {styles.button}
                            onPress = {()=> {
                                this.setState({
                                    isModalVisible: true
                                })
                            }}
                            >
                                <Text style = {styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1, backgroundColor: "#6fc0b8" }, 
    loginBox: { width: "80%", height: RFValue(50), borderWidth: 1.5, borderColor: "#ffffff", fontSize: RFValue(20), paddingLeft: RFValue(10) }, 
    button: { width: "80%", height: RFValue(50), justifyContent: "center", alignItems: "center", borderRadius: RFValue(25), backgroundColor: "#ffff", shadowColor: "#000", marginBottom: RFValue(10), 
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10.32, elevation: 16 }, 
    buttonText: { color: "#32867d", fontWeight: "200", fontSize: RFValue(20) },
    label: { fontSize: RFValue(13), color: "#717D7E", fontWeight: "bold", paddingLeft: RFValue(10), marginLeft: RFValue(20) }, 
    formInput: { width: "90%", height: RFValue(45), padding: RFValue(10), borderWidth: 1, borderRadius: 2, borderColor: "grey", paddingBottom: RFValue(10), marginLeft: RFValue(20), marginBottom: RFValue(14) }, 
    registerButton: { width: "75%", height: RFValue(50), marginTop: RFValue(20), justifyContent: "center", alignItems: "center", borderRadius: RFValue(3), backgroundColor: "#32867d", shadowColor: "#000", 
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop: RFValue(10) }, 
    registerButtonText: { fontSize: RFValue(23), fontWeight: "bold", color: "#fff" }, 
    cancelButtonText: { fontSize: RFValue(20), fontWeight: "bold", color: "#32867d", marginTop: RFValue(10) },
    scrollview: { flex: 1, backgroundColor: "#fff" }, 
    signupView: { flex: 0.05, justifyContent: "center", alignItems: "center" }, 
    signupText: { fontSize: RFValue(20), fontWeight: "bold", color: "#32867d" }, 
    santaView: { flex: 0.85, justifyContent: "center", alignItems: "center", padding: RFValue(10) }, 
    santaImage: { width: "70%", height: "100%", resizeMode: "stretch" }, 
    TextInput: { flex: 0.5, alignItems: "center", justifyContent: "center" }, 
    bookImage: { width: "100%", height: RFValue(220) } 
});