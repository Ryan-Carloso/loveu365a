import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import styles from '../styles/styles';
import CodeInput from '../componentes/codeInput';
import ElapsedTime from '../componentes/elapsedTime';

interface Elogio {
  text: string;
}

interface User {
  elogios: string;
  image_urls: string;
  couplename: string;
  date_time: string;
}

interface CurrentElogio {
  text: string;
}

const App: React.FC = () => {
  const [currentElogio, setCurrentElogio] = useState<CurrentElogio | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [coupleName, setCoupleName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [elogiosArray, setElogiosArray] = useState<string[]>([]);
  const [currentElogioIndex, setCurrentElogioIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const loadCode = async () => {
      try {
        const storedCode = await AsyncStorage.getItem('userCode');
        if (storedCode) {
          setCode(storedCode);
          await fetchData(storedCode); // Fetch data once when the code is loaded
        }
      } catch (error: any) {
        console.error('Error loading code:', error.message);
      }
    };

    loadCode();
  }, []);

  useEffect(() => {
    // Change elogio and schedule notification every 24 hours
    const interval = setInterval(async () => {
      if (elogiosArray.length > 0 && imageUrls.length > 0) {
        console.log('Changing elogio and image');
        setCurrentElogioIndex((prevIndex) => (prevIndex + 1) % elogiosArray.length);
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }
    }, 86400000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, [elogiosArray, imageUrls]);

  useEffect(() => {
    if (elogiosArray.length > 0) {
      const newElogio = elogiosArray[currentElogioIndex];
      setCurrentElogio({ text: newElogio });
      // Update the notification with the new elogio
      scheduleRecurringNotification(newElogio);
    }
  }, [currentElogioIndex, elogiosArray]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      setCurrentImage(imageUrls[currentImageIndex]);
    }
  }, [currentImageIndex, imageUrls]);

  const fetchData = async (randomString: string): Promise<void> => {
    const API_URL = 'https://laqxbdncmapnhorlbbkg.supabase.co/rest/v1/users';
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NjE3MjUsImV4cCI6MjA0MjQzNzcyNX0.Zv-JETPTIq8X67KWcdFOG0yK9jtpszt7krJT082WyPU';

    try {
      const response: AxiosResponse<User[]> = await axios.get<User[]>(
        `${API_URL}?random_string=eq.${randomString}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            apikey: API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);

      if (response.data.length > 0) {
        const fetchedData: User = response.data[0];
        console.log('Fetched data from the database:', fetchedData);

        const elogiosData: string = fetchedData.elogios;

        if (elogiosData) {
          const elogiosText = elogiosData
            .replace(/\\/g, '')
            .match(/"([^"]+)"/g)
            ?.map((elogio) => elogio.replace(/"/g, '').trim());

          console.log('Elogios fetched:', elogiosText);
          if (elogiosText) {
            setElogiosArray(elogiosText);
            setCurrentElogio({ text: elogiosText[0] });
          } else {
            console.log('Elogios array is empty.');
          }
        }

        const imageUrls: string[] = JSON.parse(fetchedData.image_urls);
        console.log('Image URLs fetched:', imageUrls);
        if (imageUrls.length > 0) {
          setImageUrls(imageUrls);
          setCurrentImage(imageUrls[0]);
        } else {
          console.log('Image URLs array is empty.');
        }

        setCoupleName(fetchedData.couplename);
        if (!startDate) {
          setStartDate(new Date(fetchedData.date_time));
        }

        // Schedule notifications after fetching data
        await setupNotifications(elogiosArray[0]); // Schedule with the first elogio
      } else {
        console.log('No data found for the given code.');
        Alert.alert('Error', 'No data found for the given code.');
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      Alert.alert('Error', 'Could not fetch data. Please try again later.');
    }
  };

  const setupNotifications = async (initialElogio: string) => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      console.log('Existing permission status:', existingStatus);

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log('New permission status:', status);
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission not granted', 'You need to enable notifications in settings.');
        return false;
      }

      await scheduleInitialNotification();
      await scheduleRecurringNotification(initialElogio);
      console.log('Initial and recurring notifications scheduled.');
      return true;
    } catch (error) {
      console.error('Error setting up notifications:', error);
      Alert.alert('Error', 'Failed to set up notifications. Please try again.');
      return false;
    }
  };

  const scheduleInitialNotification = async () => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Love You 365 Days a Year! 💖",
          body: "My love, this app is a sweet reminder of how much you mean to me",
        },
        trigger: {
          seconds: 60, // 1 minute after submitting the code
        },
      });
      console.log('Initial notification scheduled successfully. ID:', notificationId);
    } catch (error) {
      console.error('Error scheduling initial notification:', error);
      Alert.alert('Error', 'Failed to schedule welcome notification. Please try again.');
    }
  };

  const scheduleRecurringNotification = async (elogioText: string) => {
    try {
      // Cancel any existing recurring notifications
      const existingNotificationId = await AsyncStorage.getItem('recurringNotificationId');
      if (existingNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(existingNotificationId);
        console.log('Canceled existing recurring notification with ID:', existingNotificationId);
      }

      // Schedule a new recurring notification with the current elogio
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Daily Compliment",
          body: elogioText, // Use the current elogio for the notification body
        },
        trigger: {
          seconds: 86400, // 24 hours
          repeats: true,
        },
      });

      console.log('Recurring notification scheduled successfully. ID:', notificationId);
      await AsyncStorage.setItem('recurringNotificationId', notificationId);
    } catch (error) {
      console.error('Error scheduling recurring notification:', error);
      Alert.alert('Error', 'Failed to schedule daily reminder. Please try again.');
    }
  };

  const handleCodeSubmit = async (newCode: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('userCode', newCode);
      setCode(newCode);
      await fetchData(newCode);
      const notificationsSet = await setupNotifications(elogiosArray[0]);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.coupleName}>{coupleName || 'Couple Name'}</Text>

        {currentElogio ? (
          <Text style={styles.elogioText}>{currentElogio.text}</Text>
        ) : (
          <Text style={styles.noElogioText}>No elogios available.</Text>
        )}

        {currentImage ? (
          <Image
            style={styles.image}
            source={{
              uri: `https://laqxbdncmapnhorlbbkg.supabase.co/storage/v1/object/public/images/${currentImage}`,
            }}
          />
        ) : (
          <Text style={styles.noImageText}>No image available.</Text>
        )}

        <ElapsedTime startDate={startDate} />

        <CodeInput onCodeSubmit={handleCodeSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
