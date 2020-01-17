import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const backgroundColor = '#fafafa';
export const primaryColor = '#0d47a1';
export const lightPrimaryColor = '#5472d3';
export const darkPrimaryColor = '#002171';

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
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

  remoteNavigationBarButton: {
    flex: 1,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: lightPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10
  },

  remoteCommandBarButton: {
    flex: 1,
    width: 85,
    height: 50,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: lightPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    flexBasis: '20%'
  },

  removeFileExtensionButton: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  fileExtensionRowContainer: {
    flexDirection: 'row',
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0000001F'
  },

  fileExtensionTextContainer: {
    marginLeft: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  fileExtensionText: {
    color: '#000000B3',
    fontWeight: 'bold'
  },

  addFileExtensionButton: {
    width: 40,
    height: 40,
    backgroundColor: 'green',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  fileExtensionAddRowContainer: {
    flexDirection: 'row',
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    elevation: 3
  },

  fileExtensionAddRowTextContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center'
  },

  settingsTextContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center'
  },

  settingsContainer: {
    flexDirection: 'row',
    height: 49,
    backgroundColor: primaryColor,
    borderBottomWidth: 1,
    elevation: 5
  }

});

export default styles;
