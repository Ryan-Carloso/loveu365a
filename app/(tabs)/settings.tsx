import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { registerTranslation } from 'react-native-paper-dates'; // Import registerTranslation
import { enGB } from 'react-native-paper-dates';
registerTranslation('en', enGB);





import Header from '@/ComponenteWEB/Header';
import DateTimePicker from '@/ComponenteWEB/datetime';

import Compliments from '@/ComponenteWEB/compliments';
import ImgUpload from '@/ComponenteWEB/imgUpload';
import Preview from '@/ComponenteWEB/preview';
//import AlertGoPay from '@/functions/AlertGoPay';
import HowWorks from '@/ComponenteWEB/Howworks';
import FAQ from '@/ComponenteWEB/FAQ';
import SocialMedia from '@/ComponenteWEB/SocialMedia';



export default function App() {
  const [date, setDate] = useState(new Date());
  const [compliment, setCompliment] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [couplename, setCouplename] = useState('');

  const handleDateChange = useCallback((selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, []);

  const pickImage = useCallback((event: any) => {
    const files = event.target.files;
    if (files) {
      const uris = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageUris((prevUris) => [...prevUris, ...uris]);
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setImageUris((prevUris) => prevUris.filter((_, i) => i !== index));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Header />
        <View style={styles.mainContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Pick a special date ❤️</Text>

        <DateTimePicker date={date} onDateChange={handleDateChange} /> 
             
            <Compliments
              compliment={compliment}
              setCompliment={setCompliment}
              couplename={couplename}
              setCouplename={setCouplename}
            />

            <ImgUpload imageUris={imageUris} pickImage={pickImage} removeImage={removeImage} />
{/*   
            <TouchableOpacity style={styles.button}>
              <AlertGoPay alert="I want an App personalized" />
            </TouchableOpacity>
            */}
          </View>


          <Preview
            imageUris={imageUris}
            compliment={compliment}
            dateTime={format(date, 'MMMM dd, yyyy HH:mm:ss')}
            couplename={couplename}
          />

        </View>
        
      </View>
      

      <HowWorks />
      <FAQ />
      <SocialMedia />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#F8E1F4',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#FBD3D8',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 16,
  },
  mainContent: {
    flexDirection: 'column',
    padding: 16,
  },
  formContainer: {
    
    paddingRight: 16,
  },
  title: {
    textAlign: 'center',
    color: '#EC4899',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#F472B6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
});