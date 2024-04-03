import { Redirect, Slot } from 'expo-router';

import { useSession } from '../../ctx';
import { Text } from 'react-native-paper';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}