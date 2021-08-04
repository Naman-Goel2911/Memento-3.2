import * as React from 'react'
import {View} from 'react-native'
import {Header, Icon} from 'react-native-elements'

export default class MyHeader extends React.Component{
    
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <View>
                <Header 
                leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = 'purple' onPress = {()=> 
                    this.props.navigation.toggleDrawer()
                } />}
                centerComponent = {{text: this.props.title, style: {color: 'white', fontSize: 20, fontWeight: 'bold'}}}
                backgroundColor = '#6fc0b8'
                />
            </View>
        )
    }
}