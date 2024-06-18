import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native-web';
import CardList from './components/CardList';
import CostumeModal from './components/CostumeModal';
import Input from './components/Input';

const App = () => {
    const txns = useMemo(
        () => [
            {
                id: 1,
                title: 'Title A',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'TODO',
                timestamp: '21:30',
            },
            {
                id: 2,
                title: 'Title B',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'COMPLETE',
                timestamp: '21:30',
            },
            {
                id: 3,
                title: 'Title C',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'TODO',
                timestamp: '21:30',
            },
            {
                id: 4,
                title: 'Title D',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'PROGRESS',
                timestamp: '21:30',
            },
            {
                id: 5,
                title: 'Title E',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'PROGRESS',
                timestamp: '21:30',
            },
            {
                id: 6,
                title: 'Title F',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'COMPLETE',
                timestamp: '21:30',
            },
            {
                id: 7,
                title: 'Title G',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                status: 'TODO',
                timestamp: '21:30',
            },
        ],
        []
    );

    const [tasks, setTasks] = useState(txns);
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [complete, setComplete] = useState([]);

    const [onModalVisible, setOnModalVisible] = useState(false);
    const [onModalVisibleEdit, setOnModalVisibleEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [status, setStatus] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    const createTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            status: status.toUpperCase(),
            timestamp,
        };

        setTasks([...tasks, newTask]);

        setTitle('');
        setDescription('');
        setStatus('');
        setTimestamp('');
        setOnModalVisible(false);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const updateTask = (taskId, newData) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, ...newData };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleEditTask = () => {
        const newData = {
            title,
            description,
            status: status.toUpperCase(),
            timestamp,
        };
        updateTask(editTaskId, newData);

        setTitle('');
        setDescription('');
        setStatus('');
        setTimestamp('');
        setEditTaskId(null);
        setOnModalVisibleEdit(false);
    };

    const handleOpenEditModal = (task) => {
        setEditTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setTimestamp(task.timestamp);
        setStatus(task.status);
        setOnModalVisibleEdit(true);
    };

    useEffect(() => {
        setComplete(tasks.filter(txn => txn.status === 'COMPLETE'));
        setProgress(tasks.filter(txn => txn.status === 'PROGRESS'));
        setTodo(tasks.filter(txn => txn.status === 'TODO'));
    }, [tasks]);

    return (
        <View style={styles.container}>
            {/* Modal */}
            <CostumeModal
                onModalVisible={onModalVisible}
                offModalVisible={() => setOnModalVisible(!onModalVisible)}
                titleModal={'Create Data'}
                content={
                    <View style={styles.modalContent}>
                        <Input
                            title={'Title'}
                            placeholder={'Input Title'}
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                            editable={true}
                        />
                        <Input
                            title={'Description'}
                            placeholder={'Input Description'}
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                            editable={true}
                        />
                        <Input
                            title={'Timestamp'}
                            placeholder={'Input Timestamp'}
                            value={timestamp}
                            onChangeText={(value) => setTimestamp(value)}
                            editable={true}
                        />
                        <Input
                            title={'Status'}
                            placeholder={'Input Status'}
                            value={status}
                            onChangeText={(value) => setStatus(value)}
                            editable={true}
                        />
                        <TouchableOpacity onPress={createTask} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <CostumeModal
                onModalVisible={onModalVisibleEdit}
                offModalVisible={() => setOnModalVisibleEdit(!onModalVisibleEdit)}
                titleModal={'Edit Data'}
                content={
                    <View style={styles.modalContent}>
                        <Input
                            title={'Title'}
                            placeholder={'Input Title'}
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                            editable={true}
                        />
                        <Input
                            title={'Description'}
                            placeholder={'Input Description'}
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                            editable={true}
                        />
                        <Input
                            title={'Timestamp'}
                            placeholder={'Input Timestamp'}
                            value={timestamp}
                            onChangeText={(value) => setTimestamp(value)}
                            editable={true}
                        />
                        <Input
                            title={'Status'}
                            placeholder={'Input Status'}
                            value={status}
                            onChangeText={(value) => setStatus(value)}
                            editable={true}
                        />
                        <TouchableOpacity onPress={handleEditTask} style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            {/* Main */}
            <View style={styles.mainContainer}>
                {/* To Do */}
                <View style={styles.columnContainer}>
                    <View style={styles.header1}>
                        <Text style={styles.headerText}>TO DO ({todo.length})</Text>
                        <TouchableOpacity onPress={() => setOnModalVisible(!onModalVisible)} style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {todo.map((data, index) => (
                        <View style={styles.containerCard}>
                            <CardList
                                key={index}
                                title={data.title}
                                description={data.description}
                                timestamp={data.timestamp}
                                status={data.status}
                                onDelete={() => deleteTask(data.id)}
                                onEdit={() => handleOpenEditModal(data)}
                            />
                        </View>
                    ))}
                </View>
                {/* In Progress */}
                <View style={styles.columnContainer}>
                    <View style={styles.header2}>
                        <Text style={styles.headerText}>IN PROGRESS ({progress.length})</Text>
                        {/* <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity> */}
                    </View>
                    {progress.map((data, index) => (
                        <View style={styles.containerCard}>
                            <CardList
                                key={index}
                                title={data.title}
                                description={data.description}
                                timestamp={data.timestamp}
                                status={data.status}
                                onDelete={() => deleteTask(data.id)}
                                onEdit={() => handleOpenEditModal(data)}
                            />
                        </View>
                    ))}
                </View>
                {/* Complete */}
                <View style={styles.columnContainer}>
                    <View style={styles.header3}>
                        <Text style={styles.headerText}>COMPLETE ({complete.length})</Text>
                        {/* <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity> */}
                    </View>
                    {complete.map((data, index) => (
                        <View style={styles.containerCard}>
                            <CardList
                                key={index}
                                title={data.title}
                                description={data.description}
                                timestamp={data.timestamp}
                                status={data.status}
                                onDelete={() => deleteTask(data.id)}
                                onEdit={() => handleOpenEditModal(data)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        height: '100vh',
    },
    modalContent: {
        flexDirection: 'column',
        gap: 15,
    },
    button: {
        paddingVertical: 10,
        backgroundColor: 'cyan',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    mainContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    columnContainer: {
        width: 'auto',
    },
    header1: {
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderColor: 'cyan',
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header2: {
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderColor: 'yellow',
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header3: {
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderColor: 'green',
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: '600',
        fontSize: 12,
    },
    addButton: {
        backgroundColor: '#F7F7F7',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#C2C2C2',
    },
    addButtonText: {
        color: 'green',
        fontWeight: '700',
        fontSize: 14,
    },
    containerCard: {
        width: '100%',
        paddingVertical: 5,
    },
});
