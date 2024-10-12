import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, Alert, Linking } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import styles from '../styles/styles';
import CodeInput from '../componentes/codeInput';
import ElapsedTime from '../componentes/elapsedTime';
import { handleCodeSubmit } from '../util/handlesubmit';


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

        // Initialize the notification index if it doesn't exist
        const storedIndex = await AsyncStorage.getItem('notificationIndex');
        if (!storedIndex) {
          await AsyncStorage.setItem('notificationIndex', '0'); // Start from 0
        }
      } catch (error: any) {
        console.error('Error loading code:', error.message);
      }
    };

    loadCode();
  }, []);

  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      // Check if the URL starts with your scheme
      if (url.startsWith('loveu365a://')) {
        const code = url.split('/').pop(); // Extract the code from the URL
        if (code) {
          setCode(code);
          await fetchData(code); // Fetch data with the new code
        }
      }
    };
  
    // Add the event listener
    const subscription = Linking.addEventListener('url', ({ url }) => handleDeepLink(url));
  
    // Get the initial URL if the app is opened via a deep link
    const getInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };
  
    getInitialURL();
  
    // Clean up the event listener on component unmount
    return () => {
      subscription.remove();
    };
  }, []);
  

  useEffect(() => {
    // Change elogio and schedule notification every 24 hours
    const interval = setInterval(() => {
      if (elogiosArray.length > 0 && imageUrls.length > 0) {
        console.log('Changing elogio and image');

        // Increment the elogio index and handle wrap-around
        setCurrentElogioIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % elogiosArray.length;
          // Update the elogio based on the new index
          setCurrentElogio({ text: elogiosArray[newIndex] });
          scheduleRecurringNotification(elogiosArray[newIndex]); // Schedule with the new elogio
          return newIndex;
        });

        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }
    }, 86400000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, [elogiosArray, imageUrls]);

  useEffect(() => {
    if (elogiosArray.length > 0) {
      // Update current elogio when the index changes
      const newElogio = elogiosArray[currentElogioIndex];
      setCurrentElogio({ text: newElogio });
      // Schedule notifications with the current elogio
      scheduleRecurringNotification(newElogio);
    }
  }, [currentElogioIndex, elogiosArray]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      setCurrentImage(imageUrls[currentImageIndex]);
    }
  }, [currentImageIndex, imageUrls]);

  const fetchData = async (randomString: string): Promise<void> => {
    const API_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const API_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY;

    try {
      const response: AxiosResponse<User[]> = await axios.get<User[]>(
        `${API_URL}/rest/v1/users?random_string=eq.${randomString}`,
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
          if (elogiosText && elogiosText.length > 1) {
            // Ignore the first elogio
            const filteredElogios = elogiosText.slice(1);
            setElogiosArray(filteredElogios);
            setCurrentElogio({ text: filteredElogios[0] });
          } else {
            console.log('Elogios array is empty.');
          }
        }

        const imageUrls: string[] = JSON.parse(fetchedData.image_urls);
        setImageUrls(imageUrls);
        setCurrentImage(imageUrls[0]);
        

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
          seconds: 100, // 1 minute after submitting the code for initial testing
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
      // Retrieve the current index from AsyncStorage
      const storedIndex = await AsyncStorage.getItem('notificationIndex');
      let currentIndex = storedIndex ? parseInt(storedIndex) : 0;

      // Create the title using the current index
      const notificationTitle = `Day ${currentIndex + 1}: A reminder that I love you every single day!`; // Incremented by 1 for display

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationTitle,
          body: elogioText,
        },
        trigger: {
          seconds: 86400, // 24 hours
        },
      });

      console.log('Recurring notification scheduled successfully. ID:', notificationId);
      console.log(notificationTitle)
      console.log('body:', elogioText)
      console.log('index:', currentIndex)


      // Increment and store the current index for the next notification
      currentIndex++;
      await AsyncStorage.setItem('notificationIndex', currentIndex.toString());
    } catch (error) {
      console.error('Error scheduling recurring notification:', error);
      Alert.alert('Error', 'Failed to schedule recurring notification. Please try again.');
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
          <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: currentImage }}
          />
          </View>
        ) : (
          <Text style={styles.noImageText}>No image available.</Text>
        )}


        <ElapsedTime startDate={startDate} />

        <CodeInput onCodeSubmit={(newCode) => handleCodeSubmit(newCode, setCode, fetchData, elogiosArray, setupNotifications)} />
        </ScrollView>
    </SafeAreaView>
  );
};

export default App;