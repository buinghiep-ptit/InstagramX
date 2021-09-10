import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthStackParamList } from '../../navigations/AuthStack'
import { IFormValuesFirstStep, IFormValuesSecondStep, IFormValuesThirdStep } from './Register'
export type WelcomePropsRouteParams = IFormValuesFirstStep
    & IFormValuesSecondStep & IFormValuesThirdStep
type WelcomePropsRouteProp = RouteProp<AuthStackParamList, 'Welcome'>

type WelcomeNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>

type WelcomeProps = {
    navigation: WelcomeNavigationProp,
    route: WelcomePropsRouteProp
}

const Welcome = ({}: WelcomeProps) => {
    return (
        <View>
            <Text>Welcome</Text>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})
