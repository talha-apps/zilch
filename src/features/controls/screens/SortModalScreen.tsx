import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSortType, setSortType } from '../state/controlSlice';
import { RootStackParamList } from '../../../app/navigation';
import { SORT_TYPES, SortType } from '../../../app/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SortModal'>;

const SortModalScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectSortType);

  const handleSortSelect = (sortType: SortType) => {
    dispatch(setSortType(sortType));
    navigation.goBack();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Sort Transactions</Text>

      {SORT_TYPES.map((sortOption) => (
        <TouchableOpacity
          key={sortOption}
          style={[
            styles.sortButton,
            currentSort === sortOption && styles.selectedSort,
          ]}
          onPress={() => handleSortSelect(sortOption)}
        >
          <Text style={styles.sortText}>{sortOption}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  sortButton: {
    padding: 12,
    marginVertical: 6,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0'
  },
  selectedSort: {
    backgroundColor: '#007AFF'
  },
  sortText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  cancelButton: {
    marginTop: 20,
    padding: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ddd'
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555'
  },
});

export default SortModalScreen;
