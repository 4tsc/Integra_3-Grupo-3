// Panel.js

import React, { useRef, useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper';

const Panel = () => {
  const swiperRef = useRef(null);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }, 7000);

    setAutoPlayInterval(interval);

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.swiper}
        loop={true}
        autoplay={true}
        autoplayTimeout={7}
        transitionStyle="fade"
      >
        <View style={styles.slide}>
          <Image
            source={require("./componets/images/UCT_logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("./componets/images/prueba_2.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("./componets/images/prueba_3.jpg")}
            style={styles.image}
          />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%', // Establece el ancho de la imagen
    height: '100%', // Establece la altura de la imagen
    resizeMode: "contain", // Ajusta la imagen sin distorsionarla
  },
});

export default Panel;
