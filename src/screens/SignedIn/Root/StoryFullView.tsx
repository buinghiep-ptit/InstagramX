import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import StoryView from '../../../components/StoryView/'
import usersWithFleets from '../../../data/usersWithFleets'
import { SuperRootStackParamList } from '../../../navigations/MainStack'
import { ExtraStory } from '../../../utils/model'
type StoryFullViewRouteProp = RouteProp<SuperRootStackParamList, 'StoryFullView'>
type StoryFullViewProps = {
    route: StoryFullViewRouteProp
}
const StoryFullView = ({ route }: StoryFullViewProps) => {
    const groupIndex = route.params.groupIndex
    const [stories] = useState<ExtraStory[]>(usersWithFleets)
    const [loaded, setLoader] = useState<boolean>(false)
    const _loadingAnim = React.useMemo(() => new Animated.Value(0), [])

    useEffect(() => {
        setLoader(true);
        const timer = setTimeout(() => {
            setLoader(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [])

    const _onAnimation = () => {
        Animated.loop(Animated.timing(_loadingAnim, {
            useNativeDriver: true,
            toValue: 1,
            duration: 1000
        }), {
            iterations: 20
        }).start()
    }
    return (
        <View style={styles.container}>
            {!loaded && <StoryView groupIndex={groupIndex} data={stories} />}
            {loaded &&
                <View style={{
                    height: "100%",
                    width: '100%',
                    ...StyleSheet.absoluteFillObject,
                    zIndex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Animated.View
                        onLayout={_onAnimation}
                        style={{
                            height: 64,
                            width: 64,
                            borderRadius: 64,
                            borderColor: "#fff",
                            borderWidth: 4,
                            borderStyle: 'dashed',
                            transform: [{
                                rotate: _loadingAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }]
                        }} />
                </View>
            }
        </View>
    )
}

export default StoryFullView

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
