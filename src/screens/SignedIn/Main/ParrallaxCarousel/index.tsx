import React, { useEffect, useRef } from 'react'
import { Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import Metrics from '../../../../utils/Dementions'


const ITEM_WIDTH = Metrics.screenWidth * 0.76;
const ITEM_HEIGHT = Metrics.screenWidth * 0.38;

const images = [
    'https://sapi.fpt.vn/foxstep-auth-api-staging/auth/api/image?detail=20210810/set_1/20210810202029_hoaittt11_foxstepsImage.png&width=1000&height=500',
    'https://sapi.fpt.vn/foxstep-auth-api-staging/auth/api/image?detail=20210811/set_1/20210811110209_hoaittt11_foxstepsImage.png&width=1000&height=500',
    'https://sapi.fpt.vn/foxstep-auth-api-staging/auth/api/image?detail=20210811/set_1/20210811143225_hoaittt11_foxstepsImage.png&width=1000&height=500',
    'https://sapi.fpt.vn/foxstep-auth-api-staging/auth/api/image?detail=20210819/set_1/20210819085357_admin_foxstepsImage.png&width=1000&height=500',
    'https://sapi.fpt.vn/foxstep-auth-api-staging/auth/api/image?detail=20210819/set_1/20210819090817_admin_foxstepsImage.png&width=1000&height=500'
]

const data = images.map((image, index) => ({
    key: String(index),
    photo: image
}))

const Parrallax = () => {

    const scrollX  = useRef(new Animated.Value(0)).current;
    // const handleScroll = (event) => {
    //     console.log('offestX: ',  event.nativeEvent.contentOffset.x )
    // }
    // useEffect(() => {
    //     console.log('scrollX: ', scrollX)
    // }, [scrollX]);
    return (
        <View>
            <Animated.FlatList 
                data={data}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={true}
                pagingEnabled
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}
                // onScroll={handleScroll}
                renderItem={({item, index}) => {
                    const inputRange = [
                        // (index - 1) * Metrics.screenWidth,
                        index * Metrics.screenWidth,
                        (index +  1) * Metrics.screenWidth,
                    ]

                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [  0 , - Metrics.screenWidth * 1]
                    })
                    console.log('scrollX: ', translateX)

                    return (
                        <View style={{width: Metrics.screenWidth, justifyContent: 'center', alignItems: 'center', padding:12}}>
                            <View
                                style={{
                                    borderRadius: 18,
                                    shadowColor: '#fff',
                                    shadowOpacity: 1,
                                    shadowRadius: 20,
                                    shadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    padding: 12,
                                    backgroundColor: '#000'
                                }}>
                                <View 
                                    style={{
                                        width: ITEM_WIDTH,
                                        height: ITEM_HEIGHT,
                                        overflow: 'hidden',
                                        alignItems: 'center',
                                        borderRadius: 14,
                                    }}>
                                    <Animated.Image 
                                        source={{uri: item.photo}}
                                        style={{
                                            width: ITEM_WIDTH * 1,
                                            height: ITEM_HEIGHT - (index*0),
                                            resizeMode: 'cover',
                                            transform: [
                                                { translateX }
                                            ]
                                        }}
                                    />
                                </View>
                            </View>  
                        </View>
                    );
                }}
            />
        </View>
    )
}

export default Parrallax

const styles = StyleSheet.create({})
