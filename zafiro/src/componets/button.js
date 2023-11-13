import React, { useState, useEffect, useRef } from 'react';
import { Button, View, Image, FlatList, Linking, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles_menu } from './styles/styles.js';

const AppButton = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define a reference to the ScrollView component
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

const CarouselItem = ({ item }) => (
  <View >
    <Image
      source={item.imageSource}
      style={{
        width: windowWidth,
        height: 100,
        resizeMode: 'stretch', // los modos de redimensionamiento son: 'cover', 'contain', 'stretch', 'repeat', 'center'
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
