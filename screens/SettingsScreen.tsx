import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  FlatList
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../Styles';

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

type SettingsProps = {};

type SettingsState = {
  ip: string;
  port: string;
  extension: string;
  extensions: string[];
};

export class Settings extends Component<SettingsProps, SettingsState> {
  static navigationOptions = {
    header: null
  };
  constructor(props: any) {
    super(props);
    this.state = {
      ip: '',
      port: '13579',
      extension: 'mp4',
      extensions: ['mp4', 'mkv']
    };
  }

  /**
   * Fetches the keys from AsyncStorage and saves the extension list if running for the first time
   */

  componentDidMount() {
    AsyncStorage.getItem('IP').then(value =>
      this.setState({ ip: String(value) })
    );
    AsyncStorage.getItem('PORT').then(value =>
      this.setState({ port: String(value) })
    );
    AsyncStorage.getItem('EXTENSIONS').then(value => {
      if (value == null) {
        AsyncStorage.setItem(
          'EXTENSIONS',
          JSON.stringify(this.state.extensions)
        );
      } else {
        this.setState({ extensions: JSON.parse(value) });
      }
    });
  }

  removeExtension(extension: string) {
    this.setState(
      (prevState: SettingsState, props: SettingsProps) => {
        return {
          extensions: prevState.extensions.filter(e => e !== extension)
        };
      },
      () => {
        AsyncStorage.setItem(
          'EXTENSIONS',
          JSON.stringify(this.state.extensions)
        );
      }
    );
  }

  addFileExtension() {
    this.setState(
      (prevState: SettingsState, props: SettingsProps) => {
        return {
          extensions: [...prevState.extensions, this.state.extension]
        };
      },
      () => {
        AsyncStorage.setItem(
          'EXTENSIONS',
          JSON.stringify(this.state.extensions)
        );
      }
    );
  }

  fileExtensionAddRow = (props: any) => {
    return (
      <View style={styles.fileExtensionAddRowContainer}>
        <View style={styles.fileExtensionAddRowTextContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={{ paddingLeft: 5 }}
            value={this.state.extension}
            onChangeText={text => {
              this.setState({ extension: text });
            }}
          />
        </View>
        <this.fileExtensionAddButton />
      </View>
    );
  };

  fileExtensionAddButton = (props: any) => {
    return (
      <TouchableOpacity
        style={{ flexShrink: 1 }}
        onPress={() => this.addFileExtension()}
      >
        <View style={styles.addFileExtensionButton}>
          <MaterialCommunityIcons
            name="playlist-plus"
            size={32}
            color="white"
          />
        </View>
      </TouchableOpacity>
    );
  };

  fileExtensionList = (props: any) => {
    return (
      <View style={{ flexShrink: 1, backgroundColor: backgroundColor }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          data={this.state.extensions.sort()}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.fileExtensionRowContainer}>
              <View style={styles.fileExtensionTextContainer}>
                <Text style={styles.fileExtensionText}>{item}</Text>
              </View>
              <TouchableOpacity
                style={{ flexShrink: 1 }}
                onPress={() => this.removeExtension(item)}
              >
                <View style={styles.removeFileExtensionButton}>
                  <MaterialCommunityIcons
                    name="playlist-remove"
                    size={32}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };

  IPAddressTextInput = (props: any) => {
    return (
      <View style={styles.settingsTextContainer}>
        <TextInput
          placeholder={'IP address'}
          underlineColorAndroid="transparent"
          style={{ marginLeft: 5 }}
          onChangeText={text =>
            AsyncStorage.setItem('IP', text).then(() =>
              this.setState({ ip: text })
            )
          }
          value={this.state.ip}
        />
      </View>
    );
  };

  PortTextInput = (props: any) => {
    return (
      <View style={styles.settingsTextContainer}>
        <TextInput
          placeholder={'port'}
          underlineColorAndroid="transparent"
          style={{ marginLeft: 5 }}
          onChangeText={text =>
            AsyncStorage.setItem('PORT', text).then(() =>
              this.setState({ port: text })
            )
          }
          value={this.state.port}
        />
      </View>
    );
  };

  SettingsRow = (props: any) => {
    return (
      <View style={styles.settingsContainer}>
        <this.IPAddressTextInput />
        <this.PortTextInput />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <this.SettingsRow/>
        <this.fileExtensionAddRow />
        <this.fileExtensionList />
      </View>
    );
  }
}

export default Settings;
