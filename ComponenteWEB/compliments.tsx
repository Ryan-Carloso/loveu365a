import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface ComplimentsProps {
  compliment: string;
  couplename: string;
  setCompliment: (compliment: string) => void;
  setCouplename: (couplename: string) => void;
}

const Compliments: React.FC<ComplimentsProps> = ({ compliment, setCompliment, couplename, setCouplename }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Couple's name:</Text>
      <TextInput
        style={styles.input}
        value={couplename}
        onChangeText={setCouplename}
        placeholder="Noah and Mary"
      />
      <Text style={styles.description}>
        Add your couple's name to see it in preview.
      </Text>

      <Text style={styles.label}>Share Your Love Compliment</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={compliment}
        onChangeText={setCompliment}
        placeholder='Express your love! E.g., "I will love you every day for the rest of my life."'
        multiline
      />
      <Text style={styles.description}>
        Your compliment will appear daily in notifications and on the app's homepage.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#EC4899',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', // Aligns text properly in multiline inputs
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    marginBottom: 8,
  },
});

export default Compliments;
