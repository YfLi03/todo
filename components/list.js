import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import React,{useState} from 'react';
import item from './item.js'
import { ScrollView, Text, View, StyleSheet } from 'react-native';


  
class dailyData{
    constructor(date){
      this.date = date
      this.count = 0
      this.data = new Array()
    }
}

async function storeChange(_item){
    try{
        //console.log(_item)
        jsonValue = await AsyncStorage.getItem(String(_item.date))
        obj = (jsonValue==null ? dailyData(_item.date) : JSON.parse(jsonValue)) 
        obj.data[_item.id] = _item
        jsonValue = JSON.stringify(obj)
        await AsyncStorage.setItem(_item.date, jsonValue)
    }catch(err){
        console.log(err)
    }
}

export default function List (props){

    const updateObj = props.updateObj;
    states = props.states;
    obj = props.obj;
    console.log(obj)
    console.log(states)
 
    const updateStates = (_item) => {
        storeChange(_item).then(()=>{
            updateObj();
        })
    }


    return(
        <ScrollView>
            {obj.data.map(_item => item(_item, states, updateStates))
            //Actually it's not necessary to give all the states array
            }
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    item:{
        height: 60,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    item_Right:{
      flexDirection:"column",
      flex:12,
      padding: 10,
    },

    item_Left:{
        flex:2,
        justifyContent:"center",
        alignContent:"center",
        padding:10,
      },
    item_Checkbox:{
        flex:1,
    },
    item_LeftText:{
        fontSize:40,
    }
  });
  