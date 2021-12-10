import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import MainTab from './MainTab';
import StoryFullView from '../screens/SignedIn/Root/StoryFullView';
import StoryTaker from '../screens/SignedIn/Main/Others/Stories/StoryTaker';
import { STORY_FULL_VIEW, STORY_TAKER } from '../constant/routerNames';

export type SuperRootStackParamList = {
    MainTab: undefined;
    StoryTaker: {
        sendToDirect?: boolean,
        username?: string
    },
    StoryFullView: {
        groupIndex: number
    };
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
                }} name="StoryTaker" component={StoryTaker} />
            <RootStack.Screen options={{
                ...TransitionPresets.ModalTransition,
                gestureEnabled: true,
                cardStyle: { backgroundColor: 'transparent' }
            }} name={STORY_FULL_VIEW} component={StoryFullView} />
        </RootStack.Navigator>
    )
}

export default index;

const styles = StyleSheet.create({})
