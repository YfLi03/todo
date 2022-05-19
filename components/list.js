import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import React,{useState} from 'react';
import item from './item.js'
import { ScrollView, Text, View, StyleSheet } from 'react-native';




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

    const [obj, setObj] = useState(new dailyData(222222))
    const [states, setStates] = useState(new Array())
 
    const updateStates = (item, newStates) => {storeChange(item); setStates(newStates)}

    if(obj.date!=props.date)

        AsyncStorage.getItem(String(props.date)).then((jsonValue)=>{
            if(jsonValue == null){
                dateData = new dailyData(props.date)
                jsonValue = JSON.stringify(dateData)
                AsyncStorage.setItem(String(props.date),jsonValue).then(()=>{
                    setObj(dateData)
                })
            }else{
                dateData = JSON.parse(jsonValue)
                setObj(dateData)
                var tempStates = new Array()
                for(i=0; i<dateData.data.length; i++)
                    tempStates[i] = dateData.data[i].state =="unfinished" ? false : true
                setStates(tempStates)
            }
            }).catch(err=>{console.log("readFailed");console.log(err)})


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
  