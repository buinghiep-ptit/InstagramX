import React, {useState} from 'react'
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/theme/colors'
import NavigationBar from '../../../components/NavigationBar'
import SafeView from '../../../utils/SafeView'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import StoryPreviewList from '../../../components/StoryPreviewList'

const index = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _onRefreshing = () => {}
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={colors.bg}
                translucent={true}
            />
            <NavigationBar 
                iconLeft={<IconFont name={'camera'} size={24}/>}
                iconMiddle={<Image style={styles.logo} source={require('../../../assets/images/png/logo.png')} />}
                iconRight={<IconFont name='paper-plane' size={24}/>}
                title='Trang chu'/>
            <View style={styles.wrapperView}>
                <FlatList
                    data={tweets}
                    renderItem={({item}) => <View />}
                    keyExtractor={(item) => item.id}
                    refreshing={loading}
                    onRefresh={_onRefreshing}
                    ListHeaderComponent={<StoryPreviewList />}
                />
            </View>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: SafeView.PlatformSafeArea,
    wrapperView: {
        flex: 1
    },
    logo: {
        resizeMode: 'contain',
        width: 100
    },
})
