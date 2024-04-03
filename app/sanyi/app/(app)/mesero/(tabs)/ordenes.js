import { View, ScrollView, SafeAreaView} from "react-native";
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon'

import {styles, card_button} from "../../../../src/styles/main"
import { router } from "expo-router";
export default function Settings() {
  const color = styles.primary_color
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={ card_button.card_btn_container}>
        <Text>Lol</Text>
      </ScrollView>
    </SafeAreaView>
  );
}