import List from '../components/list.js'
import addItemModal from '../components/addItemModal.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

function dateToNum (_date){
    return (_date.getFullYear()%100)*10000+_date.getMonth()*100+_date.getDate();
}

class dailyData{
    constructor(date){
      this.date = date
      this.count = 0
      this.data = new Array()
    }
}

class Item{
    constructor(type, name, date, cnt, length = 0){
      this.type = type;
      this.name = name;
      this.date = date;     //string
      this.state = "unfinished";
      this.id = cnt;
      this.length = length
    }
  }
  

export default function DailyScreen (props){
    const[date,setDate] = useState(Number(props.date))
    const[addItemVisible, setAddItemVisible] = useState(false)
    const[obj, setObj] = useState(new dailyData(222222))

    //it's unnecessary to make 'states' a rn-state obj
    //actually it's unnecessary to process it in this function
    states = new Array()
    for(i=0; i<obj.data.length; i++)
        states[i] = (newDateObj.data[i].state =="unfinished"||newDateObj.data[i].state =="finishing") ? false : true
    //states decide it's location on the list

    //must be called when setDate is called
    //update obj and states(if Necessary) at the same time 
    
    //need some amendments, when there's no update of info, asyncstorage is
    //very inefficient!
    function updateObj(_date = date){
        console.log("updateObjWith"+String(_date))
        AsyncStorage.getItem(String(_date)).then(jsonValue =>{
            if(jsonValue == null){
                newDateObj = new dailyData(_date)
                jsonValue = JSON.stringify(newDateObj)
                AsyncStorage.setItem(String(_date),jsonValue).then(()=>{
                    setObj(newDateObj)
                })
            }else{
                newDateObj = JSON.parse(jsonValue)
                setObj(newDateObj)
            }
            console.log("updatedObjWith"+String(_date))
        })
    }

    function add(type, name, __date, length){
        AsyncStorage.getItem(String(__date)).then(jsonValue =>{
            if(jsonValue == null){
                newDateObj = new dailyData(__date)
                
            }else{
                newDateObj = JSON.parse(jsonValue)
            }
            console.log(newDateObj)
            newDateObj.data[newDateObj.count] = new Item(type,name,String(__date),newDateObj.count,length)
            newDateObj.count++; 
            jsonValue = JSON.stringify(newDateObj)
            AsyncStorage.setItem(String(__date),jsonValue).then(()=>{
                updateObj()
            })
            console.log("addedItem")
        })
    }



    if(obj.date==222222)updateObj();
    _date = new Date(date/10000+2000, (date/100)%100, date%100)

    const closeAddItem =(visible, add)=>{
        setAddItemVisible(visible)
    }

    return(
        <View style={styles.container}>
            {addItemModal(addItemVisible,closeAddItem,add)}

            <View style={styles.header}>
                <Text style={styles.titleText}>
                    {_date.getMonth()+'/'+_date.getDate()}
                </Text>
            </View>
            <View style={styles.body}>

                <List style={styles.list} updateObj={updateObj} states={states} obj={obj}/>

            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        _date.setDate(_date.getDate()-1)
                        setDate(dateToNum(_date))
                        updateObj(dateToNum(_date));
                        //setState is Async and doesn't support promise/callback
                    }}
                >
                    <Text>⬅</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.add_button}
                    onPress={()=>{
                        //setDate(date) //will the list rerender?
                        setAddItemVisible(true)
                    }}
                >
                    <Text>➕</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        _date.setDate(_date.getDate()+1)
                        setDate(dateToNum(_date))
                        updateObj(dateToNum(_date));
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
    header:{
        flex: 1,
        padding: 16,
        flexDirection:"row",
        alignItems:"center"
    },
    footer:{
        flex: 1,
        flexDirection:"row",
    },
    body:{
        flex:6,
        flexDirection:"row"
    },
    button:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",

    },
    add_button:{
        flex:6,
        alignItems: "center",
        justifyContent:"center",

    },
    list:{
        flex: 10,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    }
})

