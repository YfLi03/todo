import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';


const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
  );
}

const Test = (props) =>{
  const [isTested, setIsTested] = useState(false);
  //[<getter>, <setter>] = useState(<initialValue>)
  return(
    <View>
      <Text>This is a Test{props.name} and I am {isTested?"tested":"not tested"}</Text>
      <Button
      //{} means using JS
        onPress={()=>{
          setIsTested((true));
          /*when a state-setting function like setIsHungry is called, 
          its component will re-render.*/
        }}
        disabled={isTested}
        title={isTested? "testtted" : "test it"}
        />
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput
        style={{
          height: 25,
          width: "90%",
          borderColor: 'blue',
          borderWidth: 2
        }}
        /*notice the double curly braces {{ }} 
        surrounding style‘s width and height. 
        In JSX, JavaScript values are referenced with {}. 
        This is handy if you are passing something other 
        than a string as props, like an array or number: 
        <Cat food={["fish", "kibble"]} age={2} />. 
        However, JS objects are also denoted with curly 
        braces: {width: 200, height: 200}. Therefore, 
        to pass a JS object in JSX, you must wrap the 
        object in another pair of curly braces: 
        {{width: 200, height: 200}}*/
        defaultValue = "hi"
      />
      <Test name="big"/>
      <Test name="small"/>
      <PizzaTranslator />
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
});
