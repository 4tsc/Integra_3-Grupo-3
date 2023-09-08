import * as React from 'react';
import { View, TouchableOpacity, Text   } from 'react-native';
import { styles_Logout } from '../styles/styles';
//probando
function LogOut() {
    const onPressButton = () => {
        Alert.alert('Botón presionado', '¡El botón ha sido presionado!');
      };
  return (
    <View style={styles_Logout.container}>
       <TouchableOpacity
        style={styles_Logout.button}
        onPress={onPressButton}
      >
        <Text style={styles_Logout.buttonText}>¿Desea cerrar sesión?</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogOut;