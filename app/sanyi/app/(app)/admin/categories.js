import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Badge, Button, Card, Chip, Dialog, IconButton, Modal, Switch, Text, TextInput } from 'react-native-paper';

import {styles, card_button} from "../../../src/styles/main"
import {all_cat,add_cat, update_cat, remove_cat} from "../../../src/api/categories"
import Icon from 'react-native-paper/src/components/Icon';
import { router } from 'expo-router';

export default function Categories() {
    const color = styles.primary_color
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [confirm_visible, setConfirm] = useState(false);

    const [all, setAll] = useState([]);
    const [selected, setSelected] = useState(null);
    
    const [name, setName] = useState('');
    const [bar, setBar] = useState(false);

    const [dialog_text, setDialog_text] = useState("");

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false)
        setDefault()
    };

    const fill_data = (data) =>{
        setAll(data)
    }
    const loadData = async () =>{
        try{
            const data = await all_cat();
            fill_data(data.data)
        }catch(e){
            alert("Error de conexión con el servidor")
        }
        setLoading(false)
    }

    const setDefault = () =>{
        setDialog_text(`Está seguro de querer eliminar la categoría" ${selected?.name}`)
        setVisible(false);
        setConfirm(false);
        setSelected(null);
        setName('');
        setBar(false);
    }

    const delete_data = async () =>{
        setLoading(true);
        const data = await remove_cat(selected._id);
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }

    const add_data = async () =>{
        setLoading(true);
        const data = await add_cat(name, bar)
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
        const data = await update_cat(selected._id,name, bar)
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

const Items = all.map(i=>{
    return <View key={`${i._id}${Math.random()}`} style={card_button.card_btn_row}>
        <Card  style={card_button.card_button}>
                    <View style={card_button.center} onTouchEnd={ ()=>{
                        router.push({pathname:'./plates',params:{category_id:i._id, name:i.name}})
                    } }>
                        <Icon source={i.bar ? 'cup' : 'format-list-text'} color={color} size={28} />
                        <Text variant="headlineSmall">{i.name}</Text>
                        <Text style={{textAlign:'center'}} variant="bodySmall">{i.items?.length || 0} Productos</Text>
                    </View>
                    <Card.Actions>
                        <View style={card_button.center}>
                            <View style={{flexDirection:'row'}}>
                                <IconButton icon="pencil" onTouchEnd={()=>{
                                    setSelected(i); 
                                    setName(i.name)
                                    setBar(i.bar)
                                    setVisible(true)
                                    }} iconColor='green' />
                                <IconButton icon="delete" onTouchEnd={()=>{
                                        setSelected(i);
                                        setDialog_text(`Está seguro de querer eliminar la categoría ${i.name}`)
                                        setConfirm(true)
                                    }} iconColor='#c00000' />
                            </View>
                        </View>
                    </Card.Actions>
                </Card>
      </View>
}) 

  return (<>
        { 
        loading ? 
        <SafeAreaView style={styles.container_center}>
            <ActivityIndicator animating={true} color={color} size='large'/>
            <Text>Cargando ...</Text>
        </SafeAreaView>
        :
        <SafeAreaView style={[styles.content,{flex:1}]}>
            <ScrollView style={ card_button.card_btn_container}>
                {Items}
            </ScrollView>
            <Dialog visible={confirm_visible} onDismiss={setDefault}>
                <Dialog.Title>Atención</Dialog.Title>
                <Dialog.Content>
                <Text variant="bodyMedium">{dialog_text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onTouchEnd={delete_data}>Aceptar</Button>
                </Dialog.Actions>
            </Dialog>

                <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
                    <Card style={{padding:20}}>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Nombre de la categoría" value={name} onChangeText={text => setName(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <View style={{position:'relative'}}>
                                <Switch color={color} style={{position:'absolute', left:'35%', bottom:-15}} value={bar} onValueChange={()=>setBar(!bar)} />
                                <Text>Categoría del Bar</Text>
                            </View>
                        </View>

                        <Card.Actions>
                            <Button onTouchEnd={hideModal}>Cancelar</Button>
                            <Button onTouchEnd={selected ? edit_data : add_data}>{selected ? 'Actulizar' : 'Insertar'}</Button>
                        </Card.Actions>
                    </Card>
                </Modal>

            <IconButton 
                style={styles.action_btn} 
                size={40} 
                mode='contained' 
                icon="plus"
                onPress={showModal} 
                />
        </SafeAreaView>
    }
  </>
  );
}