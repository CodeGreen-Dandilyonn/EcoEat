import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';

export default ({ instructions }) => {

    // some responses split instructions by 26 spaces, others by /n
    let instrArray = [];
    if (instructions.indexOf('                          ') == -1) {
        instrArray = instructions.split('\n');
    } else {
        instrArray = instructions.split('                          ');
    }

    const instructionParagraphs = instrArray.map((paragraph, index) => {
        return (
            <Text key={index} style={styles.instructionText}>{paragraph}</Text>
        )
    });

    return (
        <View style={styles.instructions}>
            {instructionParagraphs}
        </View>
    )
}