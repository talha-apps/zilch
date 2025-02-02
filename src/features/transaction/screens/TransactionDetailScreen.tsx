import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';


type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { transaction } = route.params;

  const fadeAnim = new Animated.Value(0); // Initial opacity set to 0

  // Fade-in effect when the screen loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} testID="transaction-detail-screen">

      {/* Custom Back Button */}
      <Animated.View style={[styles.backButton, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonTouchable} testID="back-button">
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.title}>Transaction Details</Text>
      <Text style={styles.label}>Merchant:</Text>
      <Text style={styles.value} testID="transaction-merchant">{transaction.merchant}</Text>

      <Text style={styles.label}>Amount:</Text>
      <Text style={styles.value}>${transaction.amount.toFixed(2)}</Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{transaction.date}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={[styles.value, { color: transaction.status === 'completed' ? 'green' : 'orange' }]}>
        {transaction.status.toUpperCase()}
      </Text>

      <Text style={styles.label}>Instalments:</Text>
      <Text style={styles.value}>{transaction.instalments.paid} / {transaction.instalments.total} Paid</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    paddingBottom: 16,
    flexWrap: 'wrap'
  },
  backButtonTouchable: {
    flexGrow: 1
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold'
  },
});

export default TransactionDetailScreen;
