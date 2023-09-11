import * as React from 'react';
import { View, TouchableOpacity, Text   } from 'react-native';
import { styles_Logout } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';


function LogOut() {
  const navigation = useNavigation();
  const onPressButton = () => {
    navigation.navigate('LogInScreen');
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