import * as React from 'react'
import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import db from "../config";
import { RFValue } from 'react-native-responsive-fontsize';

export default class SwipableFlatList extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            allItems: this.props.allItems
        }
    }

    //this is the function which marks the status of the item as bought which removes it from the screen
    updateMarkAsRead = item => {
        db.collection("shoppingItems")
          .doc(item.doc_id)
          .update({
            item_status: "bought"
          });
    };

    //this function will take the data or the item that we swiped and then give it to the other function for it to be marked as bought
    onSwipeValueChange = swipeData => {
        var allItems = this.state.allItems;
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width) {
          const newData = [...allItems];
          this.updateMarkAsRead(allItems[key]);
          newData.splice(key, 1);
          this.setState({ allItems: newData });
        }
    };

    //this is the function which renders the items and contains them 
    renderItem = data => (
        <Animated.View>
          <ListItem
            leftElement={<Icon name="item" type="font-awesome" color="#696969" />}
            title={data.item.item_name}
            titleStyle={{ color: "black", fontWeight: "bold" }}
            subtitle={data.item.price}
            bottomDivider
          />
        </Animated.View>
    );

    //this is the text that comes when we swipe the item
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <Text style={styles.backTextWhite}>Mark as purchased</Text>
          </View>
        </View>
      );

    //this renders the items
    render() {
        return (
          <View style={styles.container}>
            <SwipeListView
              disableRightSwipe
              data={this.state.allItems}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get("window").width}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={this.onSwipeValueChange}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1
    },
    backTextWhite: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "flex-start"
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "#29b6f6",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 15
    },
    backRightBtn: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: 100
    },
    backRightBtnRight: {
      backgroundColor: "#29b6f6",
      right: 0
    }
  });
  