import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './rootNavigation';

const index = (): JSX.Element => {
    const [loggedIn] = useState<boolean>(false);
    return (
        <NavigationContainer ref={navigationRef}>
            {
                !loggedIn ? <AuthStack /> : <MainStack />
            }
        </NavigationContainer>
    ) 
}

export default index
