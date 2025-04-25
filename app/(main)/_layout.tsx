import { Stack, Tabs } from 'expo-router';

export default function IntroLayout() {
  return (
    <Stack>
        <Stack.Screen name='logs' options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='adventures' options={{headerShown: false}}></Stack.Screen>
    </Stack>
  );
}