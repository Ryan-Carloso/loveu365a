import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the love message delivery work?",
      answer: "Once you create your personalized love messages, we schedule them to be delivered to your loved one's app or email at the specified times. They'll receive a notification for each new message."
    },
    {
      question: "Can I change my messages or photos after I've set them up?",
      answer: "Yes! You can edit, add, or remove messages at any time through your account dashboard. Changes will be reflected in future deliveries."
    },
    {
      question: "How do I receive my personalized app after payment?",
      answer: "After payment, you'll see a page where you can personalize your app. Then, a code will be generated, which you can paste into the mobile or web app to access your page."
    },
    {
      question: "Does the personalized page have an expiration date?",
      answer: "If you choose the basic plan, yes, one year. If you choose the Eternal plan, the personalized app will be available to you for life."
    },
    {
      question: "Can I include photos or videos in my messages?",
      answer: "Yes, you can! The Basic or Eternal plan allows you to attach photos and short video clips to your messages, making them even more personal and memorable."
    },
    {
      question: "What is the cost to create a page on LOVEU365?",
      answer: "Currently, the cost to create a page on LOVEU365 is only $12.99 for the basic plan and $17.99 for the PRO plan."
    },
    {
      question: "How long does it take to receive the Code for personalizing the app?",
      answer: "Credit card payments are processed immediately."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support via email at support@makebyryan.tech."
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqCard}>
          <TouchableOpacity style={styles.question} onPress={() => toggleQuestion(index)}>
            <Text style={styles.questionText}>{faq.question}</Text>
            <Feather name={openIndex === index ? "chevron-up" : "chevron-down"} size={20} color="#D63384" />
          </TouchableOpacity>
          {openIndex === index && <Text style={styles.answer}>{faq.answer}</Text>}
        </View>
      ))}
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
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D63384',
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: '#6C757D',
  },
});
