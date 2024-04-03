import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';
import {  MD3LightTheme as DefaultTheme, PaperProvider, Text } from 'react-native-paper';

export default function Root() {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: "#f7ac03",
            secondary: "#663399",
            tertiary: "rgb(128, 81, 88)"
        }
      };
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
         <PaperProvider theme={theme}>
            <Slot />
         </PaperProvider>
    </SessionProvider>
  );
}