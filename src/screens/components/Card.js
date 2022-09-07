import React, { Component } from 'react';
import { TouchableOpacity, ImageBackground, FlatList, Button, Image, StyleSheet, View, Text } from 'react-native';

export const ListItem = ({ title, content, onClickListener = () => {}, onLongPress = () => {}}) => (
    <TouchableOpacity style={ styles.card } onLongPress={ onLongPress } onPress= { onClickListener }>
        <ImageBackground borderRadius={ 8 } style={ styles.card } source={ require('../../../resources/Card.png')}>
            <Text>{ title }</Text>
            <Text ellipsizeMode='tail' lineBreakMode='tail' numberOfLines={ 1 }>{ content }</Text>
        </ImageBackground>
    </TouchableOpacity>
);

export const Card = () => (
    <ImageBackground style={{ height: window.innerHeight, width: window.innerWidth }} borderRadius={ 8 } source={ require('../../../resources/Card.png')}/>
);

export const TouchableCard = ({onClickListener = () => {}, onLongPress = () => {}}) => (
    <TouchableOpacity style={ styles.touchableCard } onLongPress={ onLongPress } onPress= { onClickListener }>
    <Card/>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 8,
        height: 65,
        marginVertical: 8,
        marginHorizontal: 8,
        textAlign: 'center',
        alignContent: 'center'
    },
    touchableCard: {
        height: window.innerHeight,
        width: window.innerWidth
    },
    content: {
        
    }
});