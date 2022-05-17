import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { ScrollView } from 'react-native';


class dailyData{
    constructor(date){
      this.date = date
      this.count = 0
      this.data = new Array()
    }
}

class Item{
  constructor(type, name, date, cnt){
    this.type = type;
    this.name = name;
    this.date = date;
    this.state = "unfinished";
    this.id = cnt;
  }
}
  
function item(_item){
    return(
        <View>
            <Checkbox
                disabled={false}
            />
            <Text>{_item.name}</Text>
            <Text>{_item.id}</Text>
        </View>
    )
}
export default async function list(date){
    try{
        console.log("GET")
        const jsonValue = await AsyncStorage.getItem(String(date))
        obj = ( jsonValue == null ? dailyData(item.date) : JSON.parse(jsonValue))
        return(
            <ScrollView>
                {obj.data.map(item)}
            </ScrollView>
        )
    }catch(err){
        console.log(err)
    }
}
