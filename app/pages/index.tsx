/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState, memo, useCallback} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  SectionList,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {getAxios, postAxios} from '../utils/axios';
import Animated, {Easing} from 'react-native-reanimated';
const AnimatedImage = Animated.createAnimatedComponent(Image);
import TrackPlayer, {State} from 'react-native-track-player';

const Index = () => {
  //配置接口
  const [head, sethead] = useState({});
  const [hair, sethair] = useState({});
  const [eye, seteye] = useState({});
  const [hand, sethand] = useState({});
  const [mouth, setmouth] = useState({});
  const [neck, setneck] = useState({});
  const [pants, setpants] = useState({});
  const [coat, setcoat] = useState({});

  const [roleId, setRoleID] = useState('');
  const [roleName, setRoleName] = useState('');

  const [hairIndex, sethairIndex] = useState(0);

  let interval = null;

  const [mouthIndex, setmouthIndex] = useState(0);

  let interval1 = null;

  const [eyeIndex, seteyeIndex] = useState(0);

  let interval2 = null;

  const sound = url => {
    TrackPlayer.setupPlayer()
      .then(async () => {
        const track1 = {
          url, // Load media from the network
        };

        await TrackPlayer.add([track1]);
        TrackPlayer.play();
        console.error(TrackPlayer, State, '---TrackPlayer');
      })
      .catch(error => {
        console.log(error, '---error');
      });
  };

  const getSound = async () => {
    const {code, data} = await postAxios({
      url: `${Config.API_URL}/mouth/voice/index`,
      data: {
        text: '11111111',
      },
    });
    console.error(data.voice);
    sound(data.voice);
    // console.error('getSound');
  };
  //配置接口
  const getConfig = async () => {
    const {code, data} = await getAxios({
      url: `${Config.API_URL}/mouth/config/index`,
    });
    console.log(data, '---data');
    if (code === 200) {
      sethead(data.head);
      sethair(data.hair);
      seteye(data.eye);
      sethand(data.hand);
      setmouth(data.mouth);
      setneck(data.neck);
      setpants(data.pants);
      setcoat(data.coat);

      setRoleID(data.roleId);
      setRoleID(data.roleName);

      interval = setInterval(() => {
        sethairIndex(
          prevIndex => (prevIndex + 1) % data.hair?.material?.length,
        );
      }, 167);
      interval1 = setInterval(() => {
        setmouthIndex(
          prevIndex => (prevIndex + 1) % data.mouth?.material?.length,
        );
      }, 130);

      const fn = (interval2 = setInterval(() => {
        seteyeIndex(prevIndex => (prevIndex + 1) % data.eye?.material?.length);
      }, data.eye.duration));
    }
  };

  useEffect(() => {
    getConfig();
    // console.log(data, '---data');
    getSound();
    return () => {
      interval && clearInterval(interval);
      interval1 && clearInterval(interval1);
      interval2 && clearInterval(interval2);
    };
  }, []);

  const playSound = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      // console.log('The player is playing');
      TrackPlayer.pause();
      if (interval1) {
        interval1 = null;
        clearInterval(interval1);
      }
    } else if (state === State.Ended || state === State.Stopped) {
      TrackPlayer.reset();
      interval1 = interval1 = setInterval(() => {
        setmouthIndex(prevIndex => (prevIndex + 1) % mouth?.material?.length);
      }, 130);
    } else if (state === State.Paused) {
      TrackPlayer.play();
      interval1 = interval1 = setInterval(() => {
        setmouthIndex(prevIndex => (prevIndex + 1) % mouth?.material?.length);
      }, 130);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'transparent'}}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          marginTop: 20,
        }}>
        <Text>{hairIndex}</Text>

        <TouchableWithoutFeedback
          onPress={() => {
            playSound();
          }}>
          <View
            style={{
              backgroundColor: 'red',
              width: 200,
              height: 100,
            }}
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            alignItems: 'center',
          }}>
          {head.material ? (
            <View style={styles.headBox}>
              <Image
                source={{
                  uri: head?.material[0],
                }}
                resizeMode="contain"
                style={styles.head}
              />

              {eye.material && eye.material.length && (
                <AnimatedImage
                  source={{
                    uri: eye?.material[eyeIndex],
                  }}
                  resizeMode="contain"
                  style={styles.eye}
                />
              )}

              {mouth.material && mouth.material.length && (
                <AnimatedImage
                  source={{
                    uri: mouth?.material[mouthIndex],
                  }}
                  resizeMode="contain"
                  style={styles.mouth}
                />
              )}
              {hair.material?.length && (
                <AnimatedImage
                  source={{
                    uri: hair?.material[hairIndex],
                  }}
                  resizeMode="contain"
                  style={styles.hair}
                />
              )}
              {neck.material && neck.material.length > 0 ? (
                <Image
                  source={{
                    uri: neck.material[0],
                  }}
                  resizeMode="contain"
                  style={styles.neck}
                />
              ) : (
                ''
              )}
              {coat.material && coat.material.length && (
                <Image
                  source={{
                    uri: coat.material[0],
                  }}
                  resizeMode="contain"
                  style={styles.coat}
                />
              )}

              {pants.material && pants.material.length > 0 ? (
                <Image
                  source={{
                    uri: pants.material[0],
                  }}
                  resizeMode="contain"
                  style={styles.pants}
                />
              ) : (
                ''
              )}

              {hand.material && hand.material.length > 0 && (
                <Image
                  source={{
                    uri: hand.material[0],
                  }}
                  resizeMode="contain"
                  style={styles.hand}
                />
              )}
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headBox: {
    position: 'relative',
    // backgroundColor: 'green',
    width: 200,
    minHeight: 1000,
  },
  head: {
    width: 200,
    height: 200,
    // backgroundColor: 'pink',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  hair: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  neck: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  coat: {
    width: 304,
    height: 520,
    position: 'absolute',
    top: 20,
    left: -50,
    zIndex: 2,
    // backgroundColor: 'pink',
  },
  pants: {
    width: 400,
    height: 600,
    position: 'absolute',
    zIndex: 0,
    left: -104,
    top: 300,
  },
  hand: {
    width: 304,
    height: 560,
    position: 'absolute',
    left: -52,
    top: 258,
    zIndex: 1,
  },
  mouth: {
    width: 140,
    height: 220,
    position: 'absolute',
    left: 30,
    top: -8,
    zIndex: 3,
    // backgroundColor: 'green',
  },
  eye: {
    width: 140,
    height: 220,
    position: 'absolute',
    left: 30,
    top: -8,
    zIndex: 1,
  },
});

export default Index;
