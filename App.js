import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, ScrollView } from 'react-native';
import Task from './components/task';

export default function App() {
  const [task,setTask] = useState();
  const[taskItems,setTaskItems] = useState([]);

  const handleAddTask = ()=>{
    Keyboard.dismiss();
    if(task){
      setTaskItems([...taskItems,task]);
      setTask(null);
    }
  }

  const deleteall = ()=>{
     let itemsCopy =[];
     setTaskItems(itemsCopy)
  }

  const completeTask = (index)=>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow:1}}
      >
        <Text style={{
          backgroundColor:"#0AD6A0",
          marginTop:25,
          color:"white",
          textAlign:"center",
          fontSize:20,
          padding:10,
          fontWeight:"700",
        }}>
         My todo App
        </Text>
        <TouchableOpacity style={styles.removeall} onPress={()=> deleteall()}>
          <Text style={styles.removealltext}>Remove all</Text>
        </TouchableOpacity>

        <View style={styles.items}>
          {taskItems.map((item,index)=>{
            return(
              <TouchableOpacity key={index} style={styles.todocard}>
                 <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                    <Image source={require('./images/trash.png')} style={{width:25,height:25, marginLeft:20}}/>
                 </TouchableOpacity>
                 <Task text={item}/>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

     <KeyboardAvoidingView style={styles.writeTaskWrapper}>
      <TextInput placeholder='Enter Your Task'
      style={styles.inputbox} value={task}
      onChangeText={(text) =>{setTask(text)}}/>

      <TouchableOpacity onPress={()=>handleAddTask()}>
        <Image source={require('./images/addition.png')} style={{width:25,height:25,justifyContent:"flex-end"}}/>
      </TouchableOpacity>
     </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputbox:{
    fontSize:18,
    width:"90%"
  },
  removeall:{
    flex:0,
    justifyContent:"flex-end",
    width:"100%",
    flexDirection:"row",
    margin:10
  },
  removealltext:{
    fontSize:17,
    fontWeight:"700",
    backgroundColor:"#FF5757",
    width:110,
    color:"white",
    textAlign:"center",
    padding:5,
    borderRadius:10,
    marginRight:15,
  },
  writeTaskWrapper:{
    flex:0,
    flexDirection:"row",
    width:"90%",
    margin:20,
    borderRadius:10,
    borderWidth:1,
    padding:10,
  },
  todocard:{
    flex:0,
    flexDirection:"row",
    margin:10,
    borderWidth:1,
    borderRadius:15,
    alignItems:"center"
  }
});
