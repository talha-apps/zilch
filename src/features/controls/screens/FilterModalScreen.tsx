import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootStackParamList } from '../../../app/navigation';
import { selectFilterStatus, setFilterStatus } from '../state/controlSlice';
import { FILTER_STATUS, FilterStatus } from '../../../app/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FilterModal'>;

const FilterModalScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilterStatus);

  const handleFilterSelect = (filter: FilterStatus) => {
    dispatch(setFilterStatus(filter)); // Update Redux state
    navigation.goBack(); // Close modal
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Filter Transactions</Text>

      {FILTER_STATUS.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            currentFilter === filter && styles.selectedFilter,
          ]}
          onPress={() => handleFilterSelect(filter)}
        >
          <Text style={styles.filterText}>{filter.toUpperCase()}</Text>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterButton: {
    padding: 12,
    marginVertical: 6,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    marginTop: 20,
    padding: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default FilterModalScreen;
