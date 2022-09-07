import React, { useLayoutEffect } from 'react';
import { ImageBackground, FlatList, Button, Image, StyleSheet, View, TextInput } from 'react-native';
import { updateNote } from '../db/database';

const EditNoteScreen = ({ navigation, route }) => {

    const note = route.params.note;

    const [title, onChangeTitle] = React.useState(note.title);
    const [content, onChangeContent] = React.useState(note.content);

    return (
        <View style={styles.container}>
            <TextInput style={styles.titleTextInput} placeholder='Title' value={title} onChangeText={onChangeTitle} maxLength={50} />
            <TextInput style={styles.contentTextInput} placeholder='Write your content here' value={content} onChangeText={onChangeContent} multiline={true} />
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end', padding: 8 }}>

                <Button style={styles.button} title='Cancel' onPress={() => navigation.goBack()} />
                <Button style={styles.button} title='Save' onPress={() => updateNoteListener(navigation, { id: note.id, title: title, content: content })} />

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleTextInput: {
        textAlignVertical: 'center',
        textAlign: 'left'
    },
    contentTextInput: {
        textAlign: 'left',
        textAlignVertical: 'top',
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    button: {
        margin: 16,
        flex: 2
    }
});

function updateNoteListener(navigation, note) {
    let result = updateNote(note);
    result.then((result) => {
        if (result.status) {
            return;
        }
        navigation.navigate({ name: 'Note', params: { name: note.title, id: note.id } });
    })
};

export default EditNoteScreen;