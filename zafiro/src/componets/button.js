import React from 'react';
import { Button, View, Image, FlatList, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';

const AppButton = () => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    if (screenName === 'Agendar') {
      navigation.navigate(screenName);
    } else if (screenName === 'Recursos') {
      Linking.openURL('https://www.google.com');
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
    { title: 'Agendar Asesoria', imageSource: require('../componets/images/asesoria.png'), screenName: 'Agendar' },
    { title: 'Recursos', imageSource: require('../componets/images/recursos.png'), screenName: 'Recursos' },
    { title: 'DTE', imageSource: require('../componets/images/Logo_UCT.png'), screenName: 'DTE' },
    { title: 'Kintun', imageSource: require('../componets/images/bandera.png'), screenName: 'Kintun' },
    { title: 'Inkatun', screenName: 'Inkatun' },
    { title: 'Academicois', imageSource: require('../componets/images/academico.png'), screenName: 'Academicos' },
    { title: 'Directorios Salas', imageSource: require('../componets/images/sala-de-espera.png'), screenName: 'Directorios Salas' },
    { title: 'Formacion Docente', imageSource: require('../componets/images/formacion.png'), screenName: 'Formacion Docente' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles_menu.item}>
      <Image source={item.imageSource} style={styles_menu.image} />
      <Button
        title={item.title}
        color='#00BBE0'
        onPress={() => handlePress(item.screenName)}
      />
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={2}
      columnWrapperStyle={styles_menu.row}
    />
  );
};

export default AppButton;
