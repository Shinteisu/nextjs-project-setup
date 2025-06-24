import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { Category } from '../types';
import { mockStreams } from '../constants/mockData';
import StreamList from '../components/StreamList';
import Input from '../components/Input';

const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Gaming',
    imageUrl: 'https://via.placeholder.com/200',
    viewerCount: 150000,
    activeStreams: 1200,
  },
  {
    id: '2',
    name: 'Music',
    imageUrl: 'https://via.placeholder.com/200',
    viewerCount: 75000,
    activeStreams: 500,
  },
  {
    id: '3',
    name: 'Just Chatting',
    imageUrl: 'https://via.placeholder.com/200',
    viewerCount: 200000,
    activeStreams: 2000,
  },
  {
    id: '4',
    name: 'Creative',
    imageUrl: 'https://via.placeholder.com/200',
    viewerCount: 45000,
    activeStreams: 300,
  },
];

export default function DiscoverScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryStats}>
          {item.viewerCount?.toLocaleString()} viewers •{' '}
          {item.activeStreams?.toLocaleString()} live channels
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredStreams = mockStreams.filter(stream => {
    const matchesSearch = searchQuery
      ? stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stream.streamer.username.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? stream.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search streams, categories, or creators"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchInput}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        <FlatList
          data={MOCK_CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedCategory
            ? `${
                MOCK_CATEGORIES.find(cat => cat.id === selectedCategory)?.name
              } Streams`
            : 'Trending Streams'}
        </Text>
        {filteredStreams.length > 0 ? (
          <StreamList streams={filteredStreams} onStreamPress={() => {}} />
        ) : (
          <Text style={styles.emptyText}>No streams found</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  searchInput: {
    marginBottom: 0,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  categoriesList: {
    paddingRight: SPACING.md,
  },
  categoryItem: {
    width: 200,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCategoryItem: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  categoryImage: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.lightGray,
  },
  categoryInfo: {
    padding: SPACING.md,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  categoryStats: {
    fontSize: 12,
    color: COLORS.gray,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginVertical: SPACING.xl,
  },
});
