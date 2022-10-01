import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { initializeApp } from'firebase/app';
import { firebase, getDatabase, push, ref, onValue, remove, database } from'firebase/database';


export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCHV4l3YVM0rqHp7Wrvu_1xwBYDkHNCOdA",
    authDomain: "shoppinglist-fire.firebaseapp.com",
    databaseURL: "https://shoppinglist-fire-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-fire",
    storageBucket: "shoppinglist-fire.appspot.com",
    messagingSenderId: "544398334624",
    appId: "1:544398334624:web:ceabc142ec81cbc3d447c5",
    measurementId: "G-L57V1091HV"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);



const [product, setProduct] = useState('');
const [amount, setAmount] = useState('');
const [items, setItems] = useState([]);

  
const saveProduct = () => {
  push(
    ref(database, 'items/'),
    { 'product': product, 'amount': amount }
  );
}


useEffect(() => {
  const itemsRef = ref(database, 'items/');
  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    setItems(Object.values(data));
    console.log((Object.values(data)))
  })
 

}, []);

const deleteProduct = (item) => {
  remove(
    ref(database, 'items/' + item.Key),
  )

  }
  

const listSeparator = () => {
  return(
    <View
      style={{
        height: 5,
        width: '80%',
        backgroundColor: '#fff',
        marginLeft: '10%'
      }}
    />
  );
};

  return (
    <View style={styles.container}>
      
      <TextInput
        style={ styles.input }
        keyboardType='default'
        onChangeText={ product => setProduct(product) }
        value={ product }
        placeholder='Product'
      />

      <TextInput
        style={ styles.input }
        keyboardType='default'
        onChangeText={ amount => setAmount(amount) }
        value={ amount }
        placeholder='Amount'
      />

      <View style={ styles.button }>
        <Button title='Save'
          onPress={ saveProduct } 
        />
      </View>

      <Text style={{ fontSize: 18, marginTop: 3 }}>Shopping list</Text>

      <FlatList
        style={ styles.list }
        keyExtractor={ item => item.Key }
        renderItem={ ({ item }) => 
        <View style={ styles.listcontainer }>
          <Text>
            { item.product }
            
            <Text>, </Text>
            { item.amount }
          </Text>
          <Text style={{ color: '#0000ff' }}onPress={() => deleteProduct(items.Key) }>Delete</Text>
            </View> }
      data={ items }
      ItemSeparatorComponent={ listSeparator }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  input : {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
button : {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '20%',
    height: 40
  },
text : {
    color: 'black',
    fontSize: 20,
    marginBottom: 4,
  },
list : {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
listcontainer : {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
},
});