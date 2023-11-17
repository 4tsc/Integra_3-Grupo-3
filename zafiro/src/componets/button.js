import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, Linking, ScrollView, Dimensions, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';

const AppButton = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef();

  // Funcion del scroll para la siguinte imagen
  const scrollToNextImage = () => {
    const newImageIndex = (currentImageIndex + 1) % carouselItems.length;
    setCurrentImageIndex(newImageIndex);
    const offsetX = newImageIndex * windowWidth;
    scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
  };

  // Use useEffect to set up the automatic scrolling
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      scrollToNextImage();
    }, 5000); // Cambia el intervalo (en milisegundos)

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentImageIndex]);



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
          navigation.navigate(link);
        } else {
          Linking.openURL(link);
        }
      }
    }
  };

  const menuItems = [
    { title: 'Agendar Asesoria', imageSource: require('../componets/images/asesoria.png'), screenName: 'Agendar' },
    { title: 'Recursos', imageSource: require('../componets/images/recursos.png'), screenName: 'Recursos' },
    { title: 'DTE', imageSource: require('../componets/images/Logo_UCT_2.png'), screenName: 'DTE' },
    { title: 'Kintun', imageSource: require('../componets/images/bandera.png'), screenName: 'Kintun' },
    { title: 'Inkatun', imageSource: require('../componets/images/inkatun.png'), screenName: 'Inkatun' },
    { title: 'Academicos', imageSource: require('../componets/images/academico.png'), screenName: 'Academicos' },
    { title: 'Directorios Salas', imageSource: require('../componets/images/sala-de-espera.png'), screenName: 'Directorios Salas' },
    { title: 'Formacion Docente', imageSource: require('../componets/images/formacion.png'), screenName: 'Formacion Docente' },
  ];

  const CarouselItem = ({ item }) => (
    <View>
      <Image
        source={item.imageSource}
        style={{
          width: windowWidth,
          height: 200,
          resizeMode: 'stretch',
          borderRadius: 30,
        }}
      />
    </View>
  );

  const carouselItems = [
    { imageSource: require('../componets/images/inclusivo.jpg') },
    { imageSource: require('../componets/images/tela.jpg') },
    { imageSource: require('../componets/images/tierra.jpg') },
  ];

  const windowWidth = Dimensions.get('window').width;

  const handleScroll = (event) => {
    const newImageIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentImageIndex(newImageIndex);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.screenName)}>
      <View style={styles_menu.circularItem}>
        <Image source={item.imageSource} style={styles_menu.circularImage} />
        <Text style={styles_menu.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderButtons = (startIndex, endIndex) => {
    return menuItems.slice(startIndex, endIndex).map((item, index) => (
      <TouchableOpacity key={index} onPress={() => handleImagePress(item.screenName)}>
        <View style={[styles_menu.circularItem, { marginTop: index === 0 ? 10 : 20, marginLeft: index > 0 ? 20 : 0 }]}>
          <Image source={item.imageSource} style={styles_menu.circularImage} />
          <Text style={styles_menu.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    ));
  };
  
  
//flex: 1, justifyContent: 'center', alignItems: 'center'   //, si borro esto vuelve aparecer el panel
  return (
    // Contenedor principal que centra todo el contenido en la pantalla
    <View > 
      {/* Sección de las imágenes en un ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {/* Mapeo de las imágenes en el ScrollView */}
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </ScrollView>
  
      {/* Sección de los botones en un View */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 80 }}>
        {/* Fila superior con los tres primeros botones */}
        {menuItems.slice(0, 3).map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(item.screenName)}>
            {/* Botón circular con imagen y título */}
            <View style={styles_menu.circularItem}>
              <Image source={item.imageSource} style={styles_menu.circularImage} />
              <Text style={styles_menu.itemTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
  
        {/* Fila inferior con el resto de los botones */}
        {menuItems.slice(3).map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(item.screenName)}>
            {/* Botón circular con imagen y título */}
            <View style={[styles_menu.circularItem, { marginTop: 20, flexDirection: 'column', alignItems: 'center' }]}>
              <Image source={item.imageSource} style={styles_menu.circularImage} />
              <Text style={styles_menu.itemTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
};

export default AppButton;
