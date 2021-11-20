import { 
    createStackNavigator, 
    StackNavigationOptions 
} from '@react-navigation/stack'
import React from 'react';
import { FORGOT_PASSWORD, LOGIN, REGISTER, WELCOME } from '../constant/routerNames';
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
            <Stack.Screen component={Login} name={LOGIN}/>
            <Stack.Screen component={Register} name={REGISTER} />
            <Stack.Screen component={ForgotPassword} name={FORGOT_PASSWORD} />
            <Stack.Screen component={Welcome} name={WELCOME} />
        </Stack.Navigator>
    )
}
export default AuthStack