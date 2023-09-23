import React from 'react';
import { Button, View, Image, FlatList, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';

const AppButton = () => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    if (screenName === 'Agendar') {
      navigation.navigate(screenName);
    } else if (screenName === 'DTE') {
      Linking.openURL('https://dte.uct.cl');
    } else if (screenName === 'Kintun') {
      Linking.openURL('https://biblioteca.uct.cl');
    } else if (screenName === 'Inkatun') {
      Linking.openURL('https://inkatun.uct.cl');
    } else if (screenName === 'Academicos') {
      Linking.openURL('http://academicos.uct.cl');
    } else if (screenName === 'Directorios Salas') {
      Linking.openURL('https://directoriosalas.uct.cl');
    } else if (screenName === 'Formacion Docente') {
      Linking.openURL('https://dte.uct.cl/formaciondocente2023/');
    }
  };

  const menuItems = [
    { title: 'Agendar Asesoria', screenName: 'Agendar' },
    { title: 'DTE', screenName: 'DTE' },
    { title: 'Kintun', screenName: 'Kintun' },
    { title: 'Inkatun', screenName: 'Inkatun' },
    { title: 'Academicos', screenName: 'Academicos' },
    { title: 'Directorios Salas', screenName: 'Directorios Salas' },
    { title: 'Formacion Docente', screenName: 'Formacion Docente' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles_menu.item}>

      <Button
        title={item.title}
        color='#00BBE0'
        onPress={() => handlePress(item.screenName)}
      />
    </View>
  );
  const ItemSeparator = () => (
    <View
      style={{
        height: 90,
      }}
    />
  );

  

  return (
    <FlatList style={styles_menu.flat}
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={2}
      columnWrapperStyle={styles_menu.row}
      ItemSeparatorComponent={ItemSeparator} // Aquí se utiliza el componente personalizado de separación
    />
  );
};

export default AppButton;
