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
        <View style={card_button.card_btn_row} onTouchEnd={()=>{router.navigate('../categories')}}>
            <Card style={card_button.card_button}>
              <View style={card_button.center}>
                  <Icon source="food" color={color} size={28} />
                  <Text variant="headlineSmall">Gestión del Menú</Text>
                  <Text style={{textAlign:'center'}} variant="bodySmall">Categorías de los platos del menú y ofertas</Text>
              </View>
            </Card>
        </View>
        <View style={card_button.card_btn_row} onTouchEnd={()=>{router.navigate('../tables')}}>
            <Card style={card_button.card_button}>
              <View style={card_button.center}>
                  <Icon source="dots-square" color={color} size={28} />
                  <Text variant="headlineSmall">Mesas</Text>
                  <Text style={{textAlign:'center'}} variant="bodySmall">Gestión de las mesas del restaurante</Text>
              </View>
            </Card>
        </View>
        <View style={card_button.card_btn_row} onTouchEnd={()=>{router.navigate('../users')}}>
            <Card style={card_button.card_button}>
              <View style={card_button.center}>
                  <Icon source="account-cog" color={color} size={28} />
                  <Text variant="headlineSmall">Usuarios</Text>
                  <Text style={{textAlign:'center'}} variant="bodySmall">Gestión de las mesas del restaurante</Text>
              </View>
            </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}