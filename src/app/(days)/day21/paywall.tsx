import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Purchases from 'react-native-purchases';

const Paywall = () => {
  const fetchOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log(JSON.stringify(offerings.current, null, 2));

      if (offerings.current !== null) {
        // Display current offering with offerings.current
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  return (
    <View>
      <Text>Paywall</Text>
    </View>
  );
};

export default Paywall;
