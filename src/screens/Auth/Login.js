import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import {ButtonCustom} from '../../components';

const Login = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.text, {marginTop: dimens.xxl}]}>GISAR</Text>
        <Text style={[styles.text, {fontSize: dimens.l}]}>Selamat Datang</Text>
        <ButtonCustom
          title="Masuk"
          buttonStyle={{marginTop: dimens.l}}
          onPress={() => navigation.replace('MainNavigator')}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 30,
    color: colors.primary,
  },
});
export default Login;
