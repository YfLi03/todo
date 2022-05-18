import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import React,{useState} from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';




class Item{
    constructor(type, name, date, cnt){
      this.type = type;
      this.name = name;
      this.date = date;
      this.state = "unfinished";
      this.id = cnt;
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
        console.log(_item)
        jsonValue = await AsyncStorage.getItem(String(_item.date))
        obj = (jsonValue==null ? dailyData(_item.date) : JSON.parse(jsonValue)) 
        obj.data[_item.id] = _item
        jsonValue = JSON.stringify(obj)
        await AsyncStorage.setItem(_item.date, jsonValue)
    }catch(err){
        console.log(err)
    }
}

function item(_item,states, updateStates){
    console.log("inside")
 
    key = String(_item.date) + String(_item.id) 
    //finished items should not appear here
    return(
        <View key={key} style={styles.item}>
            <CheckBox style={styles.item_Left}
                value={states[_item.id]}
                color={_item.type=='task'?'blue':'red'}
                onValueChange={(newValue)=>{
                    var newStates =Array.from(states)
                    newStates[_item.id] = newValue                    
                    _item.state = newValue ? "finished" : "unfinished"
                    storeChange(_item)
                    updateStates(newStates)
                }}
            />
            <View style={styles.item_Right}>
                <Text>{_item.name}</Text>
                <Text>{_item.id}</Text>
            </View>
        </View>
    )
  }

export default function List (props){
    var state = new Array();
    const [obj, setObj] = useState(new dailyData(222222))
    const [states, setStates] = useState(state)
    console.log("listRefreshed:")
    console.log(states)
    const updateStates = (newStates) => {setStates(newStates)}
    if(obj.date==222222)
        try{
            //console.log("listInit")
            AsyncStorage.getItem(String(props.date)).then((jsonValue)=>{
                dateData = jsonValue == null ? dailyData(item.date) : JSON.parse(jsonValue)
                setObj(dateData)
                var tempStates = new Array()

                for(i=0; i<dateData.data.length; i++){
                    console.log(i)
                    tempStates[i] = dateData.data[i].state =="unfinished" ? false : true
                }
                console.log(tempStates)
                setStates(tempStates)
                })
        }catch(err){
            console.log(err)
        }

    return(
        <ScrollView>
            {obj.data.map(_item => item(_item, states, updateStates))
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
      padding: 10,
    },
  });
  