import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import MainTab from './MainTab';
import StoryFullView from '../screens/SignedIn/Root/StoryFullView';

export type SuperRootStackParamList = {
    MainTab: undefined;
    StoryFullView: {
        groupIndex: number
    },
}
const RootStack = createStackNavigator<SuperRootStackParamList>()

const index = (): JSX.Element => {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {
        }
    }
    return (
        <RootStack.Navigator
            initialRouteName='MainTab'
            screenOptions={navigationOptions}>
            <RootStack.Screen 
                options={{title: 'Trang chu'}}
                name="MainTab" component={MainTab} />
            <RootStack.Screen options={{
                    ...TransitionPresets.ModalTransition,
                    gestureEnabled: true,
                    cardStyle: { backgroundColor: 'transparent' }
                }} name="StoryFullView" component={StoryFullView} />
        </RootStack.Navigator>
    )
}

export default index;

const styles = StyleSheet.create({})
