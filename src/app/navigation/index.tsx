import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TransactionListScreen from '../../features/transaction/screens/TransactionListScreen';
import TransactionDetailScreen from '../../features/transaction/screens/TransactionDetailScreen';
import { Transaction } from '../types';
import FilterModalScreen from '../../features/controls/screens/FilterModalScreen';
import SortModalScreen from '../../features/controls/screens/SortModalScreen';

export type RootStackParamList = {
  TransactionList: undefined;
  FilterModal: undefined;
  SortModal: undefined;
  TransactionDetail: { transaction: Transaction };
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TransactionList" component={TransactionListScreen} options={{ title: 'Transactions' }} />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          ...TransitionPresets.DefaultTransition, // Smooth sliding transition
          title: 'Transaction Details',
          animation: 'slide_from_right', // Ensures sliding from right effect
          gestureEnabled: true, // Enables swipe back gestures
          headerShown: false, // Hide default headers
        }}
      />
      <Stack.Screen
        name="FilterModal"
        component={FilterModalScreen}
        options={{
          presentation: 'modal', // Makes it slide up like a modal
          headerShown: false, // Hide default header for modal
        }}
      />
      <Stack.Screen
        name="SortModal"
        component={SortModalScreen}
        options={{
          presentation: 'modal', // Makes it slide up like a modal
          headerShown: false, // Hide default header for modal
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
