import React, {useState} from 'react'
import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../assets/theme/colors'
import Icon from '../../components/Icons'
import NavigationBar from '../../components/NavigationBar'
import Metrics from '../../utils/Dementions'
import SafeView from '../../utils/SafeView'

const Register = () => {

    const [currentTab, setCurrentTab] = useState<number>(1)
    const _onToggleTab = (type: number): void => setCurrentTab(type)

    return (
        <SafeAreaView style={styles.container}>
             <StatusBar
                barStyle="dark-content"
                backgroundColor={colors.bg}
                translucent={true}
            />
            <NavigationBar
                iconLeft={<Icon name={'header-left'} />} 
            />
            <KeyboardAvoidingView
                behavior="height"
                style={[
                    styles.centerContainer, 
                    {

                    }
                    ]
                }>
                <Text style={styles.txtTitleForm}>Enter phone number or email</Text>
                <View style={styles.formSignInWrapper}>
                    <View style={styles.tabsFormContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => _onToggleTab(1)}
                            style={{
                                ...styles.tabItem,
                            }}>
                            <Text style={{
                                ...styles.tabTitle,
                                color: currentTab === 1 ? '#000' : "#666"
                            }}>Phone</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={_onToggleTab.bind(null, 2)}
                            style={{
                                ...styles.tabItem,
                            }}>
                            <Text style={{
                                ...styles.tabTitle,
                                color: currentTab === 2 ? '#000' : "#666"
                            }}>Email</Text>
                        </TouchableOpacity>
                        <View style={{
                            ...styles.activeTabLine,
                            left: currentTab === 1 ? 0 : '50%'
                        }} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity style={styles.btnPhoneCode}>
                                <View style={styles.phoneCodeTitleWrapper}>
                                    <Text style={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                        color: '#666'
                                    }}>VN +84</Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={() =>{}}
                                autoFocus={true}
                                placeholder="Phone"
                                keyboardType="number-pad"
                                returnKeyType="done"
                                style={styles.inputPhone}
                                value={'0975452750'} />
                            <View style={styles.iconWrapper}>
                                <Icon name='close-circle' height={20} width={20}/>
                            </View>
                        </View>
                    </View>
                </View> 
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: SafeView.PlatformSafeArea,
    centerContainer: {
        width: Metrics.screenWidth - 48,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitleForm: {
        fontSize: 24, 
        marginVertical: 8, 
        fontWeight: '400'
    },
    formSignInWrapper: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabsFormContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        position: 'relative' // or null
    },
    tabItem: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    activeTabLine: {
        height: 1,
        width: '50%',
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0
    },
    tabTitle: {
        fontWeight: '600',
        fontSize: 16
    },
    inputFormContainer:{
        width: '100%',
        marginVertical: 16
    },
    inputContainer:{
        width: '100%',
        marginVertical: 16
    },
    inputWrapper: {
        borderWidth: 1,
        borderRadius: 6,
        borderStyle: 'solid',
        flexDirection: 'row'
    },
    btnPhoneCode: {
        height: 44,
        justifyContent: 'center',
        width: 92,
    },
    phoneCodeTitleWrapper: {
        paddingVertical: 6,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        alignItems: 'center'
    },
    inputPhone: {
        height: 44,
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 14
    },
    iconWrapper: {
        height: 44,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
