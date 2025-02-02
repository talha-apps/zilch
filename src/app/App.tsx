import ErrorBoundary from './error/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation';
export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ErrorBoundary>
    </Provider >
  );
}
