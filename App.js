import React, {useState} from 'react'
import CheckBox from 'expo-checkbox';
import List from './components/list.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View, TextInput, InteractionManager } from 'react-native';



async function storeChange(item){
  try{
    jsonValue = await AsyncStorage.getItem(item.date)
    obj = (jsonValue==null ? dailyData(item.date) : JSON.parse(jsonValue)) 
    obj.data[item.id] = item
    jsonValue = JSON.stringify(obj)
    console.log(jsonValue)
    await AsyncStorage.setItem(item.date, jsonValue)
  }catch(err){
    console.log(err)
  }
}

function init(){
  data = new dailyData(220515)
  data.count=2
  item1 = new Item("task","aTask","220515","0")
  item2 = new Item("appointment","anAppointment","220515","1")
  data.data[0] = item1
  data.data[1] = item2
  jsonValue = JSON.stringify(data)
  AsyncStorage.setItem("220515",jsonValue)

}

async function getData(date, id){
  try{
    //console.log("gethee")
    //console.log(String(date))
    const jsonValue = await AsyncStorage.getItem(String(date))
    obj = (jsonValue==null ? dailyData(item.date) : JSON.parse(jsonValue)) 
    //console.log("getobj"+obj)
    return obj.data[id]
  }catch(err){
    console.log(err)
  }
}

const StandardItem = (props) =>{
  const[ isFinished, setIsFinished ] = useState(false);
  const[ type, setType ] = useState("task");
  const[ name, setName ] = useState("default");
  var object = {}
  getData(props.date, parseInt(props.id)).then((obj)=>{
    setType(obj.type)
    setName(obj.name)
    object = obj
    if(obj.state=="finished") setIsFinished(true)
  })


  return(
    <View style={type=='task' ? styles.task : styles.appointment}>
      <CheckBox
        disabled={false}
        value={isFinished}
        color={type=='task'?'blue':'red'}
        onValueChange={(newValue)=>{
          object.state = newValue ? "finished" : "unfinished"
          setIsFinished(newValue)
          storeChange(object)
          setTimeout(function(){setIsFinished(newValue)},10)
          //i hate async
          
          }
        }
      />
      <View style={styles.itemRight}>
        <Text>{name}</Text>
        <Text>{props.id}</Text>
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
        
      
      <List date="220515"/>
      
    </View>
    //use {} to include javascript code
    //JSX need "React"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    padding: 20,
  }
});
