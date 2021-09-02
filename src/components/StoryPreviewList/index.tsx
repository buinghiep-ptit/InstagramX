import React, { useEffect, useRef, useState } from 'react'
import { Animated, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Metrics from '../../utils/Dementions';
import StoryPreviewItem from './StoryPreviewItem';
import usersWithFleets from '../../data/usersWithFleets'
import { ExtraStory } from '../../utils/model';

const index = () => {
    const [loadingStoryList, setLoadingStoryList] = useState<boolean>(true);
    const [storyList] =  useState<ExtraStory[]>(usersWithFleets);
    const _loadingDeg = useRef(new Animated.Value(0)).current;

    console.log('storyList: ', storyList.length);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingStoryList(false);
        }, 1500)
        return () => clearTimeout(timer);
    }, [])

    const _onAnimateDeg = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start(() => {
            if (loadingStoryList) {
                _loadingDeg.setValue(0)
                _onAnimateDeg()
            }
        })
    }
    return (
        <View style={styles.container}>
            {
                loadingStoryList && <Animated.Image
                    onLayout={_onAnimateDeg}
                    style={{
                        ...styles.loading,
                        transform: [
                            {
                                rotate: _loadingDeg.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }
                        ]
                    }} 
                    source={require('../../assets/images/png/waiting.png')} />
            }
            {
                <FlatList
                    data={storyList}
                    renderItem={({item, index}) => <StoryPreviewItem index={index} item={item} key={index} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    loading: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: (Metrics.screenWidth - 30) / 2,
        top: (104 - 30) / 2,
        zIndex: 999
    }
})
