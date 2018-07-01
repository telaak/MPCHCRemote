import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    FlatList,
} from 'react-native'


import { MaterialCommunityIcons } from '@expo/vector-icons';

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "",
            port: "13579",
            extension: "mp4",
            extensions: ["mp4", "mkv"]
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP').then((value) => this.setState({ 'ip': value }));
        AsyncStorage.getItem('PORT').then((value) => this.setState({ 'port': value }));
        AsyncStorage.getItem('EXTENSIONS').then((value) => {
            if (value == null) { AsyncStorage.setItem('EXTENSIONS', JSON.stringify(this.state.extensions)) }
            else {
                this.setState({ extensions: JSON.parse(value) })
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>
                <View style={{ backgroundColor: primaryColor, borderBottomWidth: 1, elevation: 5 }}>
                    <View style={{ flexDirection: 'row', height: 49 }}>
                        <View style={{ flex: 1, margin: 10, backgroundColor: 'white', elevation: 5, borderRadius: 10, borderWidth: 1, justifyContent: 'center' }}>
                            <TextInput
                                placeholder={'IP address'}
                                underlineColorAndroid="transparent"
                                style={{ marginLeft: 5 }}
                                onChangeText={(text) => AsyncStorage.setItem('IP', text).then(this.setState({ ip: text }))}
                                value={this.state.ip} />
                        </View>
                        <View style={{ flex: 1, margin: 10, backgroundColor: 'white', elevation: 5, borderRadius: 10, borderWidth: 1, justifyContent: 'center' }}>
                            <TextInput
                                placeholder={'port'}
                                underlineColorAndroid="transparent"
                                style={{ marginLeft: 5 }}
                                onChangeText={(text) => AsyncStorage.setItem('PORT', text).then(this.setState({ port: text }))}
                                value={this.state.port} />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', height: 50, paddingLeft: 5, paddingRight: 5, backgroundColor: '#f0f0f0', borderBottomWidth: 1, elevation: 3 }}>
                    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 5, marginBottom: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 1, justifyContent: 'center' }}>
                        <TextInput underlineColorAndroid="transparent" style={{ paddingLeft: 5 }} value={this.state.extension} onChangeText={(text) => { this.setState({ extension: text }) }} />
                    </View>
                    <TouchableOpacity style={{ flexShrink: 1 }} onPress={() => {
                        AsyncStorage.getItem('EXTENSIONS').then((value) => {
                            let parsedArray = JSON.parse(value);
                            if (!parsedArray.includes(this.state.extension)) {
                                parsedArray.push(this.state.extension);
                                AsyncStorage.setItem('EXTENSIONS', JSON.stringify(parsedArray)).then(this.setState({ extensions: parsedArray }))
                            }
                        })
                    }}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'green', marginTop: 5, marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="playlist-plus" size={32} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>



                <View style={{ flexShrink: 1, backgroundColor: backgroundColor }}>
                    <FlatList keyExtractor={(item, index) => index.toString()} extraData={this.state} data={this.state.extensions.sort()} renderItem={({ item, index }) =>
                        <View key={index} style={{ flexDirection: 'row', height: 50, marginLeft: 5, marginRight: 5, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#0000001F' }}>
                            <View style={{ marginLeft: 5, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={{ color: '#000000B3', fontWeight: 'bold' }}>
                                    {item}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ flexShrink: 1 }} onPress={() => {
                                let splicedArray = this.state.extensions;
                                splicedArray.splice(index, 1);
                                this.setState({ extensions: splicedArray }, () => AsyncStorage.setItem('EXTENSIONS', JSON.stringify(splicedArray)));
                            }}>
                                <View style={{ width: 40, height: 40, backgroundColor: 'red', marginTop: 5, marginLeft: 5, marginRight: 5, elevation: 5, borderRadius: 10, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="playlist-remove" size={32} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    } />
                </View>



            </View>
        )
    }
}

export default Settings;