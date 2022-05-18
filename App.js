import React, {useState} from 'react'
import DailyScreen from './screens/daily.js'
import { Button, ScrollView, StyleSheet, Text, View, TextInput, InteractionManager } from 'react-native';

  


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
        
      
      <DailyScreen date="220515"/>
      
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
