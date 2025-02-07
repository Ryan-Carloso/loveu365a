import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HowWorks() {
  const steps = [
    { title: "Share Your Heartfelt Details", description: "Enter your information, including a start date and a sweet message, then watch your love story come to life with a personalized preview of your gift." },
    { title: "Secure Your Love's Surprise", description: "Complete your purchase effortlessly and securely, ensuring a delightful gifting experience that brings smiles." },
    { title: "Customize with Love", description: "Add cherished photos and unique compliments that truly resonate with your relationship, making it a gift from the heart." },
    { title: "Receive Your Special Code", description: "Get a unique code after confirmation, unlocking the magic of our app and activating your thoughtful gift." },
    { title: "Delight Your Beloved!", description: "Unveil your gift and savor the moment as their eyes light up with joy, celebrating your love together!" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How It Works</Text>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF0F6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D63384',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#F8BBD0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#D63384',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 4,
    fontSize: 16,
  },
  stepDescription: {
    color: '#6C757D',
    fontSize: 14,
  },
});
