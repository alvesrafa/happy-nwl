import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarkerImg from '../images/map-marker.png';
import api from '../services/api';

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);
  const [initialPosition, setInitialPosition] = useState([0, 0]);
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }
  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert(
        'Precisamos da sua localização para nos posicionarmos corretamente.'
      );
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setInitialPosition([latitude, longitude]);
  }
  useEffect(() => {
    getLocation();
  }, []);
  useFocusEffect(() => {
    api
      .get('orphanages')
      .then((response) => {
        console.log('Aquiiiiiiii');
        console.log(response.data);
        if (response.data.success) {
          setOrphanages(response.data.content);
        } else {
          console.log(
            response?.data?.message ||
              `Falha ao buscar orfanatos -> ${response.data}`
          );
        }
      })
      .catch((e) => {
        console.log(
          e?.response?.data?.message || `Falha ao buscar orfanatos -> ${e}`
        );
      });
  });

  if (initialPosition[0] === 0 && initialPosition[1] === 0) return null;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={styles.mapStyle}
      >
        {orphanages &&
          orphanages.map((orphanage) => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarkerImg}
                calloutAnchor={{ x: 2.7, y: 0.8 }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              >
                <Callout
                  tooltip={true}
                  onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanage}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3,
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanage: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
