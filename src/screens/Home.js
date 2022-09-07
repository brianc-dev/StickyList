import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, Button, Image, StyleSheet, View, Text, Alert } from 'react-native';
import { getNotes, deleteNote } from '../db/database';
import { ListItem } from './components/Card';


const HomeScreen = ({ navigation, route }) => {

    const [notes, setNotes] = useState(getNotes()._array);

    useEffect(() => {
        if (route.params?.result) {
            setNotes(getNotes()._array);
        }
    }, [route.params?.result]);

    const renderItem = ({ item }) => (
        <ListItem title={item.title} content={item.content} onLongPress={() => { (onLongClickListener(item, setNotes)) ? this.forceUpdate() : 0 }} onClickListener={() => { onClickListener(navigation, item) }} />
    );

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.sectionTopBar} source={require('./../../resources/AppBar.png')} resizeMode="stretch">
                <Image style={styles.icon} />
                <Button title="Add new note" style={styles.button} onPress={() => {
                    navigation.navigate('CreateNote')
                }} />
            </ImageBackground>
            <FlatList contentContainerStyle={styles.contentContainer} centerContent={true} style={styles.list} data={notes} renderItem={renderItem} keyExtractor={item => item.id} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF9FC'
    },
    sectionTopBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 56,
        padding: 8,
        margin: 8,
    },
    button: {
        textAlign: 'center',

    },
    icon: {
        alignSelf: 'flex-start'
    },
    list: {
        flex: 1,
        backgroundColor: '#EAF9FC',
    },
    contentContainer: {
        justifyContent: 'center',
        alignContent: 'center',
    }
});

function onLongClickListener(note, setState = ([]) => { }) {
    Alert.alert("Delete note",
        "Would you like to delete this note?",
        [{ text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => onDeleteNote(note, setState), style: 'destructive' }],
        { cancelable: true });
}

function onClickListener(navigation, note) {
    navigation.navigate('Note', { name: note.title, id: note.id });
}

function onDeleteNote(note, setState = ([]) => { }) {
    let result = deleteNote(note);
    if (result.status) {
        return;
    }
    setState(getNotes()._array);
}

export default HomeScreen;