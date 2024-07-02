import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ReelsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reelsData = [
    {
      id: "1",
      videoUri: "https://example.com/reel1.mp4",
      user: "user1",
      description: "Fun dance #reels",
    },
    {
      id: "2",
      videoUri: "https://example.com/reel2.mp4",
      user: "user2",
      description: "Cool trick #magic",
    },
    {
      id: "3",
      videoUri: "https://example.com/reel3.mp4",
      user: "user3",
      description: "Beautiful sunset #nature",
    },
  ];

  const renderReel = ({ item, index }) => (
    <View style={styles.reelContainer}>
      <Image source={{ uri: item.videoUri }} style={styles.video} />
      <View style={styles.overlay}>
        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="heart-outline" size={28} color="white" />
            <Text style={styles.controlText}>10k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="chatbubble-outline" size={28} color="white" />
            <Text style={styles.controlText}>1.2k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="paper-plane-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="ellipsis-vertical" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomInfo}>
          <Text style={styles.username}>@{item.user}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reelsData}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Reels</Text>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  reelContainer: {
    width: width,
    height: height,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 20,
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
  bottomInfo: {
    marginBottom: 30,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    //marginBottom: 105,
    marginTop: 750,
  },
  description: {
    color: "white",
    fontSize: 14,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ReelsScreen;
