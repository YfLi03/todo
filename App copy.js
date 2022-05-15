import React, {useState} from 'react'
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, InteractionManager } from 'react-native';


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



async function storeChange(item){
  try{
    const jsonValue = await AsyncStorage.getItem(item.date)
    obj = (jsonValue==null ? dailyData(item.date) : JSON.parse(jsonValue)) 
    obj.data[item.id] = item
    jsonValue = JSON.stringify(obj)
    await AsyncStorage.setItem(item.date, jsonValue)
  }catch(err){
    console.log(err)
  }
}

async function init(){
  data = new dailyData(220515)
  data.count=2
  item1 = new Item("task","aTask","220515","0")
  item2 = new Item("appointment","anAppointment","220515","1")
  data.data[0] = item1
  data.data[1] = item2
  jsonValue = JSON.stringify(data)
  await AsyncStorage.setItem("220515",jsonValue)
  console.log(jsonValue)
}

async function getData(date, id){
  try{
    const jsonValue = await AsyncStorage.getItem(date)
    obj = (jsonValue==null ? dailyData(item.date) : JSON.parse(jsonValue)) 
    console.log("getobj"+obj)
    return obj.data[id]
  }catch(err){
    console.log(err)
  }
}

const StandardItem =async (props) =>{
  const[ isFinished, setIsFinished ] = useState(false);
  console.log("in")
  item = await getData(props.date, parseInt(props.id))
  console.log("itemGet"+item)

  return(
    <View style={item.type=='task' ? styles.task : styles.appointment}>
      <CheckBox
        disabled={false}
        value={isFinished}
        color={item.type=='task'?'blue':'red'}
        onValueChange={(newValue)=>{
          item.state = "finished"
          storeChange(item)
          setIsFinished(newValue)}
        }
      />
      <View style={styles.itemRight}>
        <Text>{item.name}</Text>
        <Text>{item.id}</Text>
      </View>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>

        {/*notice the double curly braces {{ }} 
        surrounding style‘s width and height. 
        In JSX, JavaScript values are referenced with {}. 
        This is handy if you are passing something other 
        than a string as props, like an array or number: 
        <Cat food={["fish", "kibble"]} age={2} />. 
        However, JS objects are also denoted with curly 
        braces: {width: 200, height: 200}. Therefore, 
        to pass a JS object in JSX, you must wrap the 
        object in another pair of curly braces: 
  {{width: 200, height: 200}}*/}
        
      
      {init()}
      <StandardItem date="220515" id="0" />
    </View>
    //use {} to include javascript code
    //JSX need "React"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  task:{
    height:100,
    flexDirection:"row",
    alignItems:"center",
    width:"80%",
  },
  appointment:{
    height:100,
    flexDirection:"row",
    alignItems:"center",
    width:"80%",
  },
  itemRight:{
    flexDirection:"column",
  }
});
