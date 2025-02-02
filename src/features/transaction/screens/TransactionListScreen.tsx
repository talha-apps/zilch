
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, ListRenderItemInfo } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { useGetTransactionsQuery } from '../services/transactionApi';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectFilterStatus, selectSortType } from '../../controls/state/controlSlice';
import { Transaction } from '../../../app/types';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getFilteredTransactions, getSortedTransactions } from '../../../app/utils';
type Props = NativeStackScreenProps<RootStackParamList, 'TransactionList'>;

const TransactionListScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [page, setPage] = useState(1); // Track the page for pagination
  const [fetchedPages, setFetchedPages] = useState<number[]>([]); // Track fetched pages
  const { data, isLoading, error } = useGetTransactionsQuery(page);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const filterStatus = useAppSelector(selectFilterStatus);
  const sortType = useAppSelector(selectSortType);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isTheEnd, setIsTheEnd] = useState(false);


  useEffect(() => {
    if (data != null && !fetchedPages.includes(data.page)) {
      setAllTransactions((prevTransactions) => [...prevTransactions, ...data.transactions]);
      if (data.isTheEnd) {
        setIsTheEnd(true);
      }
      setLoadingMore(false);
    }
  }, [data, fetchedPages]);

  const filteredTransactions = getFilteredTransactions(allTransactions, filterStatus);

  const sortedTransactions = getSortedTransactions(filteredTransactions, sortType);

  const loadMoreTransactions = useCallback(() => {
    if (isTheEnd || loadingMore) return;
    setLoadingMore(true);
    setPage((prev) => prev + 1);

  }, [isTheEnd, fetchedPages, page, loadingMore, isLoading]);

  const _renderItem = useCallback(({ item }: ListRenderItemInfo<Transaction>) => {
    return (<TouchableOpacity
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
      style={styles.card}
    >
      <Text style={styles.merchant}>{item.merchant}</Text>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.status}>{item.status.toUpperCase()}</Text>
    </TouchableOpacity>
    );
  }, [navigation]);


  if (isLoading && !loadingMore) return <ActivityIndicator size="large" color="blue" testID="loading-indicator" />;
  if (error) return <Text style={styles.error}>Error fetching transactions</Text>;


  return (
    <View style={styles.container} testID="transaction-list">
      <View style={styles.controls}>
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('FilterModal')}>
          <Text style={styles.filterButtonText}>Filter: {filterStatus.toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('SortModal')}>
          <Text style={styles.filterButtonText}>Sort: {sortType.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item, index) => String(index)}
        renderItem={_renderItem}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="gray" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  merchant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#555',
  },
  filterButton: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransactionListScreen;
