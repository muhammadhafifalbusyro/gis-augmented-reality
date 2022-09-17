/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
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
  ViroImage,
  V,
} from '@viro-community/react-viro';
import {images} from '../../assets';

const HelloWorldSceneAR = props => {
  const [text, setText] = useState('Initializing AR...');
  console.log('props', props.arSceneNavigator.viroAppProps);
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
        text={props.arSceneNavigator.viroAppProps}
        scale={[0.5, 0.5, 0.5]}
        position={[2, 0, -2]}
        style={styles.helloWorldTextStyle}
      />
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
      {/* <ViroImage
        source={images.logo}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 1, -2]}
        style={{height: 1, width: 1}}
      /> */}
    </ViroARScene>
  );
};

export default ({navigation, route}) => {
  const [name, setName] = useState(route.params.name);
  //   alert(name);
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      viroAppProps={name}
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
