import React, { useState, useRef, useEffect } from 'react'
import { Animated, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Platform, StyleSheet, View ,Text} from 'react-native'
import Metrics from '../../utils/Dementions';
import StoryItem from './StoryItem'
import { ExtraStory } from '../../utils/model';
import colors from '../../assets/theme/colors';
import FastImage from 'react-native-fast-image';
//constant
const perspective = 500
const A = Math.atan(perspective / (Metrics.screenWidth / 2))
const ratio = Platform.OS === 'ios' ? 2 : 1.2;
export interface StoryViewProps {
    data: ExtraStory[],
    groupIndex: number
}
export type StoryController = {
    currentGroupIndex: number,
}

const StoryView = ({ groupIndex, data }: StoryViewProps) => {
    console.log('stories: ', data.length);
    const [loading, setLoading] = useState<boolean>(true)
    const [storyControllers, setStoryControllers] = useState<StoryController[]>([])
    const animX = React.useMemo(() => new Animated.Value(1), [])
    const _scrollRef = useRef<ScrollView>(null)
    useEffect(() => {
        const controllerList = data.map(() => ({
            currentGroupIndex: groupIndex,
        }))
        setStoryControllers(controllerList)
        setLoading(false)
    }, [])
    const _onScrollHandler = ({ nativeEvent: {
        contentOffset: { x }
    } }: NativeSyntheticEvent<NativeScrollEvent>) => {

        animX.setValue(x)
    }
    const _onScrollEndHandler = ({ nativeEvent: {
        contentOffset: { x }
    } }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const nextIndex = Math.floor(x / Metrics.screenWidth)
        const preIndex = storyControllers[0].currentGroupIndex
        if (nextIndex !== preIndex) {
            const temp = [...storyControllers]
            temp[preIndex] = { ...temp[preIndex] }
            temp[nextIndex] = { ...temp[nextIndex] }
            for (let x of temp) {
                x.currentGroupIndex = nextIndex
            }
            setStoryControllers(temp)
        }
    }
    const _getStoryStyle = (index: number) => {
        /**
         * @author William Candillon - Instagram Stories Cube Transition
         *  */
        const offset = index * Metrics.screenWidth
        const inputRange = [offset - Metrics.screenWidth, offset + Metrics.screenWidth];
        const translateX = animX.interpolate({
            inputRange,
            outputRange: [Metrics.screenWidth / ratio, -Metrics.screenWidth / ratio],
            extrapolate: 'clamp',
        });
        const rotateY = animX.interpolate({
            inputRange,
            outputRange: [`${A}rad`, `-${A}rad`],
            extrapolate: 'clamp',
        });

        const translateX1 = animX.interpolate({
            inputRange,
            outputRange: [(Metrics.screenWidth / 2), -Metrics.screenWidth / 2],
            extrapolate: 'clamp',
        });

        const extra = ((Metrics.screenWidth / ratio) / Math.cos(A / 2)) - Metrics.screenWidth / ratio;
        const translateX2 = animX.interpolate({
            inputRange,
            outputRange: [-extra, extra],
            extrapolate: 'clamp',
        });
        return {
            ...StyleSheet.absoluteFillObject,
            transform: [
                { perspective },
                { translateX },
                { rotateY },
                { translateX: translateX1 },
                { translateX: translateX2 },
            ],
        }
    }
    const _setController = (preGroupIndex: number, nextGroupIndex: number) => {

        if (nextGroupIndex > -1 && nextGroupIndex < data.length) {
            const temp = [...storyControllers]
            temp[nextGroupIndex] = { ...temp[nextGroupIndex] }
            temp[preGroupIndex] = { ...temp[preGroupIndex] }
            for (let x of temp) {
                x.currentGroupIndex = nextGroupIndex
            }
            _scrollRef.current?.scrollTo({
                x: nextGroupIndex * Metrics.screenWidth,
                y: 0,
                animated: true
            })
            setStoryControllers(temp)
        } else {
            // goBack()
        }

    }
 
    if (loading) return null
    return (
        <View style={styles.container}>
            {/* <ScrollView
                ref={_scrollRef}
                onLayout={() => _scrollRef.current?.scrollTo({
                    x: groupIndex * Metrics.screenWidth,
                    y: 0,
                    animated: false
                })}
                bounces={false}
                contentContainerStyle={{
                    width: Metrics.screenWidth * data.length,
                }}
                snapToInterval={Metrics.screenWidth}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={_onScrollHandler}
                onMomentumScrollEnd={_onScrollEndHandler}
                horizontal={true}
                decelerationRate={0.99}
            > */}
                <Animated.View style={{
                    width: Metrics.screenWidth,
                    height: Metrics.screenHeight,
                    ...StyleSheet.absoluteFillObject,
                    transform: [{
                        translateX: animX
                    }]
                }}>
                    {data[0].fleets.items.map((item, index) => (
                        <Animated.View key={index} style={_getStoryStyle(index)}>
                            {/* <StoryItem
                                maxIndex={data.length - 1}
                                setController={_setController}
                                item={story}
                                index={index}
                                controller={storyControllers[index]}
                            /> */}
                            <FastImage
                                style={styles.image} 
                                source={{
                                    uri: item.imageUrl
                                }}
                            />
                        </Animated.View>
                    ))}
                </Animated.View>
            {/* </ScrollView> */}
        </View>
    )
}

export default StoryView

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
        flex: 1,
        width: '100%'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})
