import {
    StyleSheet,
    Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window');

const backgroundColor = '#fafafa';
const primaryColor = '#0d47a1';
const lightPrimaryColor = '#5472d3';
const darkPrimaryColor = '#002171';

export const styles = StyleSheet.create({

    slide: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1
    },

    remoteBackground: {
        flex: 1,
        backgroundColor: backgroundColor
    },

    remoteNavigationContainer: {
        borderBottomWidth: 1,
        paddingBottom: 15
    },

    remoteCommandBarContainer: {
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 1
    },

    remoteCommandBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    remoteNavigationBarButton: {
        flex: 1,
        elevation: 2,
        borderRadius: 10, 
        backgroundColor: 
        lightPrimaryColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 20, 
        marginLeft: 20
    },



    
    remoteCommandBarButton: {
        flex: 1,
        elevation: 2,
        borderRadius: 10, 
        backgroundColor: 
        lightPrimaryColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 5, 
        marginLeft: 5
    }
});



export default styles;