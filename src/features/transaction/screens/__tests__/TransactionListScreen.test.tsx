import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from 'redux-mock-store';
import { useGetTransactionsQuery } from '../../services/transactionApi';
import TransactionListScreen from '../TransactionListScreen';

jest.mock('../../services/transactionApi');

const mockStore = configureStore([]);
const store = mockStore({
  transactions: {
    selectedTransaction: null
  },
  controls: {
    filterStatus: 'all',
    sortType: 'None'
  }
});

const mockNavigation = {
  navigate: jest.fn(),
};

describe('TransactionListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while fetching transactions', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <TransactionListScreen navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders transactions after fetching', async () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      data: {
        transactions: [
          { id: '1', merchant: 'Merchant A', amount: 100, date: '2023-01-01', status: 'completed' },
          { id: '2', merchant: 'Merchant B', amount: 200, date: '2023-01-02', status: 'pending' },
        ],
        page: 1,
        isTheEnd: false,
      },
      isLoading: false,
      error: null,
    });

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <TransactionListScreen navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Merchant A')).toBeTruthy();
      expect(getByText('Merchant B')).toBeTruthy();
    });
  });

  it('renders error message when fetching transactions fails', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <TransactionListScreen navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('Error fetching transactions')).toBeTruthy();
  });

  it('navigates to FilterModal when filter button is pressed', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <TransactionListScreen navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByText('Filter: ALL'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('FilterModal');
  });

  it('navigates to SortModal when sort button is pressed', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <TransactionListScreen navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByText('Sort: NONE'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SortModal');
  });
});