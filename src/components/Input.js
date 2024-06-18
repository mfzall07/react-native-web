import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native-web'

const Input = ({ title, placeholder, value, onChangeText, editable, keyboardType }) => {
    return (
        <View style={{ flexDirection: 'col', gap: 10 }}>
            <Text style={styles.text}>{title}</Text>
            <TextInput placeholder={placeholder} placeholderTextColor={'#A8A8A8'} keyboardType={keyboardType} style={editable === false ? styles.inputDisable : styles.textinput} value={value} onChangeText={onChangeText} editable={editable}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textinput: {
        fontSize: 12,
        fontWeight: 500,
        color: '#000000',
        borderRadius: 6,
        borderWidth: 0.7,
        borderColor: '#CACACA',
        paddingHorizontal: 16,
        height: 44,
        outline: 'none'
    },
    inputDisable: {
        borderRadius: 6, 
        borderColor: '#CACACA', 
        backgroundColor: '#CACACA',
        paddingHorizontal: 16, 
        height: 44, 
        borderWidth: 1, 
        fontFamily: 'BeVietnamPro-Medium', 
        color: '#737373', 
        fontSize: 11
    },
    text: {
        fontSize: 12,
        fontWeight: 500,
        color: '#737373', 
    },
})

export default Input
