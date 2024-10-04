// util/handlesubmit.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const handleCodeSubmit = async (
    newCode: string,
    setCode: React.Dispatch<React.SetStateAction<string>>, // Add setCode as a parameter
    fetchData: (code: string) => Promise<void>, // Add fetchData as a parameter
    elogiosArray: string[], // Pass elogiosArray to setup notifications
    setupNotifications: (elogio: string) => Promise<boolean>
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem('userCode', newCode);
      setCode(newCode);
      await fetchData(newCode); // Call fetchData with the new code
      const notificationsSet = await setupNotifications(elogiosArray[0]); // Use elogiosArray from App
      if (notificationsSet) {
        Alert.alert('Success', 'Code saved, data fetched, and notifications set up successfully!');
      } else {
        Alert.alert('Partial Success', 'Code saved and data fetched, but notifications could not be set up.');
      }
    } catch (error: any) {
      console.error('Error in handleCodeSubmit:', error.message);
      
      Alert.alert('Error', 'Could not process your request. Please try again.');
    }
  };
  