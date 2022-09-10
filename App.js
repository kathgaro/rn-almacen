import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, } from 'react-native';

// Estilos creados como un objetos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center',
  },
  inputContainer:{
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
   flexDirection: 'row',
   justifyContent: 'space-between',
   

  },
  input: {
    //marginBottom: 25,
    borderBottomColor: '#2C514C',
    borderBottomWidth: 1,
    height: 40,
    color: '#2C514C',
    flex: 1,
    marginRight: 20,
    fontSize: 20,
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
    borderRadius: 6,
    width: '74%',
  },
  item:{
   color: 'white',
   fontSize: 16,
   
  },
  itemList:{
    //ocupa todo el espacio disponible
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  delete: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 20,
    paddingVertical: 20,
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 16,
  },
  modalMessage:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  }, 
  modalMessageContainer:{
    fontSize: 14,
  },
  selectedTask:{
    fontSize: 16,
    color: 'black',
    fontWeight: 700,
  }
 
});

//sintaxis de creacion de componentes - jsx
export default function App() {
// P A S O 1
  //Almacenamos lo que se ingresa en el input - En este caso en una memoria (ya que aun no tengo una api ni una base de datos), es decir, "en un estado de tiempo de ejecucion"
  //Debo setear 2 estados - 1. Obtengo/sete/asigno lo que he escrito en el "input" y 2. Arreglo con valores que he "guardado" dentro del "input" que almacenamos aparte para luego poder visualizarlo.
  //En react native -mobile- no existe el concepto "formulario" sino "campo editable" se hacen "edit Text"

  //  Iniciando nuestro estado, inicia vacio.
  //             ↱ Funcion que me permite asignar un valor del estado
  //                        ↱ Inicio mi estado como cadena/string vacio (porque mi input recibe texto)
  const [task, setTask] = useState(''); 
//        ↳ Lo que ingreso dentro de "input", estado inicial

//  Inicio los datos que recibire, inicia vacio.
  const [tasks, setTasks] = useState([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onHandleChangeText = (text) => {
    setTask(text)
  }
  // Corroboro que funciona
  console.warn('task', task)
  console.warn('tasks', tasks)



  // Limpiando el input al agregar
      // Opcion manejando un arreglo
  const addItem = () => {
    //  ↱ Asigno grupo de tareas
    //            ↱ Copia de arreglo vacio       
    setTasks((prevTasks) =>[
      ...prevTasks, 
      // ↱ Nuevo con id para identificar un valor generico 
      {
        // Math.random().toString() -> Numero random
        // tasks.length + 1 -> Registro consevutivo
        // tasks[tasks.length -1].id + 1 -> Acceso al ultimo id del arreglo y empiezo a agregar uno mas. Me devuelve erro al iniciar en 0
        // Date.now

        id:tasks.length + 1 ,
        //Asigno valor de campo, del estado
        value: task,
      }
    ]);
    //limpio
    setTask('')
  }

  //Usando un arreglo de objetos
  /**
   *  OPCION MANEJANDO STRING
   *      ↱ Nombre de mi funcion
  const addItem = () => {
      ↱ Asigno grupo de tareas
                ↱ Copia de tarea
                        ↱ Nuevo valor de tarea        
    setTask([...tasks, task])
  }
   */

/**
 * Boton que use antes:
 *  <TextInput 
        placeholder='Ingresa tu nombre' 
        style={styles.input} 
        selectionColor='#E3C0D3'
        /> 
        
 */

//    RENDER - MOSTRANDO EN PANTALLA LOS DATOS OBTENIDOS
/**
 * hacemos un map para recorer la lista -linea 66
 */

const onHandleModal = ( id ) => {
  setModalVisible(!modalVisible);
  setSelectedTask(tasks.find((item) => item.id == id))
  console.log(id);
}
const renderItem = ({item}) => (
 
          <View
          key={`item-${item.id}`} 
          style={styles.itemContainer}
          >
            <Text style={styles.item}> {item.value} </Text>

          <TouchableOpacity 
          //Elimino item de lista
          onPress={() => onHandleModal(item.id)}>
            <Text style={styles.delete}> x </Text>
          </TouchableOpacity>

          </View>
        
)
  return (
    //View - contenedor principal
    <View style={styles.container}> 
     
      <View style={styles.inputContainer}>
        <TextInput 
        //TextInput - Tiene muchos eventos 
        placeholder='Ingresa texto ' 
        style={styles.input} 
        selectionColor='#E3C0D3'
        //Me retorna el valor de lo que escribo en el campo
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
      <View>
      
        {        /**tasks.map((item) => (
          //                ↳ Me devuelve un componente "view"
          //          ↳ Me devuelve cada item
         //   ↳ Recorro la lista de mi arreglo

          <View 
          //React necesita un identificados unico para cada uno de los arreglos que estamos recorriendo por eso usamos una "key", le paso el valor "item.id" para cada elemento de mi arreglo.
          key={`item-${item.id}`} 
          style={styles.itemContainer}
          >
            <Text style={styles.item}> {item.value} </Text>
          </View>
        )) COMENTA PORQUE USAR LO SIGUIENTE ("FLATLIST")*/}
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
              
            ></Button>
          </View>
        </Modal>
    </View>
  );
}
