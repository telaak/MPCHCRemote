import React, { Component } from 'react'
import Exponent from 'expo'
import {
    View,
    StatusBar,
    Dimensions,
    Text,
    Button,
    Slider,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
	RefreshControl
} from 'react-native'
import Swiper from 'react-native-swiper';


const DOMParser = require('react-native-html-parser').DOMParser;

const { width, height } = Dimensions.get('window');

const styles = {
    wrapper: {
        // backgroundColor: '#f00'
    },

    slide: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
		marginTop: Exponent.Constants.statusBarHeight
    },

    imgBackground: {
        width,
        height,
        backgroundColor: 'transparent',
        position: 'absolute'
    },

    image: {
        width,
        height,
    },

    text: {
        fontSize: 30,
        fontWeight: 'bold'
    }
};

const commands = {
    OpenFile: 800,
    OpenDVDBD: 801,
    OpenDevice: 802,
    ReopenFile: 976,
    MoveToRecycleBin: 24044,
    SaveCopy: 805,
    SaveImage: 806,
    SaveImageAuto: 807,
    SaveThumbnails: 808,
    LoadSubtitles: 809,
    SaveSubtitles: 810,
    DownloadSubtitles: 812,
    UploadSubtitles: 811,
    Close: 804,
    Properties: 814,
    Exit: 816,
    PlayPause: 889,
    Play: 887,
    Pause: 888,
    Stop: 890,
    FrameStep: 891,
    FrameStepBack: 892,
    GoTo: 893,
    IncreaseRate: 895,
    DecreaseRate: 894,
    ResetRate: 896,
    AudioDelayAdd10ms: 905,
    AudioDelaySubtract10ms: 906,
    JumpForwardSmall: 900,
    JumpBackwardSmall: 899,
    JumpForwardMedium: 902,
    JumpBackwardMedium: 901,
    JumpForwardLarge: 904,
    JumpBackwardLarge: 903,
    JumpForwardKeyframe: 898,
    JumpBackwardKeyframe: 897,
    JumpToBeginning: 996,
    RepeatForever: 33449,
    RepeatModeFile: 33450,
    RepeatModePlaylist: 33451,
    Next: 922,
    Previous: 921,
    NextFile: 920,
    PreviousFile: 919,
    TunerScan: 974,
    QuickAddFavourite: 975,
    ToggleCaptionMenu: 817,
    ToggleSeekBar: 818,
    ToggleControls: 819,
    ToggleInformation: 820,
    ToggleStatistics: 821,
    ToggleStatus: 822,
    ToggleSubresyncBar: 823,
    TogglePlaylistBar: 824,
    ToggleCaptureBar: 825,
    ToggleNavigationBar: 33415,
    ToggleDebugShaders: 826,
    ViewMinimal: 827,
    ViewCompact: 828,
    ViewNormal: 829,
    FullScreen: 830,
    FullScreenNoResChange: 831,
    Zoom50Percent: 832,
    Zoom100Percent: 833,
    Zoom200Percent: 834,
    ZoomAutoFit: 968,
    ZoomAutoFitLargerOnly: 4900,
    NextARPreset: 859,
    VidFrmHalf: 835,
    VidFrmNormal: 836,
    VidFrmDouble: 837,
    VidFrmStretch: 838,
    VidFrmInside: 839,
    VidFrmZoom1: 841,
    VidFrmZoom2: 842,
    VidFrmOutside: 840,
    VidFrmSwitchZoom: 843,
    AlwaysOnTop: 884,
    PnSReset: 861,
    PnSIncSize: 862,
    PnSIncWidth: 864,
    PnSIncHeight: 866,
    PnSDecSize: 863,
    PnSDecWidth: 865,
    PnSDecHeight: 867,
    PnSCentre: 876,
    PnSLeft: 868,
    PnSRight: 869,
    PnSUp: 870,
    PnSDown: 871,
    PnSUpLeft: 872,
    PnSUpRight: 873,
    PnSDownLeft: 874,
    PnSDownRight: 875,
    PnSRotateXIncrease: 877,
    PnSRotateXDecrease: 878,
    PnSRotateYIncrease: 879,
    PnSRotateYDecrease: 880,
    PnSRotateZIncrease: 881,
    PnSRotateZDecrease: 882,
    VolumeUp: 907,
    VolumeDown: 908,
    VolumeMute: 909,
    VolumeBoostIncrease: 970,
    VolumeBoostDecrease: 971,
    VolumeBoostMin: 972,
    VolumeBoostMax: 973,
    ToggleCustomChannelMapping: 993,
    ToggleNormalisation: 994,
    ToggleRegainVolume: 995,
    BrightnessIncrease: 984,
    BrightnessDecrease: 985,
    ContrastIncrease: 986,
    ContrastDecrease: 987,
    HueIncrease: 988,
    HueDecrease: 989,
    SaturationIncrease: 990,
    SaturationDecrease: 991,
    ResetColourSettings: 992,
    DVDTitleMenu: 923,
    DVDRootMenu: 924,
    DVDSubtitleMenu: 925,
    DVDAudioMenu: 926,
    DVDAngleMenu: 927,
    DVDChapterMenu: 928,
    DVDMenuLeft: 929,
    DVDMenuRight: 930,
    DVDMenuUp: 931,
    DVDMenuDown: 932,
    DVDMenuActivate: 933,
    DVDMenuBack: 934,
    DVDMenuLeave: 935,
    BossKey: 944,
    PlayerMenu: 949,
    PlayerMenuFull: 950,
    FiltersMenu: 951,
    Options: 815,
    NextAudioTrack: 952,
    PrevAudioTrack: 953,
    NextSubtitleTrack: 954,
    PrevSubtitleTrack: 955,
    OnOffSubtitle: 956,
    ReloadSubtitles: 2302,
    NextAngleDVD: 961,
    PrevAngleDVD: 962,
    NextAudioTrackDVD: 963,
    PrevAudioTrackDVD: 964,
    NextSubtitleTrackDVD: 965,
    PrevSubtitleTrackDVD: 966,
    OnOffSubtitleDVD: 967,
    TearingTest: 32769,
    OSDDisplayCurrentTime: 32778,
    OSDShowFileName: 32777,
    NextShaderPreset: 57382,
    PrevShaderPreset: 57384,
    ToggleDirect3DFullScreen: 32779,
    GoToPrevSubtitle: 32780,
    GoToNextSubtitle: 32781,
    ShiftSubtitleLeft: 32782,
    ShiftSubtitleRight: 32783,
    OSDDisplayRendererStatistics: 32784,
    OSDResetRendererStatistics: 32785,
    VSync: 33243,
    EnableFrameTimeCorrection: 33265,
    AccurateVSync: 33260,
    DecreaseVSyncOffset: 33246,
    IncreaseVSyncOffset: 33247,
    SubtitleDelayDecrease: 24000,
    SubtitleDelayIncrease: 24001,
    AfterPlaybackDoNothing: 948,
    AfterPlaybackPlayNextFileInTheFolder: 947,
    AfterPlaybackTurnOffTheMonitor: 918,
    AfterPlaybackExit: 912,
    AfterPlaybackStandBy: 913,
    AfterPlaybackHibernate: 914,
    AfterPlaybackShutdown: 915,
    AfterPlaybackLogOff: 916,
    AfterPlaybackLock: 917,
    ToggleEDLWindow: 846,
    EDLSetIn: 847,
    EDLSetOut: 848,
    EDLNewclip: 849,
    EDLSave: 860,
};

