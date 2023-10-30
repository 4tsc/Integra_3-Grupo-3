import React, { useEffect, useRef, useState } from 'react';
import { View, Image, FlatList, Linking, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';
import Swiper from 'react-native-swiper';



const AppButton = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);

  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }, 5000);

    setAutoPlayInterval(interval);

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, []);

  const handleImagePress = (screenName) => { // Define una función para manejar el evento de presionar la imagen.
    const linkMap = { // Crea un mapeo de nombres de pantalla a enlaces o rutas.
      'Agendar': 'Agendar', // Cuando se presiona 'Agendar', se navegará a la pantalla 'Agendar'
      'Recursos': 'https://www.google.com', // Cuando se presiona 'Recursos', se abrirá un enlace en el navegador.
      'DTE': 'https://dte.uct.cl',
      'Kintun': 'https://biblioteca.uct.cl',
      'Inkatun': 'https://inkatun.uct.cl',
      'Academicos': 'http://academicos.uct.cl',
      'Directorios Salas': 'https://directoriosalas.uct.cl',
      'Formacion Docente': 'https://dte.uct.cl/formaciondocente2023/',
    };

    const link = linkMap[screenName]; // Obtiene el enlace correspondiente al nombre de pantalla seleccionado.

    if (link) { // Si hay un enlace disponible
      if (typeof link === 'string') { // Si el enlace es una cadena (URL).
        if (link === 'Agendar') { // Si el enlace es 'Agendar'.
          // Redirigir a la pantalla AgendarScreen
          navigation.navigate(link);
        } else {
          // Abrir enlace en el navegador
          Linking.openURL(link);
        }
      }
    }
  };

  const menuItems = [ // Define una lista de elementos de menú con títulos, imágenes y nombres de pantalla.
    { title: 'Agendar Asesoria', imageSource: require('../componets/images/asesoria.png'), screenName: 'Agendar' },
    { title: 'Recursos', imageSource: require('../componets/images/recursos.png'), screenName: 'Recursos' },
    { title: 'DTE', imageSource: require('../componets/images/Logo_UCT.png'), screenName: 'DTE' },
    { title: 'Kintun', imageSource: require('../componets/images/bandera.png'), screenName: 'Kintun' },
    { title: 'Inkatun',imageSource: require('../componets/images/inkatun.png'), screenName: 'Inkatun' },
    { title: 'Academicos', imageSource: require('../componets/images/academico.png'), screenName: 'Academicos' },
    { title: 'Directorios Salas', imageSource: require('../componets/images/sala-de-espera.png'), screenName: 'Directorios Salas' },
    { title: 'Formacion Docente', imageSource: require('../componets/images/formacion.png'), screenName: 'Formacion Docente' },
  ];

  const renderItem = ({ item }) => ( // Define una función para representar cada elemento del menú.
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

 // return (
//   <View style={{ flex: 1 }}>
//     <Swiper
//       ref={swiperRef} // Asocia la referencia a Swiper
//       loop={false}
//       autoplay={true}
//       autoplayTimeout={5}
//     >
//       <Image source={require('../componets/images/UCT_logo.png')} style={{ flex: 1 }} />
//       <Image source={require('../componets/images/prueba_2.jpg')} style={{ flex: 1 }} />
//       <Image source={require('../componets/images/prueba_3.jpg')} style{{ flex: 1 }} />
//     </Swiper>
//     <FlatList
//       data={menuItems}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.title}
//       numColumns={2}
//       columnWrapperStyle={styles_menu.row}
//     />
//   </View>
// );

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// return (
//   <View style={{ flex: 1 }}>
//     <Swiper
//       ref={swiperRef}
//       loop={false}
//       autoplay={true}
//       autoplayTimeout={5}
//       style={{ width: '100%', height: 200 }} // Establece el ancho y la altura
//     >
//       <Image source={require('../componets/images/UCT_logo.png')} style={{ flex: 1 }} />
//       <Image source={require('../componets/images/prueba_2.jpg')} style={{ flex: 1 }} />
//       <Image source={require('../componets/images/prueba_3.jpg')} style={{ flex: 1 }} />
//     </Swiper>
//     <FlatList
//       data={menuItems}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.title}
//       numColumns={2}
//       columnWrapperStyle={styles_menu.row}
//     />
//   </View>
// );


};



export default AppButton;