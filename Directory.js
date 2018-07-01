import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    ScrollView,
    KeyboardAvoidingView,
    RefreshControl,
} from 'react-native'

import styles from './Styles.js';

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const DOMParser = require('react-native-html-parser').DOMParser;


export class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            searchBar: "",
            backLink: "",
            fileLinks: [],
            directoryLinks: [],
            currentDirectory: <Button title={'Connect'} onPress={() => { AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip, port, "/browser.html"))) }} />
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip, port, "/browser.html")))
    }

    playFileFromURL(ip, port, location) {
        fetch("http://" + ip + ":" + port + location)
    }

    XHR(ip, port, url) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                this.parseHTML(request.responseText)
            }
        };
        request.open('GET', 'http://' + ip + ":" + port + url);
        request.send();
        this.TimeOutTimer = setTimeout(() => {
            if (request.readyState !== XMLHttpRequest.DONE) {
                request.abort();
            }
        }, 125);
    }

    goBack() {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => {
            this.XHR(ip, port, this.state.backLink)
        }))
    }

    parseHTML(html) {
        this.setState({ refreshing: true });
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => AsyncStorage.getItem('EXTENSIONS').then((extensions) => {
            let doc = new DOMParser().parseFromString(html, 'text/html');
            const tables = doc.getElementsByTagName('table');
            let currentDirectoryName = tables[0].getElementsByTagName('td')[0].textContent.slice(36)
            currentDirectoryName = currentDirectoryName.slice(0, -21)
            const directories = tables[1].getElementsByClassName('dirname');
            const backLink = directories[0].getElementsByTagName('a')[0].getAttribute('href');
            this.setState({ backLink: backLink });
            this.setState({ currentDirectory: <Button title={".."} onPress={() => this.XHR(ip, port, backLink)} /> });
            this.setState({ searchBar: currentDirectoryName })
            const directoryLinks = [];
            for (let i = 1; i < directories.length; i++) {
                let directoryName = directories[i].textContent;
                let directoryLink = directories[i].getElementsByTagName('a')[0].getAttribute('href');
                directoryLinks.push(
                    <View key={i} style={{ flexDirection: 'row', height: 50, marginLeft: 5, marginRight: 5, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#0000001F' }}>
                        <View style={{ marginLeft: 5, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ color: '#000000B3', fontWeight: 'bold' }}>
                                {directoryName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flexShrink: 1 }} onPress={() => this.XHR(ip, port, directoryLink)}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#fafafa', marginTop: 5, marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="folder-open" size={32} color={lightPrimaryColor} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
            this.setState({ directoryLinks: directoryLinks });
            const fileLinks = [];
            const fileExtensions = JSON.parse(extensions);
            const filesAndDirectories = doc.getElementsByTagName('tr');
            for (let j = 2; j < filesAndDirectories.length; j++) {
                if (fileExtensions.includes(filesAndDirectories[j].getAttribute('class'))) {
                    let fileName = filesAndDirectories[j].getElementsByTagName('td')[0].textContent;
                    let fileLink = filesAndDirectories[j].getElementsByTagName('td')[0].getElementsByTagName('a')[0].getAttribute('href');
                    fileLinks.push(
                        <View key={j} style={{ flexDirection: 'row', height: 50, marginLeft: 5, marginRight: 5, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#0000001F' }}>
                            <View style={{ marginLeft: 5, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={{ color: '#000000B3', fontWeight: 'bold' }}>
                                    {fileName}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ flexShrink: 1 }} onPress={() => this.playFileFromURL(ip, port, fileLink)}>
                                <View style={{ width: 40, height: 40, backgroundColor: backgroundColor, marginTop: 5, marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 20, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="play-circle" size={32} color={lightPrimaryColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
            this.setState({ fileLinks: fileLinks }, this.flatListRef.scrollTo({ x: 0, y: 0, animated: false }))
            this.setState({ refreshing: false });
        })))
    }

    _onRefresh() {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => { this.XHR(ip, port, '/browser.html?path=' + this.state.searchBar) }))
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
                <View style={{ backgroundColor: primaryColor, height: 50, elevation: 5, borderBottomWidth: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 1 }}>
                        <TextInput style={{ marginLeft: 5 }} underlineColorAndroid="transparent" autoCorrect={false} value={this.state.searchBar} onChangeText={(text) => this.setState({ searchBar: text })} onEndEditing={() => {
                            AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip, port, "/browser.html?path=" + this.state.searchBar)))
                        }} />
                    </View>
                </View>
                <View style={{ flex: 0, flexShrink: 1, flexGrow: 1 }}>
                    <ScrollView ref={(ref) => this.flatListRef = ref} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => { this._onRefresh() }} />}>
                        {this.state.directoryLinks}{this.state.fileLinks}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default Directory;