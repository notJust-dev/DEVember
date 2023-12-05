import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

const CustomMarker = ({ apartment, onPress }) => {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: apartment.latitude,
        longitude: apartment.longitude,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 20,
        }}
      >
        <Text style={{ fontFamily: 'InterBold' }}>$ {apartment.price}</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;
