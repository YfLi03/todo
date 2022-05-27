import React from "react"
import { StyleSheet, Button, View } from "react-native"

export default function ChooseType(itemType, setItemType){
    return(
        <View style={styles.chooseType}>
            <Button
            title="Appointment"
            color = {itemType=="appointment"? "#007AFF" : "#39C5BB"}
            onPress={()=>setItemType("appointment")}
            />
            <Button
            title="Task"
            color = {itemType=="task"? "#007AFF" : "#39C5BB"}
            onPress={()=>setItemType("task")}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    chooseType:{
        flexDirection:"row",
    },
})