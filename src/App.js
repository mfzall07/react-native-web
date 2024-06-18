import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native-web';
import CardList from './components/CardList';
import CostumeModal from './components/CostumeModal';
import Input from './components/Input';
import { FaFilter } from "react-icons/fa";
import DropdownInput from './components/Dropdown';

const App = () => {
    const txns = useMemo(
        () => [
            {
                id: 1,
                title: "Complete Website Redesign",
                description: "Redesign the entire website layout and user interface for better usability and modern look.",
                status: "TODO",
                timestamp: "2024-06-10 08:00",
            },
            {
                id: 2,
                title: "Implement User Authentication",
                description: "Integrate user authentication system using OAuth for secure login and registration.",
                status: "PROGRESS",
                timestamp: "2024-06-11 09:00",
            },
            {
                id: 3,
                title: "Optimize Database Queries",
                description: "Optimize database queries to improve overall application performance and reduce latency.",
                status: "COMPLETE",
                timestamp: "2024-06-12 10:00",
            },
            {
                id: 4,
                title: "Add Payment Gateway Integration",
                description: "Integrate a payment gateway to enable online payments and transactions for users.",
                status: "TODO",
                timestamp: "2024-06-13 11:00",
            },
            {
                id: 5,
                title: "Enhance Mobile Responsiveness",
                description: "Enhance the mobile responsiveness of the website for better user experience on mobile devices.",
                status: "PROGRESS",
                timestamp: "2024-06-14 12:00",
            },
            {
                id: 6,
                title: "Implement Dashboard Analytics",
                description: "Implement a dashboard with analytics features to track user activities and generate reports.",
                status: "COMPLETE",
                timestamp: "2024-06-15 13:00",
            },
            {
                id: 7,
                title: "Refactor Codebase Structure",
                description: "Refactor the codebase structure for better organization and maintainability.",
                status: "TODO",
                timestamp: "2024-06-16 14:00",
            },
            {
                id: 8,
                title: "Integrate Email Notification System",
                description: "Integrate an email notification system for sending automated notifications to users.",
                status: "PROGRESS",
                timestamp: "2024-06-17 15:00",
            },
            {
                id: 9,
                title: "Implement User Permissions",
                description: "Implement user permissions and roles management for controlling access to different features.",
                status: "COMPLETE",
                timestamp: "2024-06-18 16:00",
            },
            {
                id: 10,
                title: "Update UI Components Library",
                description: "Update UI components library to the latest version for compatibility and new features.",
                status: "TODO",
                timestamp: "2024-06-19 17:00",
            }
        ],
        []
    );

    const [tasks, setTasks] = useState(txns);
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [complete, setComplete] = useState([]);

    const [search, setSearch] = useState('')
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [onModalVisible, setOnModalVisible] = useState(false);
    const [onModalVisibleEdit, setOnModalVisibleEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [status, setStatus] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');

    const handleStatusSelection = (selectedStatus) => {
        setStatus(selectedStatus);
    };

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

    const handleSearch = (value) => {
        setSearch(value);
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTasks(filtered);
        if (value === '') {
            setFilteredTasks([]);
        }
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        sortTasksByTimestamp(newOrder);
    };

    const sortTasksByTimestamp = (order) => {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (order === 'asc') {
                return new Date(a.timestamp) - new Date(b.timestamp);
            } else {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
        });
        setTasks(sortedTasks);
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
                titleModal={'Create Task'}
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
                        <DropdownInput
                            title="Select Status" 
                            onSelectStatus={handleStatusSelection} 
                        />
                        <Input
                            title={'Timestamp'}
                            placeholder={'Input Timestamp'}
                            value={timestamp}
                            onChangeText={(value) => setTimestamp(value)}
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
                titleModal={'Edit Task'}
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
                        <DropdownInput
                            title="Select Status" 
                            onSelectStatus={handleStatusSelection} 
                            value={status}
                        />
                        <Input
                            title={'Timestamp'}
                            placeholder={'Input Timestamp'}
                            value={timestamp}
                            onChangeText={(value) => setTimestamp(value)}
                            editable={true}
                        />
                        <TouchableOpacity onPress={handleEditTask} style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <View style={styles.header}>
                <View style={{ flex: 0.35 }}>
                    <Input
                        placeholder={'Search'}
                        value={search}
                        onChangeText={(value) => handleSearch(value)}
                        editable={true}
                    />
                </View>
                <TouchableOpacity onPress={() => setOnModalVisible(!onModalVisible)} style={styles.buttonHeader}>
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSortOrder} style={styles.buttonHeaderFilter}>
                    <FaFilter style={{ color: 'white' }}/>
                    <Text style={styles.buttonText}>Filter By Timestamp</Text>
                </TouchableOpacity>
            </View>

            {filteredTasks.map((data, index) => (
                <View style={styles.containerCards}>
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

            {/* Main */}
            <View style={styles.mainContainer}>
                {/* To Do */}
                <View style={styles.columnContainer}>
                    <View style={styles.header1}>
                        <Text style={styles.headerText}>TO DO ({todo.length})</Text>
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
        zIndex: -1,
    },
    buttonHeader: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: 'cyan',
        borderRadius: 10,
    },
    buttonHeaderFilter: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: 'cyan',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 25,
        gap: 10
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
        borderColor: 'orange',
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
    containerCards: {
        width: '33%',
        paddingVertical: 5,
        paddingHorizontal: 25
    },
    containerCard: {
        width: '100%',
        paddingVertical: 5,
    },
});
