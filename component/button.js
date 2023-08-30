import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
} from 'react-native';

const App_button = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.row}>
      <View style={styles.item}>
        <Image source={require('../assets/asesoria.png')} style={{width: '50%', height: '55%', borderTopLeftRadius: 25, borderTopRightRadius: 25}} />
        <Button
          title="Agendar Asesoria"
          color='#00BBE0'
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
      <View style={styles.item}>
        <Image source={require('../assets/recursos.png')} style={{width: '50%', height: '55%', borderTopLeftRadius: 25, borderTopRightRadius: 25}} />
          <Button
            title="Recursos"
            color='#00BBE0'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
      </View>
    </View>    
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
  },
  row : {
    flexDirection: 'row',
  },
  item: {
    flex: 2,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: '50%',
    height: '55%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
 
  
});

export default App_button;