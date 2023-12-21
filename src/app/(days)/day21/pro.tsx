import { View, Text } from 'react-native';
import React from 'react';
import Purchases from 'react-native-purchases';
import { Redirect } from 'expo-router';

const ProScreen = () => {
  const isSubscribed = false;

  if (!isSubscribed) {
    return <Redirect href={'/day21/paywall'} />;
  }

  return (
    <View>
      <Text style={{ fontSize: 20 }}>Pro Screen for subscribed users only</Text>
    </View>
  );
};

export default ProScreen;
