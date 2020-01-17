import React, { Component } from 'react';
import {
  View,
  Text,
  Slider,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  ScrollView,
  Modal
} from 'react-native';

import styles from '../Styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { commands } from '../commands';
const DOMParser = require('react-native-html-parser').DOMParser;

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

type RemoteProps = {};

type RemoteState = {
  file: string;
  filepatharg: string;
  filepath: string;
  filedirarg: string;
  filedir: string;
  state: number;
  statestring: string;
  position: number;
  positionstring: string;
  duration: number;
  durationstring: string;
  volumelevel: number;
  volumelevelclamped: number;
  muted: number;
  playbackrate: number;
  size: string;
  reloadtime: number;
  version: string;
  subtitleModalVisible: boolean;
  audioModalVisible: boolean;
};

export class Remote extends Component<RemoteProps, RemoteState> {
  static navigationOptions = {
    header: null
  };
  private settingVolume = false;
  private timerID!: NodeJS.Timer;
  private timeOut!: NodeJS.Timer;
  private timeOutVolume!: NodeJS.Timer;
  private seeking = false;

  constructor(props: any) {
    super(props);
    this.state = {
      file: '',
      filepatharg: '',
      filepath: '',
      filedirarg: '',
      filedir: '',
      state: 0,
      statestring: '',
      position: 0,
      positionstring: '',
      duration: 1,
      durationstring: '',
      volumelevel: 0,
      volumelevelclamped: 0,
      muted: 0,
      playbackrate: 1,
      size: '',
      reloadtime: 0,
      version: '',
      subtitleModalVisible: false,
      audioModalVisible: false
    };
  }

  /**
   * Sets a one second looping timer to fetch data from the web interface
   */

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Used instead of fetch due to fetch's timeout being 100 seconds
   */

