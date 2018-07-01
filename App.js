import React, { Component } from 'react'
import Exponent from 'expo'
import {
    View,
    StatusBar,
    BackHandler,
} from 'react-native'

import Swiper from 'react-native-swiper';

import styles from './Styles.js';

import Remote from './Remote.js';

import Settings from './Settings.js';

import Directory from './Directory.js';





export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screen: 0
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.screen == 1) {
                this.refs.directory.goBack()
                return true;
            }
            return false;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: Exponent.Constants.statusBarHeight, backgroundColor: '#0d47a1' }}></View>
                <StatusBar barStyle='light-content' />
                <Swiper style={styles.wrapper}
                    dot={<View style={{ backgroundColor: 'rgb(255,255,255)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7, borderRadius: 6.5, borderWidth: 1 }} />}
                    activeDot={<View style={{ backgroundColor: '#0d47a1', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7, borderRadius: 6.5, borderWidth: 1 }} />}
                    paginationStyle={{
                        bottom: 20
                    }}
                    loop={false}
                    onIndexChanged={(index) => { this.setState({ screen: index }) }}>
                    <View style={styles.slide}>
                        <Remote />
                    </View>
                    <View style={styles.slide}>
                        <Directory ref='directory' />
                    </View>
                    <View style={styles.slide}>
                        <Settings />
                    </View>
                </Swiper>
            </View>
        )
    }
}