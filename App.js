import React, { Component } from 'react'
import {
    View,
    Image,
    StatusBar,
    Dimensions,
    Text,
    Button,
    Slider,
    WebView,
    TouchableOpacity,
    TextInput,
    AsyncStorage
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
}

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
}

export class Remote extends Component {
    seeking: false;
    constructor(props) {
        super(props);
        this.state = {
            ip: "0",
            port: "13579",
            snapshot: {uri: 'http://192.168.10.60:13579/snapshot.jpg?' + Math.random()},
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
        AsyncStorage.getItem('IP').then((value) => this.setState({ 'ip': value }))
        AsyncStorage.getItem('PORT').then((value) => this.setState({ 'port': value }))
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 150, 'Request timed out');
        });
        const request = fetch('http://' + this.state.ip + ':' + this.state.port);
        return Promise
            .race([timeout, request])
            .then(response => this.parseInfo())
            .catch(error => console.log('Timeout'));
    }

    fetchInfo() {
        return fetch('http://' + this.state.ip + ':' + this.state.port + '/variables.html')
            .then((res) => res.text())
            .then((text)=>{
                return text
            });
    }

    parseInfo() {
        let doc;
        this.fetchInfo().then(function(info) {
            doc = new DOMParser().parseFromString(info,'text/html')
        }).then(setStates => {
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
        }).then(checkIfSeeking => {
            if(!this.seeking) {
                this.setState({position: parseInt(doc.getElementById('position').textContent)})
                this.setState({positionstring: doc.getElementById('positionstring').textContent})
                this.setState({volumelevel: parseInt(doc.getElementById('volumelevel').textContent)})
                this.setState({volumelevelclamped: this.state.volumelevel})
            }
        });
    }

    tick() {
        AsyncStorage.getItem('IP').then((value) => this.setState({ 'ip': value }))
        AsyncStorage.getItem('PORT').then((value) => this.setState({ 'port': value }))
        this.isAvailable();
    }

    HTTPPostRequest(command, extraName, extraValue) {
        fetch("http://" + this.state.ip +  ":" + this.state.port +"/command.html", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "wm_command=" + command + "&" + extraName + "=" + extraValue
        })
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
              <View style={{flex: 1, backgroundColor: 'green'}}>
                <View style={{flex: 1,backgroundColor: "yellow"}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>{this.state.file}</Text>
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
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
                  <this.UIButton text={'Play'} command={commands.Play}/>
                  <this.UIButton text={'Pause'} command={commands.Pause}/>
                  <this.UIButton text={'Stop'} command={commands.Stop}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'powderblue'}}>
                  <View style={{flex: 5, }}>
                      <this.VolumeSlider/>
                  </View>
                  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>{this.state.volumelevelclamped}</Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'steelblue'}}>
                  <this.UIButton text={'⏮'} command={commands.Previous}/>
                  <this.UIButton text={'◀'} command={commands.DecreaseRate}/>
                  <this.UIButton text={'▶'} command={commands.IncreaseRate}/>
                  <this.UIButton text={'⏭'} command={commands.Next}/>
                </View>
              </View>
            </View>
        )
    }

    VolumeSlider = (props) => {
        return(<Slider style={{height: "100%"}}
                       value={this.state.volumelevel}
                       step={1}
                       maximumValue={100}
                       onValueChange={(value) => {
                           this.seeking = true;
                           clearTimeout(this.timeOut)
                           this.setState({volumelevelclamped: value})
                           this.HTTPPostRequest("-2","volume",value)
                       }}
                       onSlidingComplete={(value) => {
                           clearTimeout(this.timeOut)
                           this.setState({volumelevel: value})
                           this.timeOut = setTimeout(() => this.seeking = false, 1250);}}/>)
    }

    SeekBar = () => {
        return(<Slider style={{height: "100%"}}
                       value={this.state.position}
                       maximumValue={this.state.duration}
                       onValueChange={(value) => {
                           this.seeking = true;
                           clearTimeout(this.timeOut)
                           this.setState({positionstring: this.convertMillisToTime(value)});
                           this.HTTPPostRequest("-1","position",this.convertMillisToTime(value));
                       }}
                       onSlidingComplete={(value) => {
                           clearTimeout(this.timeOut)
                           this.setState({position: value});
                           this.setState({positionstring: this.convertMillisToTime(value)});
                           this.timeOut = setTimeout(() => this.seeking = false, 1250);}}/>)
    }

    UIButton = (props) => {
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
        super(props)
        this.state = {
            ip: "",
            port: "13579"
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP').then((value) => this.setState({ 'ip': value }))
        AsyncStorage.getItem('PORT').then((value) => this.setState({ 'port': value }))
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'powderblue'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
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
            </View>
        )
    }
}

export class Directory extends Component {
    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'steelblue'}}></View>
        )

    }
}

export default class extends Component {
    render () {
        return (
            <View style={styles.container}>
              <StatusBar barStyle='light-content' />
              <Image
                  source={require('./img/bg.jpg')}
                  style={styles.imgBackground}
              />
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