export class Remote extends Component {
    seeking: false;
    settingVolume: false;
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            filepatharg: "",
            filepath: "",
            filedirarg: "",
            filedir: "",
            state: 0,
            statestring: "",
            position: 0,
            positionstring: "",
            duration: 1,
            durationstring: "",
            volumelevel: 0,
            volumelevelclamped: 0,
            muted: 0,
            playbackrate: 1,
            size: "",
            reloadtime: 0,
            version: ""
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    XHR(ip,port) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                this.fetchInfo(ip,port)
            }
        };
        request.open('GET', 'http://' + ip  + ":" + port + "/variables.html");
        request.send();
        this.TimeOutTimer = setTimeout(() => {
            if (request.readyState !== XMLHttpRequest.DONE) {
                request.abort();
            }
        }, 125);
    }

    fetchInfo(ip,port) {
        fetch('http://' + ip + ':' + port + '/variables.html')
            .then((res) => res.text())
            .then((text)=>{
                let doc = new DOMParser().parseFromString(text,'text/html');
                this.setState({
                    file: doc.getElementById('file').textContent,
                    filepatharg: doc.getElementById('filepatharg').textContent,
                    filepath: doc.getElementById('filepath').textContent,
                    filedirarg: doc.getElementById('filedirarg').textContent,
                    filedir: doc.getElementById('filedir').textContent,
                    state: parseInt(doc.getElementById('state').textContent),
                    statestring: doc.getElementById('statestring').textContent,
                    // position: parseInt(doc.getElementById('position').textContent),
                    //positionstring: doc.getElementById('positionstring').textContent,
                    duration: parseFloat(doc.getElementById('duration').textContent),
                    durationstring: doc.getElementById('durationstring').textContent,
                    //volumelevel: parseInt(doc.getElementById('volumelevel').textContent),
                    muted: doc.getElementById('muted').textContent,
                    playbackrate: parseInt(doc.getElementById('playbackrate').textContent),
                    size: doc.getElementById('size').textContent,
                    reloadtime: parseInt(doc.getElementById('reloadtime').textContent),
                    version: doc.getElementById('version').textContent,
                    //snapshot: {uri: 'http://192.168.10.60:13579/snapshot.jpg?' + Math.random()}
                });
                if(!this.seeking) {
                    this.setState({position: parseInt(doc.getElementById('position').textContent)});
                    this.setState({positionstring: doc.getElementById('positionstring').textContent});
                }
                if(!this.settingVolume) {
                    this.setState({volumelevel: parseInt(doc.getElementById('volumelevel').textContent)});
                    this.setState({volumelevelclamped: this.state.volumelevel})
                }
            });
    }

    tick() {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip,port)))
    }

    HTTPPostRequest(command, extraName, extraValue) {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) =>
        fetch("http://" + ip +  ":" + port +"/command.html", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "wm_command=" + command + "&" + extraName + "=" + extraValue
        })))
    }

    convertMillisToTime(millis){
        let delim = ":";
        let hours = Math.floor(millis / (1000 * 60 * 60) % 60);
        let minutes = Math.floor(millis / (1000 * 60) % 60);
        let seconds = Math.floor(millis / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + delim + minutes + delim + seconds;
    }

    //<Image style={{width: "100%", height: "100%"}} source={this.state.snapshot}></Image>

    render() {
        return(
            <View style={{flex: 1}}>
              <View style={{flex: 1, backgroundColor: 'powderblue'}}>
                <View style={{flex: 1,backgroundColor: "powderblue"}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                      <ScrollView ref={(ref) => this.flatListRef = ref} horizontal={true} showsHorizontalScrollIndicator={false} /*onContentSizeChange={(width, height) => this.flatListRef.scrollToEnd({ animated: true })} */>
                          <Text style={styles.text}>{this.state.file}</Text>
                      </ScrollView>
                  </View>
                  <View style={{flex: 1}}>
                      <this.SeekBar/>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.text}>{this.state.positionstring} / {this.state.durationstring}</Text>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                </View>
              </View>
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'powderblue'}}>
                  <this.UIButton text={'⏯'} command={commands.PlayPause}/>
                  <this.UIButton text={'■'} command={commands.Stop}/>
                  <this.UIButton text={'Full Screen'} command={commands.FullScreen}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'powderblue'}}>
                  <View style={{flex: 5, }}>
                      <this.VolumeSlider/>
                  </View>
                  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>{this.state.volumelevelclamped}</Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'powderblue'}}>
                  <this.UIButton text={'⏮'} command={commands.Previous}/>
                  <this.UIButton text={'◀◀'} command={commands.DecreaseRate}/>
                  <this.UIButton text={'▶▶'} command={commands.IncreaseRate}/>
                  <this.UIButton text={'⏭'} command={commands.Next}/>
                </View>
              </View>
            </View>
        )
    }

    VolumeSlider = props => {
        return(<Slider style={{height: "100%"}}
                       value={this.state.volumelevel}
                       step={1}
                       maximumValue={100}
                       onValueChange={(value) => {
                           this.settingVolume = true;
                           clearTimeout(this.timeOutVolume);
                           this.setState({volumelevelclamped: value});
                           this.HTTPPostRequest("-2","volume",value)
                       }}
                       onSlidingComplete={(value) => {
                           clearTimeout(this.timeOutVolume);
                           this.setState({volumelevel: value});
                           this.timeOutVolume = setTimeout(() => this.settingVolume = false, 1250);}}/>)
    };

    SeekBar = props => {
        return(<Slider style={{height: "100%"}}
                       value={this.state.position}
                       maximumValue={this.state.duration}
                       onValueChange={(value) => {
                           this.seeking = true;
                           clearTimeout(this.timeOut);
                           this.setState({positionstring: this.convertMillisToTime(value)});
                           this.HTTPPostRequest("-1","position",this.convertMillisToTime(value));
                       }}
                       onSlidingComplete={(value) => {
                           clearTimeout(this.timeOut);
                           this.setState({position: value});
                           this.setState({positionstring: this.convertMillisToTime(value)});
                           this.timeOut = setTimeout(() => this.seeking = false, 1250);}}/>)
    };

    UIButton = props => {
        return(
            <TouchableOpacity style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#00BCD4',
                borderRadius:10,
                borderColor: '#fff',
                margin: 5
            }} onPress={() => this.HTTPPostRequest(props.command)}>
                <Text style={{
                    color:'#fff',
                }}>{props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "",
            port: "13579",
            extension: "mp4",
            extensions: ["mp4","mkv"]
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP').then((value) => this.setState({ 'ip': value }));
        AsyncStorage.getItem('PORT').then((value) => this.setState({ 'port': value }));
        AsyncStorage.getItem('EXTENSIONS').then((value) => {if(value == null){AsyncStorage.setItem('EXTENSIONS',JSON.stringify(this.state.extensions))}
        else {
            this.setState({extensions: JSON.parse(value)})
        }})
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'powderblue'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <TextInput
                      style={{height: 40}}
                      onChangeText={(text) =>  AsyncStorage.setItem('IP', text).then(this.setState({ip: text}))}
                      value={this.state.ip}/>
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                      style={{height: 40}}
                      onChangeText={(text) =>  AsyncStorage.setItem('PORT', text).then(this.setState({port: text}))}
                      value={this.state.port}/>
                </View>
              </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TextInput style={{height: 40}} value={this.state.extension} onChangeText={(text) => {this.setState({extension: text})}}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Button title={"Add extension"} onPress={() => {
                                AsyncStorage.getItem('EXTENSIONS').then((value) => {
                                    let parsedArray = JSON.parse(value);
                                    if(!parsedArray.includes(this.state.extension)) {
                                        parsedArray.push(this.state.extension);
                                        AsyncStorage.setItem('EXTENSIONS',JSON.stringify(parsedArray)).then(this.setState({extensions: parsedArray}))
                                    }
                                })
                            }}>
                            </Button>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList keyExtractor={(item,index) => index.toString()} extraData={this.state} data={this.state.extensions} renderItem={({item,index}) => <Button onPress={() =>{
                            let splicedArray = this.state.extensions;
                            splicedArray.splice(index,1);
                            this.setState({extensions: splicedArray});
                            AsyncStorage.setItem('EXTENSIONS',JSON.stringify(splicedArray))
                        }} title={item}/>}/>
                    </View>
                </View>
            </View>
        )
    }
}

