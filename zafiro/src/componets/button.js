import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, Linking, ScrollView, Dimensions, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';

const AppButton = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef();

  // Function to scroll to the next image
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
    }, 5000); // Change the interval (in milliseconds) as desired

    // Clear the interval when the component unmounts
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
    { title: 'DTE', imageSource: require('../componets/images/Logo_UCT.png'), screenName: 'DTE' },
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
          height: 100,
          resizeMode: 'stretch',
        }}
      />
    </View>
  );

  const carouselItems = [
    { imageSource: require('../componets/images/UCT_logo.png') },
    { imageSource: require('../componets/images/prueba_2.jpg') },
    { imageSource: require('../componets/images/prueba_3.jpg') },
  ];

  const windowWidth = Dimensions.get('window').width;

  const handleScroll = (event) => {
    const newImageIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentImageIndex(newImageIndex);
  };

  const renderItem = ({ item }) => (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity onPress={() => handleImagePress(item.screenName)}>
        <View style={styles_menu.circularItem}>
          <View style={styles_menu.circularImageContainer}>
            <Image source={item.imageSource} style={styles_menu.circularImage} />
          </View>
          <Text style={styles_menu.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </ScrollView>

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles_menu.row}
      />
    </View>
  );
};

export default AppButton;
