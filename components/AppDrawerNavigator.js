import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CustomSidebarMenu from './CustomSidebarMenu'
import AppTabNavigator from './AppTabNavigator'
import SettingsScreen from '../screens/SettingsScreen'
import {Icon} from 'react-native-elements'
import CalendarScreen from '../screens/CalendarScreen'

//the code below makes the contents of the side drawer

export const AppDrawerNavigator = createDrawerNavigator({
    //this is for the home screen which is the main calendar screen
    Home: {
        screen: AppTabNavigator,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'home'
            type = 'fontawesome5'
            />
        }
    },
    //this is for a bottom tab navigator which contains the screens to view and add shopping items
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'gift'
            type = 'font-awesome'
            />
        }
    },
    //this is for the settings
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'settings'
            type = 'fontawesome5'
            />,
            drawerLabel: 'Settings'
        }
    },
    },
    {
        contentComponent: CustomSidebarMenu
    },
    {
        initialRouteName: 'Home'
    }
)