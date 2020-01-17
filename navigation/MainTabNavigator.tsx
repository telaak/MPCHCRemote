import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Remote',
  tabBarIcon: (props: any) => (
    <MaterialCommunityIcons
    name="remote"
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
  ),
};

const DirectoryStack = createStackNavigator({
  Directory: DirectoryScreen,
});

DirectoryStack.navigationOptions = {
  tabBarLabel: 'Directory',
  tabBarIcon: (props: any) => (
    <TabBarIcon
      focused={props.focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-list'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: (props: any) => (
    <TabBarIcon
      focused={props.focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  DirectoryStack,
  SettingsStack
});
