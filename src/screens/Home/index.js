import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import {GlobalContext} from '../../Store/globalContext';
import {getMoviesFromApi} from '../../services/TestConsume';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonCustom} from '../../components';

const Home = ({navigation, route}) => {
  const [location, setLocation] = useState(null);
  const [listLocation, setListLocation] = useState([
    {
      id: 1,
      latitude: -6.2131976,
      longitude: 106.8664648,
      name: 'Rumah Hafif',
    },
    // {
    //   id: 2,
    //   latitude: -6.2130846550645,
    //   longitude: 106.86638072133063,
    // },
    // {
    //   id: 1,
    //   name: 'Masjid Jami Pisangan Baru',
    //   latitude: -6.213063323428412,
    //   longitude: 106.86634585261345,
    // },
  ]);
  const [time, setTime] = useState(false);
  const [count, setCount] = useState(0.00123);
  const [stop, setStop] = useState(false);
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  const getData = async () => {
    const result = await getMoviesFromApi();
    console.log('result...', result);
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      // ToastAndroid.show(
      //   `Lat:${info.coords.latitude}, Long:${info.coords.longitude}`,
      //   ToastAndroid.SHORT,
      //   ToastAndroid.CENTER,
      // );
      setLocation({
        coordinate: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
      });
    });
    setTime(true);
  }, []);
  // useEffect(() => {
  //   time == true
  //     ? setTimeout(() => {
  //         Geolocation.getCurrentPosition(info => {
  //           console.log(info);

  //           setLocation({
  //             coords: {
  //               accuracy: 20,
  //               altitude: 36.60000228881836,
  //               heading: 0,
  //               latitude: info.coords.latitude + count,
  //               longitude: info.coords.longitude + count,
  //               speed: 0,
  //             },
  //             mocked: false,
  //             timestamp: 1660890566834,
  //           });
  //           setCount(count + 0.00123);
  //         });
  //       }, 1000)
  //     : false;
  // }, [location]);

  // useEffect(() => {
  //   time == true
  //     ? Geolocation.getCurrentPosition(info => {
  //         console.log(info);

  //         setLocation({
  //           coords: {
  //             accuracy: 20,
  //             altitude: 36.60000228881836,
  //             heading: 0,
  //             latitude: info.coords.latitude + count,
  //             longitude: info.coords.longitude + count,
  //             speed: 0,
  //           },
  //           mocked: false,
  //           timestamp: 1660890566834,
  //         });
  //         // ToastAndroid.show(
  //         //   `Lat:${info.coords.latitude}, Long:${info.coords.longitude}`,
  //         //   ToastAndroid.SHORT,
  //         //   ToastAndroid.CENTER,
  //         // );
  //         setCount(count + 0.00123);
  //       })
  //     : false;
  // }, [location]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (stop == false) {
      for (let i in listLocation) {
        console.log(i);
        if (
          listLocation[i].latitude.toFixed(4) ==
            location?.coordinate?.latitude.toFixed(4) &&
          listLocation[i].longitude.toFixed(4) ==
            location?.coordinate?.longitude.toFixed(4)
        ) {
          setStop(true);
          console.log('i berapa', i);
          Alert.alert(
            'Alert',
            'Lokasi bidang ditemukan',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  console.log('asd');
                },
                style: 'cancel',
              },
              {
                text: 'Open Simulasi AR',
                onPress: () => {
                  console.log('asd');
                  // setStop(false);
                  navigation.navigate('DetailAR', {name: listLocation[i].name});
                },
              },
            ],
            {
              cancelable: false,
            },
          );
        }
      }
    }
  }, [location]);
  useEffect(() => {
    setStop(false);
    const unsubscribe = navigation.addListener('focus', () => {
      setStop(false);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.body,
          {backgroundColor: dark ? colors.black : colors.white},
        ]}>
        {/* <ButtonCustom
          title="Hola"
          buttonStyle={{position: 'absolute', top: 100, zIndex: 100}}
          onPress={() => {
            // setLocation({
            //   coords: {
            //     accuracy: 20,
            //     altitude: 36.60000228881836,
            //     heading: 0,
            //     latitude: -6.212886004170122,
            //     longitude: 106.86637535691261,
            //     speed: 0,
            //   },
            //   mocked: false,
            //   timestamp: 1660890566834,
            // });
            Geolocation.getCurrentPosition(info => {
              console.log(info);
              ToastAndroid.show(
                `Lat:${info.coords.latitude}, Long:${info.coords.longitude}`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              setLocation(info);
            });
          }}
        /> */}
        <MapView
          showsUserLocation={true}
          onUserLocationChange={e => {
            console.log('alert', e.nativeEvent);
            setLocation(e.nativeEvent);
          }}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{height: '100%', width: '100%'}}
          region={{
            // latitude:
            //   location != null ? location.coordinate.latitude : 37.78825,
            // longitude:
            //   location != null ? location.coordinate.longitude : -122.4324,
            latitude: -6.2131976,
            longitude: 106.8664648,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: location != null ? location.coordinate.latitude : 0.001,
              longitude:
                location != null ? location.coordinate.longitude : 0.001,
              latitudeDelta: 0.0005,
              longitudeDelta: 0.0005,
            }}>
            <Icon name="person" size={50} color={colors.primary} />
          </Marker>
          {listLocation.map((value, key) => {
            return (
              <Marker
                key={key}
                coordinate={{
                  latitude: value.latitude,
                  longitude: value.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>
                <Icon name="location" size={50} color={colors.green} />
              </Marker>
            );
          })}
        </MapView>
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
    fontSize: dimens.xxl,
    color: colors.black,
  },
});
export default Home;
