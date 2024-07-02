import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const posts = [1, 2, 3, 4, 5, 6]; // Placeholder for post data

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.username}>username</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.5M</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <Text style={styles.name}>Full Name</Text>
      <Text style={styles.bio}>This is a bio description. Instagram lover. Follow for great content!</Text>

      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.postsContainer}>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Image
              source={{ uri: `https://via.placeholder.com/150?text=Post${post}` }}
              style={styles.postImage}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'gray',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  bio: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  editProfileButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
  },
  editProfileText: {
    fontWeight: 'bold',
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  post: {
    width: '33.3%',
    padding: 1,
  },
  postImage: {
    width: '100%',
    height: 150,
  },
});

export default ProfileScreen;