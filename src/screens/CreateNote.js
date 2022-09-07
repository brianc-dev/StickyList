import React from 'react';
import { TextInput, ImageBackground, FlatList, Button, Image, StyleSheet, View, Text } from 'react-native';
import { insertNote } from '../db/database';

const CreateNoteScreen = ({ navigation }) => {

    const [title, onChangeTitle] = React.useState('');
    const [content, onChangeContent] = React.useState('');

    return (
        <View style={styles.container}>
            <TextInput style={styles.titleTextInput} placeholder='Title' value={title} onChangeText={onChangeTitle} maxLength={50} />
            <TextInput style={styles.contentTextInput} placeholder='Write your content here' value={content} onChangeText={onChangeContent} multiline={true} />
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end', padding: 8 }}>

                <Button style={styles.button} title='Cancel' onPress={() => navigation.goBack()} />
                <Button style={styles.button} title='Save' onPress={() => saveNoteListener(title, content, navigation)} />

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

function saveNoteListener(title, content, navigation) {
    let result = insertNote({ title, content });
    result.then((result) => {
        if (result.status) {
            return;
        }
        navigation.navigate({ name: 'Home', params: { result: result }, merge: true });
    })
};

export default CreateNoteScreen;