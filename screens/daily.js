import List from '../components/list.js'
import React,{useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

function dateToNum (date){
    return (date.getFullYear()%100)*10000+date.getMonth()*100+date.getDate();
}

export default function DailyScreen (props){
    const[_date,setDate] = useState(Number(props.date))
    date = new Date(_date/10000+2000, (_date/100)%100, _date%100)
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>
                    {date.getMonth()+'/'+date.getDate()}
                </Text>
            </View>
            <View style={styles.body}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        date.setDate(date.getDate()-1)
                        setDate(dateToNum(date))
                    }}
                >
                    <Text>⬅</Text>
                </TouchableOpacity>

                <List style={styles.list} date={_date}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        date.setDate(date.getDate()+1)
                        setDate(dateToNum(date))
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
    body:{
        flex:6,
        flexDirection:"row"
    },
    button:{
        flex:1,
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

