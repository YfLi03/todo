import CheckBox from 'expo-checkbox';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Item{
    constructor(type, name, date, cnt, length = 0){
      this.type = type;
      this.name = name;
      this.date = date;
      this.state = "unfinished";
      this.id = cnt;
      this.length = length
    }
  }
  

export default function item(_item,states, updateStates){
    //console.log("inside")
 
    key = String(_item.date) + String(_item.id)
    if(_item.length==undefined || _item.length==0){
        length = "-"
    } else{
        length = String(item.length)
    }
    //finished items should not appear here
    return(
        <View key={key} style={styles.item}>
            <View style={styles.Left}>
                <Text style={styles.LeftText}>{length}</Text>
            </View>


            <View style={styles.Checkbox}>
                <CheckBox 
                    value={states[_item.id]}
                    color={_item.type=='task'?'darkslateblue':'firebrick'}
                    onValueChange={(newValue)=>{
                        var newStates =Array.from(states)
                        newStates[_item.id] = newValue                    
                        _item.state = newValue ? "finished" : "unfinished"
                        //storeChange(_item)
                        updateStates(_item, newStates)
                    }}
                />
            </View>

            <View style={styles.Right}>
                <Text>{_item.name}</Text>
                <Text>{_item.id}</Text>
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    item:{
        height: 60,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },


    Right:{
      flexDirection:"column",
      flex:12,
      padding: 10,
    },

    Left:{
        flex:2,
        justifyContent:"center",
        alignContent:"center",
        padding:10,
      },
    Checkbox:{
        flex:1,
    },
    LeftText:{
        fontSize:40,
    }
  });
  