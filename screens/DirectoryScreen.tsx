import React, { Component, EventHandler } from 'react'
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
    NativeEventSubscription,
} from 'react-native'

import { BackHandler } from 'react-native';

import { NavigationActions, FlatList } from 'react-navigation'


import styles from '../Styles.js';

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const DOMParser = require('react-native-html-parser').DOMParser;

type DirectoryProps = {
    navigation: any
}

type DirectoryState = {
    refreshing: boolean
    searchBar: string
    backLink: string
    fileLinks: any[]
    directoryLinks: any[]
}


export class Directory extends Component<DirectoryProps, DirectoryState> {

  private backHandler?: NativeEventSubscription
  private TimeOutTimer?: NodeJS.Timer
  private flatListRef?: any

  static navigationOptions = {
    header: null
  }
    constructor(props: any) {
        super(props);
        this.state = {
            refreshing: false,
            searchBar: "",
            backLink: "",
            fileLinks: [],
            directoryLinks: []
        }
    }

    /**
     * Tries to fetch the currently loaded file's directory listing
     */

    componentDidMount() {
        setTimeout(() => {AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => { this.XHR(String(ip), String(port), '/browser.html') }))
    }, 500)
       this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
      if (this.props.navigation.isFocused()) {
        this.goBack();
        return true;
      }
        return this.props.navigation.dispatch(NavigationActions.back())
      }

    playFileFromURL(ip: string, port: string, location: string) {
        fetch("http://" + ip + ":" + port + location)
    }

    /**
     * Used instead of fetch due to fetch's timeout being 100 seconds
     */

    XHR(ip: string, port: string, url: string) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            // If the request is succesful
            if (request.status === 200) {
                this.parseHTML(request.responseText)
            }
        };
        request.open('GET', 'http://' + ip + ":" + port + url);
        request.send();
        // 125ms timeout timer to stop requests from hanging too long
        this.TimeOutTimer = setTimeout(() => {
            if (request.readyState !== XMLHttpRequest.DONE) {
                request.abort();
            }
        }, 125);
    }

    /**
     * Called from App.js via reference
     */

    async goBack() {
        const keys = await AsyncStorage.multiGet(['IP', 'PORT'])
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => {
            this.XHR(String(ip), String(port), this.state.backLink)
        }))
    }

    /**
     * Parses the html to generate the directory listing
     */

    parseHTML(html: string) {
        this.setState({ refreshing: true });
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => AsyncStorage.getItem('EXTENSIONS').then((extensions) => {
            let doc = new DOMParser().parseFromString(html, 'text/html');
            // The document has two tables
            const tables = doc.getElementsByTagName('table');
            // The first table contains the current directory along with useless whitespace and html tags that are sliced out
            let currentDirectoryName = tables[0].getElementsByTagName('td')[0].textContent.slice(36)
            currentDirectoryName = currentDirectoryName.slice(0, -21)
            // The second table contains all the directory and file listings, searching for directories
            const directories = tables[1].getElementsByClassName('dirname');
            // The first table has a convenient link for going back in the directory structure
            const backLink = directories[0].getElementsByTagName('a')[0].getAttribute('href');
            this.setState({ backLink: backLink });
            this.setState({ searchBar: currentDirectoryName })
            const directoryLinks = [];
            // All the nodes containing links to directories are looped through and pushed to an array
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
                        <TouchableOpacity style={{ flexShrink: 1 }} onPress={() => this.XHR(String(ip), String(port), directoryLink)}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#fafafa', marginTop: 5, marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="folder-open" size={32} color={lightPrimaryColor} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
            this.setState({ directoryLinks: directoryLinks });
            const fileLinks = [];
            // The extensions are stored as a JSON array in AsyncStorage
            const fileExtensions = JSON.parse(String(extensions));
            // Finding all the nodes
            const filesAndDirectories = doc.getElementsByTagName('tr');
            // The first two nodes contain the current location and tooltips, ignoring
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
                            <TouchableOpacity style={{ flexShrink: 1 }} onPress={() => this.playFileFromURL(String(ip), String(port), fileLink)}>
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
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => { this.XHR(String(ip), String(port), '/browser.html') }))
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
                <View style={{ backgroundColor: primaryColor, height: 50, elevation: 5, borderBottomWidth: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 1 }}>
                        <TextInput style={{ marginLeft: 5 }} underlineColorAndroid="transparent" autoCorrect={false} value={this.state.searchBar} onChangeText={(text) => this.setState({ searchBar: text })} onEndEditing={() => {
                            AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(String(ip), String(port), "/browser.html?path=" + this.state.searchBar)))
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