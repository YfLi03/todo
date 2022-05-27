import React,{useState} from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import ChooseType from "./type";
import Length from "./length";

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


export default function addItemModal(isVisible, setVisible, add){
    const [name,setName] = useState('');
    const [itemType,setItemType] = useState('task');
    const [itemDate,setItemDate] = useState(new Date()) //is set to current date by default
    const [show,setShow] = useState(false);
    const [itemLength, setLength] = useState(30)
    const onChange = (event, selectedDate) =>{
      setItemDate(selectedDate);
      setShow(false);
    }
    const showDatepicker = () =>{
      setShow(true);
    }
    console.log(itemType)
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setVisible(!isVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput
                placeholder="new item"
                onChangeText={text=>setName(text)}
                defaultValue={name}
                /> 

                {ChooseType(itemType, setItemType)}

                <Button onPress={showDatepicker}
                title={itemDate.toLocaleDateString()}
                />

                {Length(itemLength,setLength)}

                <View style={styles.buttonView}>

                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>{
                      setVisible(!isVisible)
                      setShow(false)
                    }}
                    >
                    <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>

                    <View style={styles.button_margin}/>

                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>{
                      setVisible(!isVisible)
                      setShow(false)
                      console.log(itemDate)
                      date = (itemDate.getFullYear()%100)*10000+(itemDate.getMonth()+1)*100+itemDate.getDate();
                      add(itemType,name,date,itemLength)
                    }}
                    >
                    <Text style={styles.textStyle}>Confirm</Text>
                    </Pressable>

                </View>
            </View>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={itemDate}
                mode={'date'}
                display={"inline"}
                is24Hour={true}
                onChange={onChange}
              />
            )}

        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      flex:5,
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    button_margin:{
      flex:1,
    },
    buttonView: {
      flexDirection: "row"
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    selectedType:{
      color:"#39c5bb"
    },
    unselectedType:{
      color:"#39c5bb"
    }
  });