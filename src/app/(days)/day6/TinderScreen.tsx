import TinderCard from '@/components/day6/TinderCard';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { users } from './tinder';

export const TinderScreen = () => {
  const activeIndex = useSharedValue(0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />

      {users.map((user, index) => (
        <TinderCard
          key={user.id}
          user={user}
          numOfCards={users.length}
          index={index}
          activeIndex={activeIndex}
        />
      ))}
    </View>
  );
};
