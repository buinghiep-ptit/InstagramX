import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../assets/theme/colors'
import { STORY_TAKER } from '../../constant/routerNames'
import { navigate } from '../../navigations/rootNavigation'
import { ExtraStory } from '../../utils/model'

export interface StoryAdderItemProps {
    item: ExtraStory,
}

const StoryAdderItem = ({item}: StoryAdderItemProps) => {
    const user = {};
    return (
        <TouchableOpacity
            onPress={() => navigate(STORY_TAKER)}
            activeOpacity={0.8}
            style={styles.container}>
            <Image style={styles.avatar} source={{
                uri: item.avatarUrl
            }} />
            <View style={styles.btnAdd}>
                <Icons name="plus" size={16} color="#fff" />
            </View>
            <View style={styles.username}>
                <Text numberOfLines={1} style={{
                    fontSize: 12,
                    color: '#000'
                }}>Your Story</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StoryAdderItem

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        position: 'relative',
    },
    username: {
        maxWidth: 64,
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 32,
        height: 64-8,
        width: 64-8
    },
    btnAdd: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: colors.bg,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#318bfb'
    }
});