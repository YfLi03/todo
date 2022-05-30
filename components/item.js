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
  

export default function displayItem(item, states, updateStates){
    //console.log("inside")
 
    key = String(item.date) + String(item.id)
    if(item.start==undefined || item.start<0){
        start = "--"
    } else{
        start = String(parseInt(item.start/100)+":"+item.start%100)
    }
    //unfinished

    //finished items should not appear here
    return(
        <View key={key} style={(item.state=="finished"||item.state=="finishing") ? styles.finishedItem : styles.item}>

            <View style={styles.Left}>
                <Text style={styles.LeftText}>{start}</Text>
            </View>


            <View style={styles.Checkbox}>
                <CheckBox 
                    value={(item.state=="finished"||item.state=="finishing")}
                    color={item.type=='task'?'darkslateblue':'firebrick'}
                    onValueChange={(newValue)=>{
                        if(newValue==true){
                            item.state = "finishing";
                            updateStates(item, states)
                        }else{
                            item.state = "unfinishing";
                            updateStates(item, states)
                        }

                        setTimeout(()=>{
                            var newStates =Array.from(states)
                            newStates[item.id] = newValue                    
                            item.state = newValue ? "finished" : "unfinished"
                            //storeChange(item)
                            updateStates(item, newStates);
                        },500)
                        
                    }}
                />
            </View>

            <View style={styles.Right}>
                <Text>{item.name}</Text>
                <Text>{item.id}</Text>
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    item:{
        opacity:1,
        height: 60,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    finishedItem:{
        opacity: 0.6,
        height: 60,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    text:{
        
    },
    finishedText:{
        color:"#D3D3D3"
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
    LeftText:{
        fontSize:15,
        textAlign:"center",
        fontWeight:"bold"
    },
    Checkbox:{
        flex:1,
    },
  });
  