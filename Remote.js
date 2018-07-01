import React, { Component } from 'react'
import {
    View,
    Text,
    Slider,
    TouchableOpacity,
    TouchableWithoutFeedback,
    AsyncStorage,
    ScrollView,
    Modal
} from 'react-native'

import styles from './Styles.js';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const DOMParser = require('react-native-html-parser').DOMParser;

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

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
    seeking = false;
    settingVolume = false;
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
            version: "",
            subtitleModalVisible: false,
            audioModalVisible: false
        }
    }

    /**
     * Sets a one second looping timer to fetch data from the web interface
     */

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    /**
     * Used instead of fetch due to fetch's timeout being 100 seconds
     */

    XHR(ip, port) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            // If the request is succesful
            if (request.status === 200) {
                this.fetchInfo(ip, port)
            }
        };
        request.open('GET', 'http://' + ip + ":" + port + "/variables.html");
        request.send();
        // 125ms timer to avoid fetch hanging forever
        this.TimeOutTimer = setTimeout(() => {
            if (request.readyState !== XMLHttpRequest.DONE) {
                request.abort();
            }
        }, 125);
    }

    /**
     * Fetches variable data and parses it into states
     * Avoids setting states if currently using the seek or volume slider
     */

    fetchInfo(ip, port) {
        fetch('http://' + ip + ':' + port + '/variables.html')
            .then((res) => res.text())
            .then((text) => {
                let doc = new DOMParser().parseFromString(text, 'text/html');
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
                if (!this.seeking) {
                    this.setState({ position: parseInt(doc.getElementById('position').textContent) });
                    this.setState({ positionstring: doc.getElementById('positionstring').textContent });
                }
                if (!this.settingVolume) {
                    this.setState({ volumelevel: parseInt(doc.getElementById('volumelevel').textContent) });
                    this.setState({ volumelevelclamped: this.state.volumelevel })
                }
            });
    }

    /**
     * Called periodically
     */

    tick() {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) => this.XHR(ip, port)))
    }

    /**
     * Sends commands to the player
     */

    HTTPPostRequest(command, extraName, extraValue) {
        AsyncStorage.getItem('IP').then((ip) => AsyncStorage.getItem('PORT').then((port) =>
            fetch("http://" + ip + ":" + port + "/command.html", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: "wm_command=" + command + "&" + extraName + "=" + extraValue
            })))
    }

    /**
     * Converts milliseconds to HH:MM:SS for both the position command and displaying values
     */

    convertMillisToTime(millis) {
        let delim = ":";
        let hours = Math.floor(millis / (1000 * 60 * 60) % 60);
        let minutes = Math.floor(millis / (1000 * 60) % 60);
        let seconds = Math.floor(millis / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + delim + minutes + delim + seconds;
    }

    render() {
        return (

            <View style={styles.remoteBackground}>

                <this.TitleBar />
                <this.NavigationBar />
                <this.CommandBar />
                <this.VolumeBar />
                <this.ExtraButtonBar />
                <this.SubtitleModal />
                <this.AudioModal />

            </View>
        )
    }

    ExtraButtonBar = props => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 15, height: 40 }} >
                <TouchableOpacity style={styles.remoteNavigationBarButton} onPress={() => { this.setState({ subtitleModalVisible: true }) }} >
                    <View>
                        <MaterialIcons name="subtitles" size={32} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.remoteNavigationBarButton} onPress={() => { this.setState({ audioModalVisible: true }) }} >
                    <View>
                        <MaterialIcons name="audiotrack" size={32} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    TrackControls = props => {
        return (
            <View style={{ flexGrow: 1, flexDirection: 'row' }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <View>
                        <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.SubtitleDelayIncrease) }}>
                            <MaterialCommunityIcons name="plus" size={48} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View>
                            <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.PrevSubtitleTrack) }}>
                                <MaterialCommunityIcons name="skip-previous" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.OnOffSubtitle) }}>
                                <MaterialIcons name="subtitles" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.NextSubtitleTrack) }}>
                                <MaterialCommunityIcons name="skip-next" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.SubtitleDelayDecrease) }}>
                            <MaterialCommunityIcons name="minus" size={48} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <View>
                        <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.AudioDelayAdd10ms) }}>
                            <MaterialCommunityIcons name="plus" size={48} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View>
                            <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.PrevAudioTrack) }}>
                                <MaterialCommunityIcons name="skip-previous" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.VolumeMute) }}>
                                <MaterialIcons name="audiotrack" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.PrevAudioTrack) }}>
                                <MaterialCommunityIcons name="skip-next" size={48} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => { this.HTTPPostRequest(commands.AudioDelaySubtract10ms) }}>
                            <MaterialCommunityIcons name="minus" size={48} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    NavigationBar = props => {
        return (
            <View style={{}}>
                <this.NavigationText />
                <this.SeekSlider />
                <this.NavigationButtonBar />
            </View>
        )
    }

    VolumeBar = props => {
        return (
            <View style={{ height: 50, flexDirection: 'row' }}>
                <View style={{ flex: 6 }}>
                    <this.VolumeSlider />
                </View>
                <TouchableOpacity style={{ flex: 1, marginRight: 10, marginTop: 5, marginBottom: 5, justifyContent: 'center', alignItems: 'center', elevation: 2, borderRadius: 10, backgroundColor: '#5472d3' }} onPress={() => { this.HTTPPostRequest(commands.VolumeMute) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Octicons name={this.state.muted == 1 ? "mute" : "unmute"} size={32} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    NavigationButtonBar = props => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.remoteNavigationBarButton}
                    onPress={() => {
                        let position = this.state.position - 10000 <= 0 ? 0 : this.state.position - 10000; this.HTTPPostRequest('-1', 'position', this.convertMillisToTime(position)); this.setState({ position: position, positionstring: this.convertMillisToTime(position) });
                        clearTimeout(this.timeOut)
                        this.timeOut = setTimeout(() => this.seeking = false, 1250);
                    }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Entypo name="back" size={32} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.remoteNavigationBarButton}
                    onPress={() => {
                        let position = this.state.position + 10000 >= this.state.duration ? this.state.duration : this.state.position + 10000; this.HTTPPostRequest('-1', 'position', this.convertMillisToTime(position)); this.setState({ position: position, positionstring: this.convertMillisToTime(position) });
                        clearTimeout(this.timeOut)
                        this.timeOut = setTimeout(() => this.seeking = false, 1250);
                    }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Entypo name="forward" size={32} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    NavigationText = props => {
        return (
            <View style={{ height: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>{this.state.positionstring} / {this.state.durationstring}</Text>
            </View>
        )
    }

    TitleBar = props => {
        return (
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: primaryColor, elevation: 5 }}>
                <ScrollView ref={(ref) => this.flatListRef = ref} horizontal={true} showsHorizontalScrollIndicator={false} /*onContentSizeChange={(width, height) => this.flatListRef.scrollToEnd({ animated: true })} */>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{this.state.file}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    CommandBar = props => {
        return (
            <View style={{ width: "100%", flexWrap: 'wrap', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.remoteCommandBarButton} onPress={() => { this.HTTPPostRequest(commands.Play) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="play" size={32} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.remoteCommandBarButton} onPress={() => { this.HTTPPostRequest(commands.Pause) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="pause" size={32} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.remoteCommandBarButton} onPress={() => { this.HTTPPostRequest(commands.Stop) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="stop" size={32} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.remoteCommandBarButton} onPress={() => { this.HTTPPostRequest(commands.FullScreen) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Entypo name="resize-full-screen" size={32} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.remoteCommandBarButton} onPress={() => { this.HTTPPostRequest(commands.Previous) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="skip-previous" size={32} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.remoteCommandBarButton} onPress={() => { this.HTTPPostRequest(commands.Next) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="skip-next" size={32} color="white" />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    AudioModal = props => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.audioModalVisible}
                onRequestClose={() => {
                    this.setState({ audioModalVisible: false });
                }}>
                <TouchableWithoutFeedback onPress={() => { this.setState({ audioModalVisible: false }) }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{
                                width: 300,
                                height: 165,
                                backgroundColor: backgroundColor,
                                borderWidth: 1,
                                elevation: 5
                            }} >
                                <View style={{ backgroundColor: primaryColor, borderBottomWidth: 1, elevation: 5 }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }} >Audio options</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.AudioDelaySubtract10ms) }}>
                                            <View>
                                                <MaterialCommunityIcons name="minus" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>

                                        <View style={{margin: 5}}>
                                            <MaterialCommunityIcons name="timer" size={48} color="#0d47a1" />
                                        </View>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.AudioDelayAdd10ms) }}>
                                            <View>
                                                <MaterialCommunityIcons name="plus" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.PrevAudioTrack) }}>
                                            <View>
                                                <MaterialCommunityIcons name="skip-previous" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{margin: 5}}>
                                            <MaterialIcons name="audiotrack" size={48} color="#0d47a1" />
                                        </View>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.NextAudioTrack) }}>
                                            <View>
                                                <MaterialCommunityIcons name="skip-next" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    SubtitleModal = props => {
        return (

            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.subtitleModalVisible}
                onRequestClose={() => {
                    this.setState({ subtitleModalVisible: false });
                }}>
                <TouchableWithoutFeedback onPress={() => { this.setState({ subtitleModalVisible: false }) }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{
                                width: 300,
                                height: 165,
                                backgroundColor: backgroundColor,
                                borderWidth: 1,
                                elevation: 5
                            }} >
                                <View style={{ backgroundColor: primaryColor, borderBottomWidth: 1, elevation: 5 }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }} >Subtitle options</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.SubtitleDelayDecrease) }}>
                                            <View>
                                                <MaterialCommunityIcons name="minus" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{margin: 5}}>
                                            <MaterialCommunityIcons name="timer" size={48} color="#0d47a1" />
                                        </View>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.SubtitleDelayIncrease) }}>
                                            <View>
                                                <MaterialCommunityIcons name="plus" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.PrevSubtitleTrack) }}>
                                            <View>
                                                <MaterialCommunityIcons name="skip-previous" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{margin: 5}}>
                                            <MaterialIcons name="subtitles" size={48} color="#0d47a1" />
                                        </View>
                                        <TouchableOpacity style={{ elevation: 2, backgroundColor: '#5472d3', borderRadius: 10, margin: 5 }} onPress={() => { this.HTTPPostRequest(commands.NextSubtitleTrack) }}>
                                            <View>
                                                <MaterialCommunityIcons name="skip-forward" size={48} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    VolumeSlider = props => {
        return (<Slider style={{ height: "100%" }}
            value={this.state.volumelevel}
            step={1}
            maximumValue={100}
            thumbTintColor={primaryColor}
            minimumTrackTintColor={lightPrimaryColor}
            onValueChange={(value) => {
                this.settingVolume = true;
                clearTimeout(this.timeOutVolume);
                this.setState({ volumelevelclamped: value });
                this.HTTPPostRequest("-2", "volume", value)
            }}
            onSlidingComplete={(value) => {
                clearTimeout(this.timeOutVolume);
                this.setState({ volumelevel: value });
                this.timeOutVolume = setTimeout(() => this.settingVolume = false, 1250);
            }} />)
    };

    SeekSlider = props => {
        return (
            <View style={{ height: 70 }}>
                <Slider style={{ height: "100%" }}
                    value={this.state.position}
                    maximumValue={this.state.duration}
                    thumbTintColor={primaryColor}
                    minimumTrackTintColor={lightPrimaryColor}
                    onValueChange={(value) => {
                        this.seeking = true;
                        clearTimeout(this.timeOut);
                        this.setState({ positionstring: this.convertMillisToTime(value) });
                        this.HTTPPostRequest("-1", "position", this.convertMillisToTime(value));
                    }}
                    onSlidingComplete={(value) => {
                        clearTimeout(this.timeOut);
                        this.setState({ position: value });
                        this.setState({ positionstring: this.convertMillisToTime(value) });
                        this.timeOut = setTimeout(() => this.seeking = false, 1250);
                    }} />
            </View>)
    };
}

export default Remote;