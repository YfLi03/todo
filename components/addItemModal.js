import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

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
                <Text style={styles.modalText}>Hello World!</Text>
                <View style={styles.buttonView}>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>{
                      setVisible(!isVisible)
                      add("task","try",220520,30)
                    }}
                    >
                    <Text style={styles.textStyle}>Confirm</Text>
                    </Pressable>
                    <View style={styles.button_margin}/>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>{
                      setVisible(!isVisible)
                      add("appointment","tre",220520,10)
                    }}
                    >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
            </View>
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
      alignItems: "center",
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
    }
  });