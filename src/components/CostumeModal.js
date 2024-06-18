import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native-web';

const CostumeModal = ({onModalVisible, offModalVisible, content, titleModal}) => {

    return (
        <Modal
                animationType={'fade'}
                onRequestClose={onModalVisible}
                visible={onModalVisible}
                transparent
        >
            <View style={styles.container}>
                <View style={styles.background}>
                    <View style={styles.mainModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, fontWeight: 700, color: '#A2A2A2' }}>{titleModal}</Text>
                            <TouchableOpacity onPress={offModalVisible}>
                                <Text style={{ fontSize: 18, fontWeight: 700, color: '#A2A2A2' }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {content}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CostumeModal


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    mainModal: {
        backgroundColor: '#F2F2F2',
        width: 500,
        height: 500,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        gap: 20
    },
    subModal: {
        backgroundColor: '#fff',
        height: 654,
        paddingHorizontal: 17,
        paddingVertical: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
})