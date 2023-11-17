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
      'Pagos':'https://pagosweb.uct.cl',
      'Certificado':'https://dfhc.uct.cl/certificado-academico/',
      'Plan':'https://pdi.uct.cl'
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

  const fotoItems = [
    { title: 'Pagos', imageSource: require('../componets/images/pagos.jpg'), screenName: 'Pagos' },
  ];

  const certificadoItems = [
    { title: 'Certificado', imageSource: require('../componets/images/certificado.jpg'), screenName: 'Certificado' },
  ];
  const CarouselItem = ({ item }) => (
    <View>
      <Image
        source={item.imageSource}
        style={{
          width: windowWidth,
          height: 140,
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
    { title: 'Plan', imageSource: require('../componets/images/plan.png'), screenName: 'Plan' },
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

  const renderFotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.screenName)}>
      <View style={styles_menu.circularItem}>
        <Image source={item.imageSource} style={styles_menu.Image} />
        <Text style={styles_menu.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderCertificadoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.screenName)}>
      <View style={styles_menu.circularItem}>
        <Image source={item.imageSource} style={styles_menu.Image} />
        <Text style={styles_menu.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

 

  const handleArrowPress = (direction) => {
    const newImageIndex =
      direction === 'left'
        ? (currentImageIndex - 1 + carouselItems.length) % carouselItems.length
        : (currentImageIndex + 1) % carouselItems.length;
    setCurrentImageIndex(newImageIndex);
    const offsetX = newImageIndex * windowWidth;
    scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
  };
  
  
//flex: 1, justifyContent: 'center', alignItems: 'center'   //, si borro esto vuelve aparecer el panel
  return (
    // Contenedor principal que centra todo el contenido en la pantalla
    <View > 
      {/* Flecha izquierda */}
      <TouchableOpacity onPress={() => handleArrowPress('left')} style={{ position: 'absolute', top: 50, left: 5, zIndex: 1 }}>
        <Text style={{ fontSize: 20,marginTop: 40, color: 'white' }}>{'<'}</Text>
      </TouchableOpacity>

      {/* Flecha derecha */}
      <TouchableOpacity onPress={() => handleArrowPress('right')} style={{ position: 'absolute', top: 50, right: 5, zIndex: 1 }}>
        <Text style={{ fontSize: 20, marginTop: 40, color: 'white' }}>{'>'}</Text>
      </TouchableOpacity>

      {/* ScrollView para las imágenes */}
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
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

        {/* Nueva sección de botones para fotoItems */}
      {fotoItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(item.screenName)}>
          <View style={styles_menu.ImageContainer}>
            <Image source={item.imageSource} style={styles_menu.Image} />
            
          </View>
        </TouchableOpacity>
      ))}
  
        {/* Fila inferior con el resto de los botones */}
        {menuItems.slice(3).map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(item.screenName)}>
            {/* Botón circular con imagen y título */}
            <View style={[styles_menu.circularItem, { marginTop: 1, flexDirection: 'column', alignItems: 'center' }]}>
              <Image source={item.imageSource} style={styles_menu.circularImage} />
              <Text style={styles_menu.itemTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}

         {/* Nueva sección de botones para certificadoItems */}
      {certificadoItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(item.screenName)}>
          <View style={styles_menu.ImageContainer}>
            <Image source={item.imageSource} style={styles_menu.Certificado} />
            
          </View>
        </TouchableOpacity>
      ))}
      </View>
    </View>
  );
  
};

export default AppButton;
