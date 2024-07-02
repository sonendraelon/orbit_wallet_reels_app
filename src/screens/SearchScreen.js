import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Custom hook for search functionality
const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((text) => {
    setSearchTerm(text);
  }, []);

  const filterData = useCallback(
    (data, searchFields) => {
      if (!searchTerm) return data;
      return data.filter((item) => {
        if (typeof searchFields === "string") {
          return item[searchFields]
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return searchFields.some((field) =>
          item[field].toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    },
    [searchTerm]
  );

  return { searchTerm, handleSearch, filterData };
};

// SearchBar component
const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

// TopSearch component
const TopSearch = () => (
  <View style={styles.topSearchContainer}>
    <Image
      source={{ uri: "https://picsum.photos/800/400" }}
      style={styles.topSearchImage}
    />
    <Text style={styles.topSearchText}>#Top search of the day</Text>
  </View>
);

// CategorySection component
const CategorySection = ({ title, data, renderItem }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index}>{renderItem(item)}</View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

// HashtagItem component
const HashtagItem = ({ title, image, count }) => (
  <View style={styles.hashtagItem}>
    <Image source={{ uri: image }} style={styles.hashtagImage} />
    <Text style={styles.hashtagTitle}>{title}</Text>
    <Text style={styles.hashtagCount}>{count}</Text>
  </View>
);

// CommunityItem component
const CommunityItem = ({ title, subtitle, image, posts }) => (
  <View style={styles.communityItem}>
    <Image source={{ uri: image }} style={styles.communityImage} />
    <View style={styles.communityTextOverlay}>
      <Text style={styles.communityTitle}>{title}</Text>
      <Text style={styles.communitySubtitle}>{subtitle}</Text>
      <Text style={styles.communityPosts}>{posts}</Text>
    </View>
  </View>
);

// NomadItem component
const NomadItem = ({ username, image, followers }) => (
  <View style={styles.nomadItem}>
    <Image source={{ uri: image }} style={styles.nomadImage} />
    <Text style={styles.nomadUsername}>{username}</Text>
    <Text style={styles.nomadFollowers}>{followers} followers</Text>
  </View>
);

// Main SearchScreen component
const SearchScreen = () => {
  const { searchTerm, handleSearch, filterData } = useSearch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Discover the world</Text>
        <SearchBar value={searchTerm} onChangeText={handleSearch} />
        <TopSearch />
        <CategorySection
          title="Trending hashtags"
          data={filterData(TRENDING_HASHTAGS, "title")}
          renderItem={(item) => (
            <HashtagItem
              title={item.title}
              image={item.image}
              count={item.count}
            />
          )}
        />
        <CategorySection
          title="Top community"
          data={filterData(TOP_COMMUNITY, ["title", "subtitle"])}
          renderItem={(item) => (
            <CommunityItem
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              posts={item.posts}
            />
          )}
        />
        <CategorySection
          title="Top nomads"
          data={filterData(TOP_NOMADS, "username")}
          renderItem={(item) => (
            <NomadItem
              username={item.username}
              image={item.image}
              followers={item.followers}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,

  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4a4a4a",
  },
  searchContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    color: "#333",
  },
  topSearchContainer: {
    position: "relative",
    marginBottom: 20,
  },
  topSearchImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  topSearchText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  seeAll: {
    color: "#007AFF",
    fontSize: 14,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 25,

    
  },
  closeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  hashtagItem: {
    marginRight: 30,
    marginBottom: 30,
    width: 150,
    
  },
  hashtagImage: {
    width: 170,
    height: 120,
    borderRadius: 8,
  },
  hashtagTitle: {
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  hashtagCount: {
    color: "white",
    position: "absolute",
    bottom: 0,
    left: 95,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  communityItem: {
    marginRight: 30,
    marginBottom: 30,
    width: 150,
  },
  communityImage: {
    width: 170,
    height: 120,
    borderRadius: 8,
  },
  communityTextOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  communityTitle: {
    color: "#fff",
    fontSize: 18,
  },
  communitySubtitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
  },
  communityPosts: {
    fontSize: 12,
    color: "white",
    position: "absolute",
    bottom: 70,
    left: 50,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  nomadItem: {
    marginRight: 5,
    marginLeft: 40,
    marginBottom: 30,
    width: 110,
  },
  nomadImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
  },
  nomadUsername: {
    marginTop: 10,
    fontWeight: "bold",
  },
  nomadFollowers: {
    color: "#888",
    fontSize: 12,
  },
});

const TRENDING_HASHTAGS = [
  {
    id: 1,
    title: "#adventure",
    image: "https://picsum.photos/200/300",
    count: "2.7m",
  },
  {
    id: 2,
    title: "#roadtrip",
    image: "https://picsum.photos/200/301",
    count: "2.5m",
  },
  {
    id: 3,
    title: "#nature",
    image: "https://picsum.photos/200/302",
    count: "1.9m",
  },
  {
    id: 4,
    title: "#foodie",
    image: "https://picsum.photos/200/303",
    count: "3.1m",
  },
  {
    id: 5,
    title: "#cityscape",
    image: "https://picsum.photos/200/304",
    count: "1.8m",
  },
  {
    id: 6,
    title: "#beachlife",
    image: "https://picsum.photos/200/305",
    count: "2.2m",
  },
  {
    id: 7,
    title: "#wanderlust",
    image: "https://picsum.photos/200/306",
    count: "4.5m",
  },
  {
    id: 8,
    title: "#mountainview",
    image: "https://picsum.photos/200/307",
    count: "1.6m",
  },
  {
    id: 9,
    title: "#backpacking",
    image: "https://picsum.photos/200/308",
    count: "1.3m",
  },
  {
    id: 10,
    title: "#culturalheritage",
    image: "https://picsum.photos/200/309",
    count: "980k",
  },
];

const TOP_COMMUNITY = [
  {
    id: 1,
    title: "Places of",
    subtitle: "FRANCE",
    image: "https://picsum.photos/200/310",
    posts: "125posts/day",
  },
  {
    id: 2,
    title: "We live in",
    subtitle: "ITALY",
    image: "https://picsum.photos/200/311",
    posts: "75posts/day",
  },
  {
    id: 3,
    title: "Explore",
    subtitle: "JAPAN",
    image: "https://picsum.photos/200/312",
    posts: "95posts/day",
  },
  {
    id: 4,
    title: "Discover",
    subtitle: "BRAZIL",
    image: "https://picsum.photos/200/313",
    posts: "110posts/day",
  },
  {
    id: 5,
    title: "Wonders of",
    subtitle: "INDIA",
    image: "https://picsum.photos/200/314",
    posts: "150posts/day",
  },
  {
    id: 6,
    title: "Adventures in",
    subtitle: "AUSTRALIA",
    image: "https://picsum.photos/200/315",
    posts: "85posts/day",
  },
  {
    id: 7,
    title: "Secrets of",
    subtitle: "GREECE",
    image: "https://picsum.photos/200/316",
    posts: "70posts/day",
  },
  {
    id: 8,
    title: "Exploring",
    subtitle: "CANADA",
    image: "https://picsum.photos/200/317",
    posts: "65posts/day",
  },
  {
    id: 9,
    title: "Hidden gems of",
    subtitle: "THAILAND",
    image: "https://picsum.photos/200/318",
    posts: "100posts/day",
  },
  {
    id: 10,
    title: "Journey through",
    subtitle: "PERU",
    image: "https://picsum.photos/200/319",
    posts: "55posts/day",
  },
];

const TOP_NOMADS = [
  {
    id: 1,
    username: "@playaparker",
    image: "https://picsum.photos/200/320",
    followers: "245k",
  },
  {
    id: 2,
    username: "@mhogan",
    image: "https://picsum.photos/200/321",
    followers: "240k",
  },
  {
    id: 3,
    username: "@rayjosh",
    image: "https://picsum.photos/200/322",
    followers: "234k",
  },
  {
    id: 4,
    username: "@wanderlust",
    image: "https://picsum.photos/200/323",
    followers: "228k",
  },
  {
    id: 5,
    username: "@globetrotter",
    image: "https://picsum.photos/200/324",
    followers: "220k",
  },
  {
    id: 6,
    username: "@adventurous",
    image: "https://picsum.photos/200/325",
    followers: "215k",
  },
  {
    id: 7,
    username: "@nature_lover",
    image: "https://picsum.photos/200/326",
    followers: "208k",
  },
  {
    id: 8,
    username: "@backpacker",
    image: "https://picsum.photos/200/327",
    followers: "202k",
  },
  {
    id: 9,
    username: "@cultural",
    image: "https://picsum.photos/200/328",
    followers: "195k",
  },
  {
    id: 10,
    username: "@foodie_tra",
    image: "https://picsum.photos/200/329",
    followers: "190k",
  },
];

export default SearchScreen;
