import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default ({ readyInMin, pricePerServing }) => {

    return (
        <View style={styles.recipeTime}>
            <View style={{ ...styles.time, ...styles.timeTop }}>
                <Image style={styles.iconClock} source={require('../../../assets/clock.png')} />
                <Text style={styles.timeValue}>{' Ready in ' + readyInMin + 'm'}</Text>


            </View>

            <View style={styles.time}>
                <Image style={styles.iconPrice} source={require('../../../assets/price.png')} />
                <Text style={styles.timeValue}>{' $' + pricePerServing + ' per serving'}</Text>
            </View>


        </View>
    )

}