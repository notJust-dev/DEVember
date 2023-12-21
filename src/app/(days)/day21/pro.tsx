import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import { Redirect } from 'expo-router';

const ProScreen = () => {
  // const isSubscribed = false;
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    checkSubscribtion();
  }, []);

  const checkSubscribtion = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      if (typeof customerInfo.entitlements.active['Premium'] !== 'undefined') {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    } catch (e) {
      // Error fetching purchaser info
    }
  };

  if (isSubscribed === undefined) {
    return <ActivityIndicator />;
  }

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
