/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroQuad,
  ViroAnimations,
  ViroBox,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    // if (state === ViroConstants.TRACKING_NORMAL) {
    //   setText('AR Demo!');
    // } else if (state === ViroConstants.TRACKING_NONE) {
    //   // Handle loss of tracking
    // }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* format : x,y,z
        x:dari samping kiri ke kanan
        y:dari bawah ke atas
        z:dari depan ke belakang
        satuannya meter */}
      <ViroText
        text={'Lantai 1'}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -2]}
        style={styles.helloWorldTextStyle}
      />
      <ViroText
        text={'Lantai 2'}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 2, -2]}
        style={styles.helloWorldTextStyle}
      />
      {/* <ViroBox
        position={[0, 0, -2]}
        animation={{name: 'rotate', run: true, loop: true}}
        scale={[0.3, 0.3, 0.1]}
      /> */}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
