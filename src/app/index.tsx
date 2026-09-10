import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [dishes, setDishes] = useState([
    { id: '1', name: 'GRILLED STEAK', price: 'R180', course: 'Main', description: 'Grilled ribeye with herbs & garlic • 350g' },
    { id: '2', name: 'CAESAR SALAD', price: 'R95', course: 'Salad', description: 'Classic Caesar • Fresh' },
    { id: '3', name: 'CHOCOLATE CAKE', price: 'R65', course: 'Dessert', description: 'Chocolate cake • Dessert' },
  ]);

  const [search, setSearch] = useState('');
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // Search filter + error handling
  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};
    if (!dishName.trim()) newErrors.dishName = "Dish name is required";
    else if (dishName.trim().length < 3) newErrors.dishName = "Name must be at least 3 characters";
    
    if (!price) newErrors.price = "Price is required";
    else if (isNaN(price) || Number(price) <= 0) newErrors.price = "Price must be a number greater than 0";
    
    if (!course.trim()) newErrors.course = "Course is required";
    else if (!["starter","main","salad","dessert"].includes(course.toLowerCase())) 
      newErrors.course = "Course must be Starter, Main, Salad or Dessert";

    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    try {
      if (!validateForm()) {
        Alert.alert("Fix Errors", "Please correct the highlighted fields");
        return;
      }
      const newDish = {
        id: Date.now().toString(),
        name: dishName.toUpperCase(),
        price: `R${price}`,
        course: course,
        description: description
      };
      setDishes(prev => [newDish, ...prev]);
      setDishName(''); setPrice(''); setCourse(''); setDescription(''); setErrors({});
      Alert.alert("Success", `${newDish.name} added!`);
    } catch (e) {
      Alert.alert("Error", "Failed to add dish: " + e.message);
    }
  };

  const handleDelete = (id) => {
    try {
      const dish = dishes.find(d => d.id === id);
      if (!dish) throw new Error("Dish not found");
      
      Alert.alert("Delete Dish", `Delete ${dish.name}?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
            setDishes(prev => prev.filter(d => d.id !== id));
        }}
      ]);
    } catch (e) {
      Alert.alert("Delete Failed", e.message);
    }
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{padding:16}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🍴 CHRISTOFFEL'S MENU</Text>
        <Text style={styles.count}>Total Menu Items: {dishes.length}</Text>
      </View>

      <TextInput 
        style={styles.search} 
        placeholder="SEARCH DISHES..." 
        value={search} 
        onChangeText={setSearch} 
      />

      <Text style={styles.sectionTitle}>Menu Items:</Text>

      {filteredDishes.length === 0 && search !== "" && (
        <Text style={styles.errorCenter}>No dishes found for "{search}"</Text>
      )}

      {filteredDishes.length === 0 && dishes.length === 0 && (
        <Text style={styles.errorCenter}>Menu is empty. Add a dish below.</Text>
      )}

      {filteredDishes.map(item => (
        <View key={item.id} style={styles.card}>
          <View style={{flex:1}}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>{item.price}</Text></View>
          </View>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>ADD NEW DISH:</Text>
      <View style={styles.form}>
        <Text style={styles.label}>DISH NAME:</Text>
        <TextInput style={[styles.input, errors.dishName && styles.inputError]} placeholder="e.g. Lemon Butter Salmon" value={dishName} onChangeText={setDishName} />
        {errors.dishName && <Text style={styles.errorText}>{errors.dishName}</Text>}

        <Text style={styles.label}>PRICE (R):</Text>
        <TextInput style={[styles.input, errors.price && styles.inputError]} placeholder="e.g. 120" value={price} onChangeText={setPrice} keyboardType="numeric" />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <Text style={styles.label}>COURSE:</Text>
        <TextInput style={[styles.input, errors.course && styles.inputError]} placeholder="Main / Salad / Dessert" value={course} onChangeText={setCourse} />
        {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}

        <Text style={styles.label}>DESCRIPTION:</Text>
        <TextInput style={[styles.input, errors.description && styles.inputError]} placeholder="e.g. Ingredients / notes..." value={description} onChangeText={setDescription} multiline />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+ ADD DISH / SAVE DISH</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg:{flex:1, backgroundColor:'#d1e0c8'},
  header:{backgroundColor:'#dbe9d3', padding:16, borderRadius:4, borderWidth:1, borderColor:'#a8b89a'},
  headerText:{fontWeight:'900', fontSize:16, letterSpacing:1},
  count:{marginTop:6, fontWeight:'600'},
  search:{backgroundColor:'white', borderRadius:4, padding:12, marginTop:12, borderWidth:1, borderColor:'#aaa'},
  sectionTitle:{fontSize:18, fontWeight:'800', marginTop:16, marginBottom:8},
  card:{backgroundColor:'#7fa8d7', borderRadius:4, padding:12, marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderWidth:1, borderColor:'#5a7da8'},
  name:{fontWeight:'800', fontSize:14, color:'black'},
  desc:{fontSize:11, marginTop:2, color:'#222'},
  badge:{backgroundColor:'#e8e8e8', alignSelf:'flex-start', paddingHorizontal:8, paddingVertical:2, borderRadius:4, marginTop:6},
  badgeText:{fontWeight:'700', fontSize:12},
  deleteBtn:{backgroundColor:'#c0392b', width:32, height:32, borderRadius:4, alignItems:'center', justifyContent:'center', marginLeft:10},
  deleteText:{color:'white', fontWeight:'900', fontSize:18},
  form:{backgroundColor:'#dbe9d3', padding:12, borderRadius:4, borderWidth:1, borderColor:'#a8b89a', marginTop:10},
  label:{fontWeight:'700', fontSize:12, marginTop:8, marginBottom:4},
  input:{backgroundColor:'white', borderWidth:1, borderColor:'#999', borderRadius:4, padding:10},
  inputError:{borderColor:'red', borderWidth:2},
  errorText:{color:'red', fontSize:11, marginTop:2, fontWeight:'600'},
  errorCenter:{textAlign:'center', color:'#b00000', marginTop:10, fontWeight:'600'},
  addBtn:{backgroundColor:'#4a7a3a', padding:14, borderRadius:4, alignItems:'center', marginTop:12, borderWidth:1, borderColor:'#2f4f24'},
  addBtnText:{color:'white', fontWeight:'800'},
});