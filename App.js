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
                    dot={<View style={{ backgroundColor: 'transparent', width: "33%", height: 5}} />}
                    activeDot={<View style={{ backgroundColor: 'grey', width: "33%", height: 5}} />}
                    paginationStyle={{
                        bottom: 0
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