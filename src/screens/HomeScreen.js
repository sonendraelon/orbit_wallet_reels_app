import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Custom hook for fetching images
const useImageFetcher = () => {
  const [images, setImages] = useState([]);

  const fetchImages = useCallback(async () => {
    try {
      const newImages = await Promise.all(
        Array.from({ length: 100 }, async (_, i) => {
          const index = images.length + i;
          const response = await fetch(
            `https://picsum.photos/${width}/${height}?random=${index}`
          );
          return {
            id: index.toString(),
            uri: response.url,
            caption: `Random caption ${index + 1}`,
            username: `user${index + 1}`,
            likes: Math.floor(Math.random() * 100000),
            comments: Math.floor(Math.random() * 10000),
          };
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [images.length]);

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, fetchImages };
};

// Control Button Component
const ControlButton = ({ iconName, text }) => (
  <TouchableOpacity style={styles.controlButton}>
    <Ionicons name={iconName} size={28} color="white" />
    {text && <Text style={styles.controlText}>{text}</Text>}
  </TouchableOpacity>
);

// Image Item Component
const ImageItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.uri }} style={styles.image} />
    <Text style={styles.topText}>For you</Text>
    <View style={styles.bottomContainer}>
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
    <View style={styles.rightControls}>
      <ControlButton
        iconName="heart-outline"
        text={
          item.likes > 1000 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes
        }
      />
      <ControlButton
        iconName="chatbubble-outline"
        text={
          item.comments > 1000
            ? `${(item.comments / 1000).toFixed(1)}k`
            : item.comments
        }
      />
      <ControlButton iconName="paper-plane-outline" />
      <ControlButton iconName="ellipsis-vertical" />
    </View>
  </View>
);

// Main HomeScreen Component
const HomeScreen = () => {
  const { images, fetchImages } = useImageFetcher();

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => <ImageItem item={item} />}
      keyExtractor={(item) => item.id}
      pagingEnabled
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onEndReached={fetchImages}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    height: height,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topText: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  caption: {
    color: "white",
    fontSize: 14,
    marginBottom: 80,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    bottom: 100,
    alignItems: "center",
  },
  iconButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  musicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },

  rightControls: {
    position: "absolute",
    right: 10,
    bottom: 100,
    alignItems: "center",
  },
  controlButton: {
    marginBottom: 20,
    alignItems: "center",
  },
  controlText: {
    color: "white",
    marginTop: 5,
  },
});

export default HomeScreen;
