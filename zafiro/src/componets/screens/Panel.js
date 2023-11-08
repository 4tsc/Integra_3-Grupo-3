import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import Swiper from 'react-native-swiper';

const Panel = () => {
  const swiperRef = useRef(null); // Referencia al Swiper

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

  return (
    <Swiper
      ref={swiperRef}
      style={{
        width: "100",
        height: "100",
        alignItems: "center",
        position: "flex",
      }}
      autoplay={false}
      autoplayTimeout={20}
      dotStyle={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        width: 8,
        height: 8,
        margin: 3,
      }}
      activeDotStyle={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        width: 8,
        height: 8,
        margin: 3,
      }}
      showsButtons
      prevButton={<Text style={{ color: "white", fontSize: 24, marginRight: 10 }}>‹</Text>}
      nextButton={<Text style={{ color: "white", fontSize: 24, marginLeft: 10 }}>›</Text>}
      loop={true}
      transitionStyle="fade"
    >
      <View style={styles.slide}>
        <Image
          source={require("../componets/images/UCT_logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../componets/images/prueba_2.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../componets/images/prueba_3.jpg")}
          style={styles.image}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Panel;
