import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, } from 'react-native';

import { CustomModal, AddTask } from "./components/index";

// Estilos creados como un objetos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  // justifyContent: 'center',
   //alignItems: 'center',
  },
 
  itemList:{
    //ocupa todo el espacio disponible
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    
  },
  itemContainer:{
    flex: 1,
    borderColor: '#c69b64',
    borderWidth: 2,
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
   // width: '74%',
  },
  item:{
   color: '#c69b64',
   fontSize: 18,
  },
 
  delete: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C2C2C2',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 30,
    
  },
  modalTitle: {
    fontSize: 14,
  },
  modalMessageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalMessage:{
    fontSize: 16,
  }, 
 
  selectedTask:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  }
 
});

//sintaxis de creacion de componentes - jsx
export default function App() {

  const [task, setTask] = useState(''); 
  const [tasks, setTasks] = useState([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  
  const onHandleChangeText = (text) => {
    console.log('se ejecuta: ', text),
    setTask(text);
  }

  const addItem = () => {   
    setTasks((prevTasks) =>[
      ...prevTasks, 
      {id:tasks.length + 1 , value: task},
    ]);
    //limpio
    setTask('');
  }

  const onHandleModal = ( id ) => {
    setModalVisible(!modalVisible);
    setSelectedTask(tasks.find((item) => item.id == id))
    console.warn(id);
  }
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}> {item.value} </Text>
      <TouchableOpacity onPress={() => onHandleModal(item.id)}>
        <Text style={styles.delete}> x </Text>
      </TouchableOpacity>
    </View>      
  )

  const onHandleDeleteItem = (id) =>{
    setTasks(tasks.filter((item) => item.id !== id));
    setSelectedTask(null);
    setModalVisible(!modalVisible);
  }
  return (
    //View - contenedor principal
    //  
    <View style={styles.container}> 
      
      <AddTask
        item={task}
        onChangeText={onHandleChangeText }
        placeholder= 'Escribe el producto que buscas'
        addItem={ addItem}
        selectionColor= '#c69b64'
        placeholderTextColor='#C2C2C2'
        textButton='Agregar'
        color='#c69b64'
      />
      
      <FlatList
        style={styles.itemList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

        <CustomModal animationType='slide' visible={modalVisible} style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalle del item</Text>
          </View>
          <View style={styles.modalMessageContainer}>
            <Text style={styles.modalMessage}>¿Esta seguro que desea eliminar este item?</Text>
          </View>
          <View style={styles.modalMessageContainer}>
            <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title='eliminar'
              onPress={() => onHandleDeleteItem(selectedTask?.id)}
              color='#c69b64'
             />
             <Button 
              title='Cancelar'
              onPress={() => setModalVisible(!modalVisible)}
              color='#C2C2C2'
             />
          </View>
        </CustomModal>
    </View>
  );
}
