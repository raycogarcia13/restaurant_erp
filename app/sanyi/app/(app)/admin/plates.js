import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Surface, Dialog, IconButton, Modal, Switch, Text, TextInput } from 'react-native-paper';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import {styles, card_button} from "../../../src/styles/main"
import {server, all_prod, add, update_prod} from "../../../src/api/products"
import Icon from 'react-native-paper/src/components/Icon';
import { router, useLocalSearchParams } from 'expo-router';

export default function Plates() {
    const category = useLocalSearchParams()
    
    const color = styles.primary_color
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [confirm_visible, setConfirm] = useState(false);

    const [all, setAll] = useState([]);
    const [selected, setSelected] = useState(null);
    
    const [name, setName] = useState('');
    const [manufactured, setManu] = useState(true);
    const [enabled, setEnabled] = useState(true);
    const [price, setPrice] = useState('0');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const [dialog_text, setDialog_text] = useState("");

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false)
        setDefault()
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0]);
        }
      };

    const fill_data = (data) =>{
        setAll(data)
    }
    const loadData = async () =>{
        const data = await all_prod(category.category_id);
        if(data){
            fill_data(data.data)
        }else{
            alert("Error de comunicacion con el servidor")
        }
        setLoading(false)
    }

    const setDefault = () =>{
        setDialog_text(`Está seguro de querer eliminar la categoría" ${selected?.name}`)
        setVisible(false);
        setConfirm(false);
        setSelected(null);
        
        setName('');
        setPrice('0');
        setDescription('');
        setEnabled(true);
        setManu(true);
        setImage(null);
    }

    // const delete_data = async () =>{
    //     setLoading(true);
    //     const data = await remove_cat(selected._id);
    //     if(!data){
    //         setDialog_text('Error de servidor')
    //     }else{
    //         fill_data(data.data)
    //     }
    //     setLoading(false)
    //     setDefault()
    // }

    const add_data = async () =>{
        setLoading(true);
        const data = await add(name, image.uri, price, manufactured, description, category.category_id, enabled)
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }

    useEffect( ()=>{
        loadData()
        setDefault()
    },[] )
    
    const edit_data = async () =>{
        setLoading(true);
        const data = await update_prod(selected._id, name, image.uri, price, manufactured, description, category.category_id, enabled)
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }

    const onEdit = (it) =>{
        setSelected(it)
        setName(it.name);
        setPrice(it.price+"");
        setImage(server+it.picture);
        setDescription(it.description);
        setManu(it.manufactured)
        setEnabled(it.enabled)
        setVisible(true);

    }

    useEffect( ()=>{
        loadData()
        setDefault()
    },[] )

const Items = all.map(it=>{
        return <Surface key={it._id} style={card_button.product} onTouchEnd={ ()=>{onEdit(it)} }>
            <Image style={card_button.product_image} source={server+it.picture} width='100%' height='100%'/>
            <View style={card_button.product_info}>
                <Text style={{fontSize:20}}>${it.price}</Text>
                <Text style={{fontWeight:'bold'}}>{it.name}</Text>
                <Text style={{textAlign:'justify',flexWrap: 'wrap'}} variant="bodySmall">{it.description}</Text>
                <Chip style={{marginTop:10}} selectedColor={!it.enabled ? 'red' : color} icon={it.enabled ? 'check' : 'cancel'}> {it.enabled ? "Menú" : "No disponible"} </Chip>
            </View>
        </Surface>
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
            <ScrollView style={{margin:10}}>
                {Items}
            </ScrollView>
            <Dialog visible={confirm_visible} onDismiss={setDefault}>
                <Dialog.Title>Atención</Dialog.Title>
                <Dialog.Content>
                <Text variant="bodyMedium">{dialog_text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button 
                  // onTouchEnd={delete_data}
                  >Aceptar</Button>
                </Dialog.Actions>
            </Dialog>

                <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
                    <Card style={{padding:20}}>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Nombre del producto" value={name} onChangeText={text => setName(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Precio" value={price} keyboardType='decimal-pad' onChangeText={text => setPrice(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Descripción" value={description} onChangeText={text => setDescription(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <View style={{position:'relative'}}>
                                <Switch color={color} style={{position:'absolute', left:'35%', bottom:-15}} value={manufactured} onValueChange={()=>setManu(!manufactured)} />
                                <Text>LLeva preparación</Text>
                            </View>
                            
                            <View style={{position:'relative', marginTop:20}}>
                                <Switch color={color} style={{position:'absolute', left:'35%', bottom:-15}} value={enabled} onValueChange={()=>setEnabled(!enabled)} />
                                <Text>Disponible</Text>
                            </View>
                        </View>
                        <View style={{marginVertical:10, textAlign:'center'}}>
                            {image && <Image source={image.uri ? { uri: image.uri } :image } style={{ width: 200, height: 200 }} />}
                            <Button icon="camera" onPress={pickImage}>Esoja una foto</Button>
                        </View>

                        <Card.Actions>
                            <Button onTouchEnd={hideModal}>Cancelar</Button>
                            <Button 
                              onTouchEnd={selected ? edit_data : add_data}
                              >
                                {selected ? 'Actulizar' : 'Insertar'}
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>

            {
            !visible ? 
                <IconButton 
                    style={styles.action_btn} 
                    size={40} 
                    mode='contained' 
                    icon="plus"
                    onPress={showModal} 
                />
            :
            <></>
            }
        </SafeAreaView>
    }
  </>
  );
}