import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from 'react-native-paper/src/components/Icon'
import { Tabs } from 'expo-router';
import { useSession } from '../../../../ctx';

export default function TabLayout() {
  const { signOut } = useSession();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#f7ac03' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Análisis',
          headerShown:false,
          tabBarIcon: ({ color }) =>   <Icon source="graph" color={color} size={28} />,
        //   tabBarIcon: ({ color }) => <FontAwesome size={28} name="folder-table" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown:false,
          title: 'Restaurante',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          headerShown:false,
          unmountOnBlur: true,
          title: 'Menú',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="qrcode" color={color} />,
        }}
      />
      <Tabs.Screen
        name ="logout"
        options={{
          title: 'Salir',
          onTouchEnd: () => signOut,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="sign-out" color={color} />,
        }}
      />
    </Tabs>
  );
}