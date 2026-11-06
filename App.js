import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';

export default function App() {
  const [dishes, setDishes] = useState([
    { id: '1', name: 'GRILLED STEAK', price: 'R180.00', course: 'Main', description: 'Juicy steak' },
    { id: '2', name: 'CAESAR SALAD', price: 'R95.00', course: 'Starter', description: 'Fresh salad' },
    { id: '3', name: 'CHOCOLATE CAKE', price: 'R65.00', course: 'Dessert', description: 'Sweet cake' },
  ]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEitingId] =useState( '');

  const addDish = () => {
    if (!name || !price || !course) {
      return Alert.alert('Error', 'Please fill Name, Price and Course');
    }
    setDishes([...dishes, { 
      id: Date.now().toString(), 
      name: name.toUpperCase(), 
      price: `R${price}`, 
      course: course,
      description: desc 
    }]);
    setName(''); setPrice(''); setCourse(''); setDesc('');
    Alert.alert('Success', 'Dish Added!');
  };

const getStats = () => {
  const total = dishes.length;
  const starters = dishes.filter(d => d.course.toLowerCase().includes('starter')).length;
  const mains = dishes.filter(d => d.course.toLowerCase().includes('main')).length;
  const desserts = dishes.filter(d => d.course.toLowerCase().includes('dessert')).length;
  const prices = dishes.map(d => parseFloat(d.price.replace('R','')) || 0);
  const avg = prices.length ? (prices.reduce((a,b)=>a+b,0)/prices.length).toFixed(2) : 0;
  return { total, starters, mains, desserts, avg };
};
const stats = getStats();
  const deleteDish = (id) => {
    setDishes(dishes.filter(d => d.id !== id));
  };
  const editDish = (dish) =>{
    setName(dish.name) ;
    setPrice(dish.price.replace('R' ,''));
    setCourse(dish.course);
    setDesc(dish.description);
    setEditingId(dish.id);
  };
  const updateDish = () => {
    if (!name || !price || !course) {
      return Alert.alert('Error','Please fill Name , Price , Course');
    }
    setDishes(dishes.map(d => d.id === editingId ? {
      ...d,
      name: name .toUpperCase(),
      price: 'R{price}',
      course: course,
      description: d
    } : d));
    setName(''); setPrice(''); setCourse(''); setDesc(''); setEditingId('');
    Alert.alert('Success', 'Dish Updated!');
  };


  const filtered = dishes.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerText}>CHRISTOFFEL'S MENU</Text></View>
      
      <View style={styles.box}>
        <TextInput placeholder="SEARCH DISHES" value={search} onChangeText={setSearch} style={styles.input} />
      </View>
      <View style={{backgroundColor:'#f0f0f0', padding:10, margin:10, borderRadius:8}}>
  <Text style={{fontWeight:'bold', fontSize:16}}>MENU STATISTICS:</Text>
  <Text>Total Dishes: {stats.total}</Text>
  <Text>Starters: {stats.starters} | Main: {stats.mains} | Dessert: {stats.desserts}</Text>
  <Text>Average Price: R{stats.avg}</Text>
</View>

      <FlatList 
        data={filtered} 
        keyExtractor={item => item.id} 
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={styles.dishBox}>
            <View style={{flex:1}}>
              <Text style={styles.dishName}>{item.name} - {item.price}</Text>
              <Text style={styles.dishCourse}>{item.course} | {item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => editDish(item)} style={{backgroundColor: 'blue', padding:5, marginRight:5}}>
              <Text styles={{color: 'white', fontWeight: 'bold'}}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteDish(item.id)} style={styles.deleteBtn}>
              <Text style={{color:'red', fontWeight:'bold'}}>X</Text>
            </TouchableOpacity>
          </View>
        )} 
      />

      <Text style={styles.label}>ADD NEW DISH:</Text>
      <View style={styles.box}><TextInput placeholder="DISH NAME:" value={name} onChangeText={setName} style={styles.input} /></View>
      <View style={styles.box}><TextInput placeholder="PRICE R:" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} /></View>
      <View style={styles.box}><TextInput placeholder="COURSE: Starter/Main/Dessert" value={course} onChangeText={setCourse} style={styles.input} /></View>
      <View style={styles.box}><TextInput placeholder="DESCRIPTION:" value={desc} onChangeText={setDesc} style={styles.input} /></View>
      
      <TouchableOpacity style={styles.greenBtn} onPress={addDish}>
        <Text style={styles.btnText}>+ ADD NEW DISH / SAVE DISH</Text>
      </TouchableOpacity>

      <View style={{height:50}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  header: { backgroundColor: '#D3D3D3', padding: 20, marginBottom: 20, alignItems: 'center', borderRadius:5 },
  headerText: { fontWeight: 'bold', fontSize: 14, letterSpacing:1 },
  box: { backgroundColor: '#D3D3D3', padding: 12, marginBottom: 10, borderRadius:5 },
  dishBox: { backgroundColor: '#E8E8E8', padding: 12, marginBottom: 8, borderRadius:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  input: { fontSize:12 },
  dishName: { fontWeight:'bold', fontSize:12 },
  dishCourse: { fontSize:10, color:'#555', marginTop:2 },
  label: { fontWeight:'bold', marginTop:20, marginBottom:10, fontSize:12 },
  greenBtn: { backgroundColor: '#A8D5BA', padding: 18, marginTop: 15, alignItems: 'center', borderRadius:5 },
  btnText: { fontSize: 11, fontWeight:'bold' },
  deleteBtn: { backgroundColor:'#fff', padding:8, borderRadius:15, width:30, height:30, alignItems:'center' }
});