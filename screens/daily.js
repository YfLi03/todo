import List from '../components/list.js'
import addItemModal from '../components/addItem/modal.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { getDateID } from '../funcs/getAsyncId.js'

class dailyData{
    constructor(date){
      this.date = date
      this.count = 0
      this.data = new Array()
    }
}

class Item{
    constructor(type, name, date, cnt, length = 0, start = -1){
      this.type = type;
      this.name = name;
      this.date = date;     //string
      this.state = "unfinished";
      this.id = cnt;
      this.length = length
      this.start = start
    }
  }
  

export default function DailyScreen (props){
    const[date,setDate] = useState(Number(props.date))
    const[obj, setObj] = useState(new dailyData(0))
    const[addItemVisible, setAddItemVisible] = useState(false)


    //it's unnecessary to make 'itemStates' a rn-state obj
    //actually it's unnecessary to process it in this function
    itemStates = new Array()
    for(i=0; i<obj.data.length; i++)
        itemStates[i] = (obj.data[i].state =="unfinished"||obj.data[i].state =="finishing") ? false : true
    //itemStates decide it's location on the list

    //must be called when setDate is called
    //update obj and itemStates(if Necessary) at the same time 
    
    //need some amendments, when there's no update of info, asyncstorage is
    //very inefficient!
    function updateObj(_date = date){
        AsyncStorage.getItem(String(_date)).then(jsonValue =>{
            if(jsonValue == null){
                dateObj = new dailyData(_date)
                jsonValue = JSON.stringify(dateObj)
                AsyncStorage.setItem(String(_date),jsonValue).then(()=>{
                    setObj(dateObj)
                })
            }else{
                dateObj = JSON.parse(jsonValue)
                setObj(dateObj)
            }
        })
    }

    function addItem(type, name, _date, length){
        AsyncStorage.getItem(String(_date)).then(jsonValue =>{
            if(jsonValue == null){
                dateObj = new dailyData(_date)
                
            }else{
                dateObj = JSON.parse(jsonValue)
            }
            dateObj.data[dateObj.count] = new Item(type,name,String(_date),dateObj.count,length)
            dateObj.count++; 
            jsonValue = JSON.stringify(dateObj)
            AsyncStorage.setItem(String(_date),jsonValue).then(()=>{
                if(_date == date )updateObj()
            })
        })
    }


    if(obj.date==0)updateObj();
    //_date is declared in the convenience of latter components' functions
    _date = new Date(date/10000+2000, (date/100)%100-1, date%100)



    return(
        <View style={styles.container}>
            {addItemModal(addItemVisible, (visible)=>setAddItemVisible(visible), addItem)}

            <View style={styles.header}>
                <Text style={styles.titleText}>
                    {(_date.getMonth()+1)+'/'+_date.getDate()}
                </Text>
            </View>

            <View style={styles.body}>
                <List style={styles.list} updateObj={updateObj} states={itemStates} obj={obj}/>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        _date.setDate(_date.getDate()-1)
                        setDate(getDateID(_date))
                        updateObj(getDateID(_date));
                        //setState is Async and doesn't support promise/callback
                    }}
                >
                    <Text>⬅</Text>
                </TouchableOpacity>
                
                <View style={styles.button_padding}/>

                <TouchableOpacity
                    style={styles.add_button}
                    onPress={()=>{
                        //setDate(date) //will the list rerender?
                        setAddItemVisible(true)
                    }}
                >
                    <Text>➕</Text>
                </TouchableOpacity>

                <View style={styles.button_padding}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        _date.setDate(_date.getDate()+1)
                        setDate(getDateID(_date))
                        updateObj(getDateID(_date));
                    }}
                >
                    <Text>➡</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    header:{
        flex: 1,
        padding: 16,
        flexDirection:"row",
        alignItems:"center"
    },
    body:{
        flex:12,
        flexDirection:"row"
    },
    footer:{
        flex: 1,
        flexDirection:"row",
    },
    button:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",

    },
    add_button:{
        flex:2,
        alignItems: "center",
        justifyContent:"center",

    },
    button_padding:{
        flex:3
    }
})

