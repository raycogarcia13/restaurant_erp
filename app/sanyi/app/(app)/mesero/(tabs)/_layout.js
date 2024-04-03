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
          title: 'Atención',
          headerShown:false,
          tabBarIcon: ({ color }) =>   <Icon source="account-supervisor" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="ordenes"
        options={{
          headerShown:false,
          title: 'Mis órdenes',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
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