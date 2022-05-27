import React from "react"
import { StyleSheet, Button, View, TextInput } from "react-native"

export default function Length(itemLength, setLength){
    return(
        <View style={styles.view}>
            <Button style={styles.button}
            title="➖"
            onPress={()=>setLength(Number(itemLength)-5)}
            />

            <TextInput style={styles.input}
            placeholder="length"
            defaultValue={String(itemLength)}
            keyboardType="number-pad"   //problem: no confirm button on ios
            onChangeText={text=>setLength(text)}
            />

            <Button style={styles.button}
            title="➕"
            onPress={()=>setLength(Number(itemLength)+5)}
            />

            <View style={styles.pad}/>
      </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flexDirection:"row",
    },
    button:{
        flex:1,
    },
    input:{
        textAlign:"center",
        fontSize:20,
        flex:2,
        justifyContent:"center"
    },
    pad:{
        flex:3,
    }
})