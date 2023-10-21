import * as React from 'react';
import { View, TouchableOpacity, Text   } from 'react-native';
import { styles_Logout } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
//test

function LogOut() {
  const navigation = useNavigation();
  const handlePress = () => {
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