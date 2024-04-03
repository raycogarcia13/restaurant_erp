import { Text, View } from 'react-native';
import {useEffect} from 'react';
import { useSession } from '../../ctx';
import { router } from 'expo-router';

export default function Index() {
  const {  session } = useSession();

  useEffect( ()=>{
    const data = JSON.parse(session)

    if(data.user.role.rol == 'Administrador')
      router.replace('/admin')
    else if(data.user.role.rol == 'Mesero')
      router.replace('/mesero')
  },[session] )

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          // signOut();
        }}>
        Logout
      </Text>
    </View>
  );
}