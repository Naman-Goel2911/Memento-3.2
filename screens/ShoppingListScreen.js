//this screen does not work properly
import * as React from 'react'
import { Text, View } from 'react-native'
import MyHeader from '../components/MyHeader'
import {ListItem, Icon} from 'react-native-elements'
import db from '../config'
import { RFValue } from 'react-native-responsive-fontsize'
import SwipableFlatList from '../components/SwipableFlatList'
import firebase from 'firebase'

export default class ShoppingListScreen extends React.Component{

    constructor(props)
    {
        super(props)    
        this.state = {
            userId: firebase.auth().currentUser.email,
            allItems: [],
            docId: ''
        }
        this.requestRef = null
    }

    componentDidMount = () => {
        this.getRequestedShoppingList()
    }

    componentWillUnmount = () => {
        this.requestRef()
    }

    //this function gets the list of all the items that the user has added in the database that are marked as added (I think there must be a mistake in this function that is why the screen is not working)
    getRequestedShoppingList = () => {
        this.requestRef = db.collection('shoppingItems').where('item_status', '==', 'added')
        .where('user_id', '==', this.state.userId)
        .onSnapshot((snapshot)=> {
            var allItems = []
            snapshot.docs.map((doc)=> {
                var items = doc.data()
                items["doc_id"] = doc.id
                allItems.push(items)
            })
            this.setState({
                allItems: allItems
            })
            console.log(allItems)
        })
    }

    //I don't think this does anything but I added this because it was in BookSanta
    keyExtractor = (item, index) => index.toString()

    //I don't think this does anything but I added this because it was in BookSanta
    renderItem = ({item, index}) => {
        return (
            <ListItem 
            key = {index}
            leftElement = {<Icon name = 'gift' type = 'font-awesome' color = 'white' />}
            title = {item.item_name}
            subtitle = {item.price}
            titleStyle = {{color: 'black', fontWeight: 'bold'}}
            bottomDivider
            />
        )
    }


    //this renders the swipable flat list and if you have not added anything it shows nothing
    render()
    {
        return(
            <View>
                <View>
                    <MyHeader 
                    title = {'Shopping List'}
                    navigation = {this.props.navigation}
                    />
                </View>
                <View style = {{flex: 0.9}}>
                    {
                        this.state.allItems.length === 0
                        ?
                        (
                            <View>
                                <Text>You have no items added</Text>
                            </View>
                        )
                        :
                        (
                           <SwipableFlatList 
                           allItems = {this.state.allItems}
                           />
                        )
                    }
                </View>
            </View>
        )
    }
}
