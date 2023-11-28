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

const Index = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'transparent'}}>
      <StatusBar barStyle={'light-content'} />

      <ScrollView
        style={{
          marginTop: 20,
        }}>
        <View>
          <Text>首页</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  font: {
    fontSize: 16,
    color: '#fff',
  },
  btn: {
    width: '35%',
    height: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    merginRight: 4,
    flexShrink: 0,
  },
});

export default Index;
