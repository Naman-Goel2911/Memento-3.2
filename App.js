import * as React from 'react'
import { Text, View } from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import WelcomeScreen from './screens/WelcomeScreen'
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import AppTabNavigator from './components/AppTabNavigator'

export default class App extends React.Component{
  render()
  {
    return(   
        <AppContainer />
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
    WelcomeScreen: {screen: WelcomeScreen},
    Drawer: {screen: AppDrawerNavigator},
    BottomTab: {screen: AppTabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)