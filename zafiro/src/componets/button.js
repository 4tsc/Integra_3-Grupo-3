import React from 'react';
import {Button,View,SafeAreaView,Text,Alert,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles_menu} from './styles/styles.js'
//probando
const App_button = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Agendar');
  };

  return (
    <View style={styles_menu.container}>
      <View style={styles_menu.row}>
        <View style={styles_menu.item}>
        <Image source={require('../componets/images/asesoria.png')} style={styles_menu.image} /> 
          <Button
            title="Agendar Asesoria"
            color='#00BBE0'
            onPress={handlePress}
          />
        </View>
        <View style={styles_menu.item}>
          <Image source={require('../componets/images/recursos.png')} style={styles_menu.image} />
          <Button
            title="Recursos"
            color='#00BBE0'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </View>
    </View>
  );
};



export default App_button;