export class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
			refreshing: false,
			currentDirectoryLink: "",
            searchBar: "",
            fileLinks: [],
            directoryLinks: [],
            currentDirectory: <Button title={'Connect'} onPress={() => {AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip,port,"/browser.html")))}}/>
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip,port,"/browser.html")))
    }

    playFileFromURL(ip, port, location) {
        fetch("http://" + ip +  ":" + port + location)
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
        request.open('GET', 'http://' + ip  + ":" + port + url);
        request.send();
        this.TimeOutTimer = setTimeout(() => {
            if (request.readyState !== XMLHttpRequest.DONE) {
                request.abort();
            }
        }, 125);
    }

    parseHTML(html) {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => AsyncStorage.getItem('EXTENSIONS').then((extensions) =>  {
            let doc = new DOMParser().parseFromString(html,'text/html');
            const tables = doc.getElementsByTagName('table');
            let currentDirectoryName = tables[0].getElementsByTagName('td')[0].textContent.slice(36)
			currentDirectoryName = currentDirectoryName.slice(0,-21)
            const directories = tables[1].getElementsByClassName('dirname');
            const backLink = directories[0].getElementsByTagName('a')[0].getAttribute('href');
            this.setState({currentDirectory: <Button title={".."} onPress={() => this.XHR(ip,port,backLink)}/>});
            this.setState({searchBar: currentDirectoryName})
            const directoryLinks = [];
            for(let i = 1; i < directories.length; i++) {
                let directoryName = directories[i].textContent;
                let directoryLink = directories[i].getElementsByTagName('a')[0].getAttribute('href');
                directoryLinks.push(<Button key={i} title={"/" + directoryName + "/"} onPress={() => this.XHR(ip,port,directoryLink)}/>)
            }
            this.setState({directoryLinks: directoryLinks});
            const fileLinks = [];
            const fileExtensions = JSON.parse(extensions);
            const filesAndDirectories = doc.getElementsByTagName('tr');
            for(let j = 2; j < filesAndDirectories.length; j++) {
                if (fileExtensions.includes(filesAndDirectories[j].getAttribute('class'))) {
                    let fileName = filesAndDirectories[j].getElementsByTagName('td')[0].textContent;
                    let fileLink = filesAndDirectories[j].getElementsByTagName('td')[0].getElementsByTagName('a')[0].getAttribute('href');
                    fileLinks.push(<Button key={j} title={fileName} onPress={() => this.playFileFromURL(ip, port, fileLink)}/>)
                }
            }
            this.setState({fileLinks: fileLinks})
        })))
    }
	
	_onRefresh() {
		this.setState({refreshing: true});
		this.XHR('192.168.10.60','13579','/browser.html?path=' + this.state.searchBar)
		this.setState({refreshing: false});
    }

    render() {
        return(
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#2196F3'}}>
                <View style={{flex: 0, backgroundColor: 'white'}}>
                    <TextInput underlineColorAndroid="transparent" autoCorrect={false} value={this.state.searchBar} onChangeText={(text) => this.setState({searchBar: text})} onEndEditing={() => {
                        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip,port,"/browser.html?path=" +this.state.searchBar)))}}/>
                </View>
                <View style={{flex: 0, flexShrink: 1, flexGrow: 1}}>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing}onRefresh={() => {this._onRefresh()}}/>}>
                        {this.state.currentDirectory}{this.state.directoryLinks}{this.state.fileLinks}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>

        )

    }
}

export default class extends Component {
    render () {
        return (
            <View style={styles.container}>
              <StatusBar barStyle='light-content' />
              <Swiper style={styles.wrapper}
                      dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                      activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                      paginationStyle={{
                          bottom: 20
                      }}
                      loop={false}>
                <View style={styles.slide}>
                  <Remote />
                </View>
                <View style={styles.slide}>
                  <Directory />
                </View>
                <View style={styles.slide}>
                  <Settings />
                </View>
              </Swiper>
            </View>
        )
    }
}