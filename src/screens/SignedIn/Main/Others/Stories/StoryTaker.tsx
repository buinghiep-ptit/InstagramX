import { RouteProp, useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SuperRootStackParamList } from '../../../../../navigations/MainStack'
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import Metrics from '../../../../../utils/Dementions';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../../../navigations/rootNavigation';
import { STATUS_BAR_HEIGHT } from '../../../../../utils';

type StoryTakerRouteProp = RouteProp<SuperRootStackParamList, 'StoryTaker'>;
type StoryTakerProps = {
    route: StoryTakerRouteProp
}
export type StoryImageSpec = {
    width: number,
    height: number,
    uri: string,
    base64: string,
    extension: string
}

const StoryTaker = ({ route }: StoryTakerProps) => {
    const { sendToDirect, username } = route?.params || {};

    const focused = useIsFocused();
    const [front, setFront] = useState<boolean>(true);
    const [flash, setFlash] = useState<boolean>(false);
    const [groups, setGroups] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const [photos, setPhotos] = useState<CameraRoll.PhotoIdentifier[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(-1);
    const _cameraRef = useRef<RNCamera>(null);
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const _galleryOffsetY = React.useMemo(() => new Animated.Value(0), []);
    const _groupsOffsetX = React.useMemo(() => new Animated.Value(0), []);
    const ref = useRef<{
        preGalleryOffsetY: number,
        showGroups: boolean
    }>({
        preGalleryOffsetY: 0,
        showGroups: false
    });
    
    useEffect(() => {
        if (focused) {
            CameraRoll.getPhotos({
                    first: 1000, 
                    assetType: 'Photos',
                })
                .then(result => {
                    const photos = result.edges
                    const groupList = Array.from(new Set(photos.map(photo => photo.node.group_name)))
                    console.log('focused: ', photos)
                    setGroups(groupList)
                    if (groupList.length > 0) setSelectedGroupIndex(0)
                })
                .catch(error => {
                    alert(`Error Loading Images: ${error}`)
                });
        }
        return () => {
        }
    }, [focused]);

    useEffect(() => {
        if (selectedGroupIndex > -1) {
            CameraRoll.getPhotos({
                assetType: 'Photos',
                first: 9 * page,
                groupName: groups[selectedGroupIndex]
            })
                .then(result => {
                    const photos = result.edges
                    console.log('selectedGroupIndex > -1: ', selectedIndex)
                    setPhotos(photos)
                    if (photos.length > 0 && selectedIndex < 0) setSelectedIndex(0)
                })
        }
    }, [selectedGroupIndex, page]);

    const _onTakePhoto = async () => {
        const photo = await _cameraRef.current?.takePictureAsync({
            width: 100,
            quality: 1,
        })
        const images: StoryImageSpec[] = []
        images.push({
            width: photo?.width as number,
            height: photo?.height as number,
            uri: photo?.uri as string,
            base64: photo?.base64 || "",
            extension: (photo?.uri || '').split('.').pop() || 'jpg'
        })
        navigate('StoryProcessor', {
            images,
            sendToDirect,
            username
        })
        console.log('images: ', images);
    }

    const _onShowGallery = () => {
        Animated.timing(_galleryOffsetY, {
            duration: 200,
            toValue: -Metrics.screenHeight + 170,
            useNativeDriver: true
        }).start(() => {
            if (!showGallery) setShowGallery(true)
        })
        ref.current.preGalleryOffsetY = -Metrics.screenHeight + 170
    }

    return (
        <>
            {/* <PanGestureHandler
                // onGestureEvent={_onGestureEvent}
                // onHandlerStateChange={_onStateChange}
            > */}
                <View style={styles.container}>
                    {focused && <RNCamera
                        ratio="16:9"
                        pictureSize="3840x2160"
                        captureAudio={false}
                        ref={_cameraRef}
                        style={styles.cameraContainer}
                        type={front ? 'front' : 'back'}
                        flashMode={flash ? 'on' : 'off'}
                    />}

                    <View style={styles.topOptions}>
                        <TouchableOpacity
                            onPress={() => navigate('StoryPrivacy')}
                            style={styles.btnTopOptions}>
                            {/* <Icon name="tune" size={30} color="#fff" /> */}
                            <Text>Tune</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={setFlash.bind(null, !flash)}
                            style={styles.btnTopOptions}>
                            <Text>{flash ? 'flash' : "flash-off"}</Text>
                            {/* <Icon name={flash ? 'flash' : "flash-off"}
                                size={30} color="#fff" /> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={goBack}
                            style={styles.btnTopOptions}>
                            <Text style={{
                                fontSize: 30,
                                color: '#fff',
                            }}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{
                        ...styles.bottomOptions,
                        transform: [{
                            translateY: _galleryOffsetY
                        }],
                        zIndex: showGallery ? 0 : 2,
                        opacity: _galleryOffsetY.interpolate({
                            inputRange: [-Metrics.screenHeight + 170, 0],
                            outputRange: [0, 1]
                        })
                    }}>
                        <TouchableOpacity
                            onPress={_onShowGallery}
                            activeOpacity={0.8}
                            style={styles.btnLastPhoto}>
                            <Image
                                style={styles.lastPhoto}
                                source={{
                                    uri: [...photos][0]?.node.image.uri
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={_onTakePhoto}
                            activeOpacity={0.7}
                            style={styles.btnTakePhoto}>
                            <View style={{
                                width: 70,
                                height: 70,
                                borderRadius: 70,
                                backgroundColor: "#fff",
                                borderColor: '#000',
                                borderWidth: 4
                            }} />
                            {(sendToDirect && username) &&
                                <View style={styles.sendTo}>
                                    <Text style={{
                                        color: '#fff'
                                    }}>
                                        Message <Text style={{
                                            fontWeight: 'bold'
                                        }}>{username}</Text>
                                    </Text>
                                </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={setFront.bind(null, !front)}
                        >
                            {/* <Icon name="camera-retake" size={40} color="#fff" /> */}
                            <Text>camera-retake</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    
                    <TouchableOpacity
                        onPress={_onTakePhoto}
                        activeOpacity={0.7}
                        style={styles.btnTakePhoto}>
                        <View style={{
                            width: 70,
                            height: 70,
                            borderRadius: 70,
                            backgroundColor: "#fff",
                            borderColor: '#000',
                            borderWidth: 4
                        }} />
                        {(sendToDirect && username) &&
                            <View style={styles.sendTo}>
                                <Text style={{
                                    color: '#fff'
                                }}>
                                    Message <Text style={{
                                        fontWeight: 'bold'
                                    }}>{username}</Text>
                                </Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
            {/* </PanGestureHandler> */}
        </>
    )
}

export default StoryTaker

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
    },
    topOptions: {
        top: STATUS_BAR_HEIGHT,
        left: 0,
        height: 60,
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    bottomOptions: {
        height: 80,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.2)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btnTopOptions: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTakePhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 80,
        backgroundColor: "#fff",
        transform: [{
            translateY: -90
        }]
    },
    btnLastPhoto: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 2
    },
    lastPhoto: {
        width: 30,
        height: 30,
        borderRadius: 5
    },
    sendTo: {
        position: 'absolute',
        bottom: 90,
        width: 200,
        left: (70 - 200) / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

