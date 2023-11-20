import * as React from 'react';
import { View, TouchableOpacity, Text   } from 'react-native';
import { styles_Logout } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
//test

function LogOut({ onLogout }) {
  const navigation = useNavigation();

  const handlePress = () => {
    // Realiza el cierre de sesión llamando a la función onLogout
    onLogout();
    navigation.navigate('LogInScreen');
  };
  return (
    <View style={styles_Logout.container}>
       <Pressable style={styles_Logout.button} onPress={handlePress}>
          <Text style={styles_Logout.buttonText}>Cerrar Sesión</Text>
        </Pressable>
    </View>
  );
}

export default LogOut;