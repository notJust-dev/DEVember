import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationsHomeScreen = () => {
  return (
    <View>
      <Text>Notifications</Text>

      <Button
        title="Schedule test notifications"
        onPress={schedulePushNotification}
      />
    </View> 
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Check out the new Tinder Swipe Animation! 📬',
      body: 'Here is the notification body',
      data: { data: 'goes here', url: '/day6/tinder' },
    },
    trigger: { seconds: 5 },
  });
}

export default NotificationsHomeScreen;
