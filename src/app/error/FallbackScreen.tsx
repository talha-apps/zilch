

import { Button, StyleSheet, View, Text } from 'react-native';



interface FallBackProps {
    error: Error | null;
    onRetry: () => void;
}

export const FallbackScreen = (fallbackProps: FallBackProps) => {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong.</Text>
          <Text style={styles.error}>{fallbackProps.error?.message}</Text>
          <Button title="Retry" onPress={fallbackProps.onRetry} />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    error: {
      fontSize: 16,
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
  });