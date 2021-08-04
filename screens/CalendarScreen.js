import * as React from 'react'
import { Text, View } from 'react-native'
import MyHeader from '../components/MyHeader'
import {Calendar} from 'react-calendar'

export default class CalendarScreen extends React.Component{

    constructor()
    {
        super()
        this.state = {
            onChange: new Date(),
            value: new Date(),
            selectedDate: '',
            selectedMonth: '',
            selectedYear: ''
        }
    }

    //this screen is currently under construction :)



    render()
    {
        return(
            <View>
                <View>
                    <MyHeader 
                    title = {'Calendar'}
                    navigation = {this.props.navigation}
                    />
                </View> 
                <View>
                <Calendar 
                  onChange = {this.state.onChange}
                  value = {this.state.value}
                />
                </View>
            </View>
        )
    }
}