import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default ({ prepTime, cookTime }) => {

    return (
        <View style={styles.recipeTime}>
            <View style={{ ...styles.time, ...styles.timeTop }}>
                <Image style={styles.iconClock} source={require('../../../assets/clock.png')} />
                <Text style={styles.timeValue}>{' Prep ' + prepTime + 'm'}</Text>


            </View>

            <View style={styles.time}>
                <Image style={styles.iconPot} source={require('../../../assets/pot.png')} />
                <Text style={styles.timeValue}>{'Cook ' + cookTime + 'm'}</Text>
            </View>


        </View>
    )

}