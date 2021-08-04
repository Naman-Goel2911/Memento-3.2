import * as React from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import ShoppingListScreen from '../screens/ShoppingListScreen'
import AddingShoppingListScreen from '../screens/AddingShoppingListScreen';

//this is to navigate between he screen to view the list and the screen through which you can add the items to the list

const AppTabNavigator = createBottomTabNavigator({
    //this is for the viewing screen
    ShoppingList: {screen: ShoppingListScreen, 
    navigationOptions: {
        tabBarIcon: <Image 
            source = {require('../assets/shoppingListImage.jpg')}
            style = {{width: 20, height: 20}}
        />,
        tabBarLabel: "Shopping List"
    }},
    //this is for the adding the list screen
    AddingShoppingList: {screen: AddingShoppingListScreen,
        navigationOptions: {
            tabBarIcon: <Image 
                source = {require('../assets/addingShoppingListImage.jpg')}
                style = {{width: 20, height: 20}}
            />,
            tabBarLabel: "Add items"
        }
    }
})

export default AppTabNavigator;