import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { useSelector } from '../redux/reducers';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './rootNavigation';

const index = (): JSX.Element => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    
    return (
        <NavigationContainer ref={navigationRef}>
            {
                !isLoggedIn ? <AuthStack /> : <MainStack />
            }
        </NavigationContainer>
    ) 
}

export default index
