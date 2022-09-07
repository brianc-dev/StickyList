import React, { useLayoutEffect } from 'react';
import { ImageBackground, FlatList, Button, Image, StyleSheet, View, Text } from 'react-native';
import { getNote } from '../db/database';

const NoteScreen = ({ navigation, route }) => {

    
    let note = getNote(route.params.id);
    
    let title = note.title;
    let content = note.content;
    let noteId = note.id;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title='Edit' onPress={ () => navigation.navigate('EditNote', { note: {id: noteId, title: title, content: content}}) }/>
            ),
        })
    }, [navigation, note, route]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{ title }</Text>
            <Text style={styles.contentText}>{ content }</Text>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        titleText: {
            height: 60,
            textAlignVertical: 'center',
            textAlign: 'left'
        },
        contentText: {
            height: 60
        },
        container: {
            flex: 1,
        }
    }
)

export default NoteScreen;