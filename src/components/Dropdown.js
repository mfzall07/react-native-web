import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native-web';

const DropdownInput = ({ title, value, onSelectStatus }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const data = [
        { label: 'TODO', value: 'TODO' },
        { label: 'PROGRESS', value: 'PROGRESS' },
        { label: 'COMPLETE', value: 'COMPLETE' },
    ];

    const handleSelect = (selectedValue) => {
        setSelectedValue(selectedValue);
        onSelectStatus(selectedValue);
        setIsOpen(false);
    };

    return (
        <View style={{ flexDirection: 'column', gap: 10 }}>
            {title && <Text style={styles.text}>{title}</Text>}
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.dropdownText}>
                    {selectedValue || value || 'Select Status'}
                </Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.dropdown}>
                    {data.map((item) => (
                        <TouchableOpacity key={item.value} style={styles.dropdownItem} onPress={() => handleSelect(item.value)} >
                            <Text>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontWeight: 500,
        color: '#737373',
    },
    dropdownText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#A8A8A8',
        borderRadius: 6,
        borderWidth: 0.7,
        borderColor: '#CACACA',
        paddingHorizontal: 16,
        height: 44,
        lineHeight: 44,
        outline: 'none',
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        borderWidth: 0.7,
        borderColor: '#CACACA',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        zIndex: 10,
    },
    dropdownItem: {
        paddingVertical: 8,
    },
});

export default DropdownInput;
