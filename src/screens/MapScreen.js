import MapboxGL from '@rnmapbox/maps';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import keys from '../constants/keys';

const MapScreen = () => {
  const [deviceLocation, setDeviceLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const getLatLongAndLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        // 1. Request FINE location for android
        let fineStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (fineStatus !== RESULTS.GRANTED) {
          fineStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (fineStatus === RESULTS.GRANTED) {
          // 2. Request BACKGROUND location (only Android 10+ shows dialog)
          let backgroundStatus = await check(
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
          );
          if (backgroundStatus !== RESULTS.GRANTED) {
            backgroundStatus = await request(
              PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            );
          }

          Geolocation.getCurrentPosition(
            position => {
              setDeviceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });

              console.log('showlatlong', position.coords.latitude);
              console.log('showlatlong', position.coords.longitude);
            },
            error => {
              console.warn('Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );

          return {
            fine: fineStatus,
            background: backgroundStatus,
          };
        } else {
          return {
            fine: fineStatus,
            background: RESULTS.DENIED,
          };
        }
      } else if (Platform.OS === 'ios') {
        // iOS permission check
        let whenInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (whenInUse !== RESULTS.GRANTED) {
          whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        let always = RESULTS.DENIED;
        if (whenInUse === RESULTS.GRANTED) {
          always = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
          if (always !== RESULTS.GRANTED) {
            always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
          }

          Geolocation.getCurrentPosition(
            position => {
              setDeviceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.warn('Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }

        return {
          whenInUse,
          always,
        };
      }
    } catch (error) {
      console.warn('Permission check/request error:', error);
      return null;
    }
  };

  useEffect(() => {
    getLatLongAndLocationPermission();
    MapboxGL.setAccessToken(keys.mapboxPublicToken);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <StatusBar backgroundColor="#171717" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {deviceLocation.latitude && deviceLocation.longitude ? (
            <MapboxGL.MapView style={{ flex: 1 }}>
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[
                  deviceLocation.longitude,
                  deviceLocation.latitude,
                ]}
              />
              <MapboxGL.PointAnnotation
                id="currentLocation"
                coordinate={[deviceLocation.longitude, deviceLocation.latitude]}
              />
            </MapboxGL.MapView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{`Loading Maps`}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MapScreen;
