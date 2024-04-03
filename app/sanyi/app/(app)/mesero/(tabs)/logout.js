import { Text, View } from 'react-native';

import { useSession } from '../../../../ctx';
import { useEffect } from 'react';

export default function Logout() {
  const { signOut } = useSession();
  useEffect( ()=>{
    signOut();
  },[] )
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
          Saliendo
      </Text>
    </View>
  );
}