  XHR(ip: string, port: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = e => {
          if (request.readyState !== 4) {
            return;
          }
          // If the request is succesful
          if (request.status === 200) {
            resolve(request.responseText)
          }
        };
        request.open('GET', 'http://' + ip + ':' + port + '/variables.html');
        request.send();
        // 125ms timer to avoid fetch hanging forever
        setTimeout(() => {
          if (request.readyState !== XMLHttpRequest.DONE) {
            request.abort();
            reject()
          }
        }, 125);
    })

  }

  /**
   * Fetches variable data and parses it into states
   * Avoids setting states if currently using the seek or volume slider
   */

  async parseVariables(html: string): Promise<any> {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    this.setState({
      file: doc.getElementById('file').textContent,
      filepatharg: doc.getElementById('filepatharg').textContent,
      filepath: doc.getElementById('filepath').textContent,
      filedirarg: doc.getElementById('filedirarg').textContent,
      filedir: doc.getElementById('filedir').textContent,
      state: parseInt(doc.getElementById('state').textContent),
      statestring: doc.getElementById('statestring').textContent,
      position: parseInt(doc.getElementById('position').textContent),
      positionstring: doc.getElementById('positionstring').textContent,
      duration: parseFloat(doc.getElementById('duration').textContent),
      durationstring: doc.getElementById('durationstring').textContent,
      // volumelevel: parseInt(doc.getElementById('volumelevel').textContent),
      muted: doc.getElementById('muted').textContent,
      playbackrate: parseInt(doc.getElementById('playbackrate').textContent),
      size: doc.getElementById('size').textContent,
      reloadtime: parseInt(doc.getElementById('reloadtime').textContent),
      version: doc.getElementById('version').textContent
      // snapshot: {uri: 'http://192.168.10.60:13579/snapshot.jpg?' + Math.random()}
    });

    if (!this.settingVolume) {
      this.setState({
        volumelevel: parseInt(doc.getElementById('volumelevel').textContent),
        volumelevelclamped: this.state.volumelevel
      });
    }
  }

  /**
   * Called periodically
   */

  async tick() {
    if (!this.seeking) {
      this.seeking = true
      const ip = await AsyncStorage.getItem('IP')
      const port = await AsyncStorage.getItem('PORT')
      try {
        const variables = await this.XHR(String(ip), String(port))
        await this.parseVariables(variables)
        this.seeking = false
      } catch (error) {
        this.seeking = false
      }
    }
  }

  /**
   * Sends commands to the player
   */

  HTTPPostRequest(
    command: number,
    extraName = '',
    extraValue = ''
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('IP').then(ip =>
        AsyncStorage.getItem('PORT').then(port =>
          fetch('http://' + ip + ':' + port + '/command.html', {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'wm_command=' + command + '&' + extraName + '=' + extraValue
          })
            .then(() => resolve())
            .catch(error => reject())
        )
      );
    });
  }

  /**
   * Converts milliseconds to HH:MM:SS for both the position command and displaying values
   */

  convertMillisToTime(millis: number) {
    let delim = ':';
    let hours = Math.floor((millis / (1000 * 60 * 60)) % 60);
    let minutes = Math.floor((millis / (1000 * 60)) % 60);
    let seconds = Math.floor((millis / 1000) % 60);
    let hoursString = hours < 10 ? '0' + hours : hours;
    let minutesString = minutes < 10 ? '0' + minutes : minutes;
    let secondsString = seconds < 10 ? '0' + seconds : seconds;
    return [hoursString, minutesString, secondsString].join(delim);
  }

  render() {
    return (
      <View>
        <this.TitleBar />
        <this.NavigationBar />
        <this.CommandBar />
        <this.VolumeBar />
        <this.ExtraButtonBar />
        <this.SubtitleModal />
        <this.AudioModal />
      </View>
    );
  }

  ExtraButtonBar = (props: any) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 15, height: 40 }}>
        <TouchableOpacity
          style={styles.remoteNavigationBarButton}
          onPress={() => {
            this.setState({ subtitleModalVisible: true });
          }}
        >
          <View>
            <MaterialIcons name="subtitles" size={32} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.remoteNavigationBarButton}
          onPress={() => {
            this.setState({ audioModalVisible: true });
          }}
        >
          <View>
            <MaterialIcons name="audiotrack" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  TrackControls = (props: any) => {
    return (
      <View style={{ flexGrow: 1, flexDirection: 'row' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                this.HTTPPostRequest(commands.SubtitleDelayIncrease);
              }}
            >
              <MaterialCommunityIcons name="plus" size={48} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.HTTPPostRequest(commands.PrevSubtitleTrack);
                }}
              >
                <MaterialCommunityIcons
                  name="skip-previous"
                  size={48}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.HTTPPostRequest(commands.OnOffSubtitle);
                }}
              >
                <MaterialIcons name="subtitles" size={48} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.HTTPPostRequest(commands.NextSubtitleTrack);
                }}
              >
                <MaterialCommunityIcons
                  name="skip-next"
                  size={48}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.HTTPPostRequest(commands.SubtitleDelayDecrease);
              }}
            >
              <MaterialCommunityIcons name="minus" size={48} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                this.HTTPPostRequest(commands.AudioDelayAdd10ms);
              }}
            >
              <MaterialCommunityIcons name="plus" size={48} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.HTTPPostRequest(commands.PrevAudioTrack);
                }}
              >
                <MaterialCommunityIcons
                  name="skip-previous"
                  size={48}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.HTTPPostRequest(commands.VolumeMute);
                }}
              >
                <MaterialIcons name="audiotrack" size={48} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.HTTPPostRequest(commands.PrevAudioTrack);
                }}
              >
                <MaterialCommunityIcons
                  name="skip-next"
                  size={48}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.HTTPPostRequest(commands.AudioDelaySubtract10ms);
              }}
            >
              <MaterialCommunityIcons name="minus" size={48} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  NavigationBar = (props: any) => {
    return (
      <View style={{}}>
        <this.NavigationText />
        <this.SeekSlider />
        <this.NavigationButtonBar />
      </View>
    );
  };

  VolumeBar = (props: any) => {
    return (
      <View style={{ height: 50, flexDirection: 'row' }}>
        <View style={{ flex: 6 }}>
          <this.VolumeSlider />
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            borderRadius: 10,
            backgroundColor: '#5472d3'
          }}
          onPress={() => {
            this.HTTPPostRequest(commands.VolumeMute);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Octicons
              name={this.state.muted == 1 ? 'mute' : 'unmute'}
              size={32}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  NavigationButtonBar = (props: any) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.remoteNavigationBarButton}
          onPress={() => this.HTTPPostRequest(commands.JumpBackwardMedium)}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Entypo name="back" size={32} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.remoteNavigationBarButton}
          onPress={() => this.HTTPPostRequest(commands.JumpForwardMedium)}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Entypo name="forward" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  NavigationText = (props: any) => {
    return (
      <View style={{ height: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 30 }}>
          {this.state.positionstring} / {this.state.durationstring}
        </Text>
      </View>
    );
  };

  TitleBar = (props: any) => {
    return (
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: primaryColor,
          elevation: 5
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={
            false
          } /*onContentSizeChange={(width, height) => this.flatListRef.scrollToEnd({ animated: true })} */
        >
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 30,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              {this.state.file}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  CommandBar = (props: any) => {
    return (
      <View
        style={{
          width: '100%',
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 15,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={styles.remoteCommandBarButton}
          onPress={() => {
            this.HTTPPostRequest(commands.Play);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="play" size={32} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.remoteCommandBarButton}
          onPress={() => {
            this.HTTPPostRequest(commands.Pause);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="pause" size={32} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.remoteCommandBarButton}
          onPress={() => {
            this.HTTPPostRequest(commands.Stop);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="stop" size={32} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.remoteCommandBarButton}
          onPress={() => {
            this.HTTPPostRequest(commands.FullScreen);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Entypo name="resize-full-screen" size={32} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.remoteCommandBarButton}
          onPress={() => {
            this.HTTPPostRequest(commands.Previous);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="skip-previous"
              size={32}
              color="white"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.remoteCommandBarButton}
          onPress={() => {
            this.HTTPPostRequest(commands.Next);
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="skip-next" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  AudioModal = (props: any) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.audioModalVisible}
        onRequestClose={() => {
          this.setState({ audioModalVisible: false });
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ audioModalVisible: false });
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  width: 300,
                  height: 165,
                  backgroundColor: backgroundColor,
                  borderWidth: 1,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    backgroundColor: primaryColor,
                    borderBottomWidth: 1,
                    elevation: 5
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 30,
                      color: 'white'
                    }}
                  >
                    Audio options
                  </Text>
                </View>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.AudioDelaySubtract10ms);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="minus"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>

                    <View style={{ margin: 5 }}>
                      <MaterialCommunityIcons
                        name="timer"
                        size={48}
                        color="#0d47a1"
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.AudioDelayAdd10ms);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="plus"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.PrevAudioTrack);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="skip-previous"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={{ margin: 5 }}>
                      <MaterialIcons
                        name="audiotrack"
                        size={48}
                        color="#0d47a1"
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.NextAudioTrack);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="skip-next"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  SubtitleModal = (props: any) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.subtitleModalVisible}
        onRequestClose={() => {
          this.setState({ subtitleModalVisible: false });
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ subtitleModalVisible: false });
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  width: 300,
                  height: 165,
                  backgroundColor: backgroundColor,
                  borderWidth: 1,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    backgroundColor: primaryColor,
                    borderBottomWidth: 1,
                    elevation: 5
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 30,
                      color: 'white'
                    }}
                  >
                    Subtitle options
                  </Text>
                </View>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.SubtitleDelayDecrease);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="minus"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={{ margin: 5 }}>
                      <MaterialCommunityIcons
                        name="timer"
                        size={48}
                        color="#0d47a1"
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.SubtitleDelayIncrease);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="plus"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.PrevSubtitleTrack);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="skip-previous"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={{ margin: 5 }}>
                      <MaterialIcons
                        name="subtitles"
                        size={48}
                        color="#0d47a1"
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        elevation: 2,
                        backgroundColor: '#5472d3',
                        borderRadius: 10,
                        margin: 5
                      }}
                      onPress={() => {
                        this.HTTPPostRequest(commands.NextSubtitleTrack);
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="skip-forward"
                          size={48}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  VolumeSlider = (props: any) => {
    return (
      <Slider
        style={{ height: '100%' }}
        value={this.state.volumelevel}
        step={1}
        maximumValue={100}
        thumbTintColor={primaryColor}
        minimumTrackTintColor={lightPrimaryColor}
        onValueChange={value => {
          this.settingVolume = true;
          clearTimeout(this.timeOutVolume);
          this.setState({ volumelevelclamped: value });
          this.HTTPPostRequest(-2, 'volume', String(value));
        }}
        onSlidingComplete={value => {
          clearTimeout(this.timeOutVolume);
          this.setState({ volumelevel: value });
          this.timeOutVolume = setTimeout(
            () => (this.settingVolume = false),
            1250
          );
        }}
      />
    );
  };

  SeekSlider = (props: any) => {
    return (
      <View style={{ height: 70 }}>
        <Slider
          style={{ height: '100%' }}
          value={this.state.position}
          maximumValue={this.state.duration}
          thumbTintColor={primaryColor}
          minimumTrackTintColor={lightPrimaryColor}
          onValueChange={(value) => {
            this.seeking = true;
            clearTimeout(this.timeOut);
            this.setState({ positionstring: this.convertMillisToTime(value) }, () => {
                this.HTTPPostRequest(-1, "position", this.convertMillisToTime(value));
            });
        }}
        onSlidingComplete={(value) => {
            clearTimeout(this.timeOut);
            this.setState({ position: value, positionstring: this.convertMillisToTime(value) });
            this.timeOut = setTimeout(() => this.seeking = false, 1250);
        }}
        />
      </View>
    );
  };
}

export default Remote;
