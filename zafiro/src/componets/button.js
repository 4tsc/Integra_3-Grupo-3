import React from 'react';
import { View, Image, FlatList, Linking, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';

const AppButton = () => {
  const navigation = useNavigation();

  const handleImagePress = (screenName) => {
    const linkMap = {
      'Agendar': 'Agendar',
      'Recursos': 'https://www.google.com',
      'DTE': 'https://dte.uct.cl',
      'Kintun': 'https://biblioteca.uct.cl',
      'Inkatun': 'https://inkatun.uct.cl',
      'Academicos': 'http://academicos.uct.cl',
      'Directorios Salas': 'https://directoriosalas.uct.cl',
      'Formacion Docente': 'https://dte.uct.cl/formaciondocente2023/',
    };

    const link = linkMap[screenName];

    if (link) {
      if (typeof link === 'string') {
        if (link === 'Agendar') {
          // Redirigir a la pantalla AgendarScreen
          navigation.navigate(link);
        } else {
          // Abrir enlace en el navegador
          Linking.openURL(link);
        }
      }
    }
  };

  const menuItems = [
    { title: 'Agendar Asesoria', imageSource: require('../componets/images/asesoria.png'), screenName: 'Agendar' },
    { title: 'Recursos', imageSource: require('../componets/images/recursos.png'), screenName: 'Recursos' },
    { title: 'DTE', imageSource: require('../componets/images/Logo_UCT.png'), screenName: 'DTE' },
    { title: 'Kintun', imageSource: require('../componets/images/bandera.png'), screenName: 'Kintun' },
    { title: 'Inkatun',imageSource: require('../componets/images/inkatun.png'), screenName: 'Inkatun' },
    { title: 'Academicos', imageSource: require('../componets/images/academico.png'), screenName: 'Academicos' },
    { title: 'Directorios Salas', imageSource: require('../componets/images/sala-de-espera.png'), screenName: 'Directorios Salas' },
    { title: 'Formacion Docente', imageSource: require('../componets/images/formacion.png'), screenName: 'Formacion Docente' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.screenName)}>
      <View style={styles_menu.circularItem}>
        <View style={styles_menu.circularImageContainer}>
          <Image source={item.imageSource} style={styles_menu.circularImage} />
        </View>
        <Text style={styles_menu.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
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
