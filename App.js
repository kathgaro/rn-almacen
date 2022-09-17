import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, } from 'react-native';


// Estilos creados como un objetos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  // justifyContent: 'center',
   //alignItems: 'center',
  },
  inputContainer:{
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
  input: {
    width: '75%',
    //marginBottom: 25,
    borderBottomColor: '#2C514C',
    borderBottomWidth: 1,
    height: 40,
    color: '#2C514C',
    //flex: 1,
    //marginRight: 20,
   // fontSize: 20,
  },
  itemList:{
    //ocupa todo el espacio disponible
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  itemContainer:{
    flex: 1,
    backgroundColor: '#2C514C',
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
   color: 'white',
   fontSize: 16,
  },
 
  delete: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 16,
  },
  modalMessageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalMessage:{
    fontSize: 14,
  }, 
 
  selectedTask:{
    fontSize: 16,
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
    <View style={styles.container}> 
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Ingresa texto ' 
        style={styles.input} 
        selectionColor='#E3C0D3'
        onChangeText={onHandleChangeText}
        //Asigno el valor del estado
        value={task}
        /> 
        <Button 
        title='add' 
        /**
         * onPress={() => console.warn('Aun no funciona este boton!')} 
         * 
         * Agrego item con onPress={addItem} 
         */
        onPress={addItem} 
        color='#2C514C'/>
      </View>
      
        <FlatList
          style={styles.itemList}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        <Modal animationType='slide' visible={modalVisible} >
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
              color='gray'
             />
             <Button 
              title='Cancelar'
              onPress={() => setModalVisible(!modalVisible)}
              color='black'
             />
          </View>
        </Modal>
    </View>
  );
}
