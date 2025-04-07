import { Stack, Tabs } from 'expo-router';

export default function IntroLayout() {
  return (
    <Stack>
        <Stack.Screen name='login' options={{headerShown: false}}></Stack.Screen>
    </Stack>
  );
}