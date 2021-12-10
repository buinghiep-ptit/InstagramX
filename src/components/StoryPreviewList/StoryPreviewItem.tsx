import React, { useState } from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import { navigate } from '../../navigations/rootNavigation'
import { ExtraStory } from '../../utils/model'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import colors from '../../assets/theme/colors'
import StoryAdderItem from './StoryAdderItem'
import { STORY_FULL_VIEW } from '../../constant/routerNames'

export interface StoryPreviewItemProps {
    item: ExtraStory,
    index: number
}
const StoryPreviewItem = ({
    item,
    index
}: StoryPreviewItemProps) => {

    const _loadingDeg = new Animated.Value(0)
    const [seen, setSeen] = useState<boolean>(false)
    const [preloadingImage, setPreloadingImage] = useState<boolean>(false)

    const _onAnimateDeg = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            if (preloadingImage) {
                _loadingDeg.setValue(0)
                _onAnimateDeg()
            }
        })
    }

    const _onCompletedLoadingImage = () => {
        setPreloadingImage(false);
        navigate(STORY_FULL_VIEW, {
            groupIndex: index
        })
    }

    const _onShowStory = () => {
        setPreloadingImage(true);
        setTimeout(() => {
            _onCompletedLoadingImage();
        }, 2000);
    }

    if(index === 0) {
        return <View style={[styles.container, { paddingBottom: 0 }]} key={index}>
                    <StoryAdderItem item={item}/>
                </View>
    }
    return (
        <View style={styles.container} key={index}>
            <View
                style={styles.itemWrapper}>
                {!seen ? <LinearGradient
                    colors={['#c62f90', '#db3072', '#f19d4c']}
                    start={{ x: 0.75, y: 0.25 }}
                    end={{ x: 0.25, y: 0.75 }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                /> : <View style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ddd'
                }} />
                }
                {preloadingImage && !seen && <Animated.View
                    onLayout={_onAnimateDeg}
                    style={{
                        ...styles.pointsWrapper,
                        transform: [{
                            rotate: _loadingDeg.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }}>
                    <View style={styles.pointWrapper}>
                        <View style={styles.triagle} />
                    </View>
                    
                    <View style={{
                        ...styles.pointWrapper,
                        transform: [{
                            rotate: '30deg'
                        }]
                    }}>
                        <View style={styles.triagle} />
                    </View>

                    <View style={{
                        ...styles.pointWrapper,
                        transform: [{
                            rotate: '60deg'
                        }]
                    }}>
                        <View style={styles.triagle} />
                    </View>

                    <View style={{
                        ...styles.pointWrapper,
                        transform: [{
                            rotate: '90deg'
                        }]
                    }}>
                        <View style={styles.triagle} />
                    </View>

                </Animated.View>
                }
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={_onShowStory}
                        activeOpacity={0.8}
                        style={styles.imageWrapper}>
                        <FastImage style={styles.image}
                            source={{ uri: item?.avatarUrl }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.username}>
                <Text numberOfLines={1} style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 12,
                    color: seen ? '#666' : '#000'
                }}>{item.username}</Text>
            </View>
        </View>
    )
}

export default StoryPreviewItem

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    itemWrapper: {
        position: 'relative',
        height: 64,
        width: 64,
        overflow: 'hidden',
        borderRadius: 999,
    },
    username: {
        position: 'absolute',
        bottom: 2,
        left: (64 - 74) / 2,
        width: 74,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 999,
        width: 60,
        height: 60,
        padding: 2,
        backgroundColor: '#fff',
        top: 2,
        left: 2,
        position: 'absolute'
    },
    imageWrapper: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        borderRadius: 999
    },
    image: {
        borderRadius: 999,
        width: '100%',
        height: '100%',
    },
    pointsWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
    },
    pointWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
    },
    triagle: {
        position: 'absolute',
        transform: [{
            rotate: '-180deg'
        }],
        bottom: 32,
        left: (64 - 20) / 2,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 90,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colors.bg,
        borderLeftColor: 'transparent',
    }
})

