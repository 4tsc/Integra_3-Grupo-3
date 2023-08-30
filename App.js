import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextComponent } from 'react-native';
import App_button from './component/button';
import HomeScreen from './component/inicio';
import DetailsScreen from './component/navbar';



export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen />
      <DetailsScreen />
      <TextComponent 
      hola ></TextComponent>
      <Image source={require('./assets/asesoria1.png')} style={{ width: '50%', height: '15%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }} />
      <App_button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
