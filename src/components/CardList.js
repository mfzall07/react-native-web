import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native-web';

const CardList = ({ title, description, timestamp, status, onDelete, onEdit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, status === 'COMPLETE' && styles.completedTitle]}>{title}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onDelete}>
                        <Text style={styles.buttonTextDelete}>D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onEdit}>
                        <Text style={styles.buttonTextEdit}>E</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.description} numberOfLines={1}>- {description}</Text>
            <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
        </View>
    )
}

export default CardList

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: '700',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: '#F7F7F7',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#C2C2C2'
    },
    buttonTextDelete: {
        color: 'red',
        fontWeight: '700',
        fontSize: 14,
    },
    buttonTextEdit: {
        color: 'cyan',
        fontWeight: '700',
        fontSize: 14,
    },
    description: {
        color: '#D2D2D2',
        fontWeight: '500',
        fontSize: 12,
    },
    timestampContainer: {
        borderWidth: 0.5,
        width: 50,
        borderRadius: 5,
        borderColor: '#D2D2D2',
    },
    timestamp: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#A2A2A2',
        fontSize: 12,
    },
})
