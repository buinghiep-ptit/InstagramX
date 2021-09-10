import { 
    createStackNavigator, 
    StackNavigationOptions 
} from '@react-navigation/stack'
import React from 'react';
import { 
    ForgotPassword, 
    Login, 
    Register, 
    Welcome 
} from '../screens/Auth';
import { WelcomePropsRouteParams } from '../screens/Auth/Welcome';

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Welcome: WelcomePropsRouteParams;
};

const Stack = createStackNavigator<AuthStackParamList>()
const AuthStack = () => {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <Stack.Navigator 
            initialRouteName='Register'
            screenOptions={navigationOptions}>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Register} name="Register" />
            <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
            <Stack.Screen component={Welcome} name="Welcome" />
        </Stack.Navigator>
    )
}
export default AuthStack