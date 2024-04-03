import { Stack } from 'expo-router/stack';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="tables" options={{ title:"Gestionar Mesas" }} />
      <Stack.Screen name="categories" options={{ title:"Categorías del Menú" }} />
      <Stack.Screen name="plates" options={{ title:"Productos de la categoría" }} />
      <Stack.Screen name="users" options={{ title:"Gestión de usuarios" }} />
    </Stack>
  );
}