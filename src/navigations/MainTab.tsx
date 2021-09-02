import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeIndex from '../screens/SignedIn/Main';
import Account from '../screens/SignedIn/Main/Account';
import Creator from '../screens/SignedIn/Main/Creator';
import Explore from '../screens/SignedIn/Main/Explore';
import Activity from '../screens/SignedIn/Main/Activity';
import { TabBarComponent } from '../components/BottomTabBar';

export type HomeTabParamList = {
    HomeIndex: undefined,
    Explore: undefined,
    Creator: undefined,
    Activity: undefined,
    Account: undefined,
};

const Stack = createStackNavigator()

const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false
             }}>
            <Stack.Screen component={Account} name="AccountIndex" />     
        </Stack.Navigator>
    )
}
const ExploreStack = () => {
    return (
        <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false
             }}>
            <Stack.Screen component={Explore} name="ExploreIndex" />     
        </Stack.Navigator>
    )
}
const ActivityStack = () => {
    return (
        <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false
             }}>
            <Stack.Screen component={Activity} name="ActivityIndex" />     
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false
             }}>
            <Stack.Screen component={HomeIndex} name="HomeIndex" />     
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator<HomeTabParamList>()
const MainTab = () => {
    return (
        <Tab.Navigator 
            tabBar={TabBarComponent}
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="home"
                        size={30} color={focused ? '#000' : '#ddd'} />
                }} 
                component={HomeStack} name="HomeIndex" />
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => <Icon name="magnify"
                    size={30} color={focused ? '#000' : '#ddd'} />
            }} component={ExploreStack} name="Explore" />
            <Tab.Screen
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('GalleryChooser');
                    },
                })}
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="plus-box"
                        size={30} color={'#ddd'} />
                }} component={Creator} name="Creator" />
            <Tab.Screen 
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="heart"
                        size={30} color={focused ? '#000' : '#ddd'} />
                }}   
                component={ActivityStack} name="Activity" />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="account-circle"
                        size={30} color={focused ? '#000' : '#ddd'} />
                }}  
                component={AccountStack} name="Account" />
        </Tab.Navigator>
    )
}

export default MainTab