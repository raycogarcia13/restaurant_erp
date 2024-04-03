import QRCode from 'react-native-qrcode-svg';
import { Share } from 'react-native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Appbar, List, Dialog,  Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';


import {styles, card_button} from "../../../../src/styles/main"
import {server, menu_prod} from "../../../../src/api/products"

export default function QRcode() {
   const [menu, setMenu] = useState([])
   const [loading, setLoading] = useState(false);
   const [qrVisible, setQr] = useState(false);

   const color = styles.primary_color

   const loadData = async () =>{
    setLoading(true)
    const data = await menu_prod();
    if(data){
        setMenu(data.menu)
    }else{
        alert("Error de comunicacion con el servidor")
    }
    setLoading(false)
  }

   useEffect( ()=>{
    loadData()
   },[] )

   const shareit = async () =>{
      try {
          await Share.share({
              message: `${server}menu`
          });
      } catch (error) {
          console.error('Error sharing:', error);
      }
   }

   const Items = menu.map(it=>{
      const subs = it.products.map(i=>{
        return <List.Item 
          key={`product_menu_${i._id}`} 
          title={i.name} 
          left={() => <Image style={card_button.image_menu} source={server+i.picture} height={50} />}
          right={() => <Text style={{fontWeight:'bold', marginTop:15}}>${i.price}</Text>}
          />
      })

    return <List.Accordion key={`cat_menu_${it.cat_id}`} title={it.cat_name} id={it.cat_id}>
        {subs}
      </List.Accordion>
  }) 

   
  return (<>
    {
      loading ? 
        <SafeAreaView style={styles.container_center}>
            <ActivityIndicator animating={true} color={color} size='large'/>
            <Text>Cargando ...</Text>
        </SafeAreaView>
        :
      <SafeAreaView style={{flex:1}}>
         <Appbar.Header style={{justifyContent:"flex-end"}}>
          <Appbar.Action icon="qrcode" onPress={() => {setQr(true)}} />
        </Appbar.Header>
         <ScrollView style={{margin:10}}>
          <List.AccordionGroup>
              {Items}
          </List.AccordionGroup>
          </ScrollView>
          <Dialog visible={qrVisible} onDismiss={()=>{setQr(false)}}>
            <Dialog.Content>
                <QRCode
                  value={`${server}menu`}
                  logo={`${server}public/img/logo.png`}
                  size={300}
                  logoBackgroundColor='white'
                />
                <Button icon="share" onTouchEnd = {shareit}>Compartir</Button>
            </Dialog.Content>
          </Dialog>

      
      </SafeAreaView>
  }
  </>
  );
}