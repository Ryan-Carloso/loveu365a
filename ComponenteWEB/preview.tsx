import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PreviewProps {
  imageUris: string[];
  compliment: string;
  dateTime: string;
  couplename: string;
}

const Preview: React.FC<PreviewProps> = ({ imageUris, couplename, compliment, dateTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here's a preview 👇</Text>
      <IPhoneMockup>
        <Notification compliment={compliment} />
        <ImageSection imageUris={imageUris} couplename={couplename} />
        <ComplimentSection compliment={compliment} />
        <TimeElapsedSection date={dateTime} />
      </IPhoneMockup>
    </View>
  );
};

// 📱 iPhone Mockup
const IPhoneMockup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.iphoneContainer}>
      <View style={styles.notch} />
      <View style={styles.iphoneScreen}>{children}</View>
    </View>
  );
};

// 🔔 Notification Section
const Notification: React.FC<{ compliment: string }> = ({ compliment }) => {
  return (
    <View style={styles.notificationContainer}>
      
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTime}>Now</Text>
        <Text style={styles.notificationTitle}>LOVEU365</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>{compliment}</Text>
      </View>
    </View>
  );
};

// 🖼️ Image Section
const ImageSection: React.FC<{ imageUris: string[], couplename: string }> = ({ imageUris, couplename }) => {
  return (
    <View style={styles.imageWrapper}>
      <Text style={styles.coupleName}>{couplename}</Text>
      <View style={styles.imageContainer}>
        {imageUris.length > 0 ? (
          <Image source={{ uri: imageUris[0] }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No image loaded.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// 💖 Compliment Section
const ComplimentSection: React.FC<{ compliment: string }> = ({ compliment }) => {
  return (
    <View style={styles.complimentContainer}>
      <Text style={styles.complimentText}>{compliment}</Text>
    </View>
  );
};

// ⏳ Time Elapsed Section
const TimeElapsedSection: React.FC<{ date: string }> = ({ date }) => {
  const [elapsedTime, setElapsedTime] = useState<string>('');

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = new Date();
      const pastDate = new Date(date);
      const diff = now.getTime() - pastDate.getTime();
      
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      const timeParts: string[] = [];
      if (years > 0) timeParts.push(`${years} year${years > 1 ? 's' : ''}`);
      if (months % 12 > 0) timeParts.push(`${months % 12} month${months % 12 > 1 ? 's' : ''}`);
      if (days % 30 > 0) timeParts.push(`${days % 30} day${days % 30 > 1 ? 's' : ''}`);
      if (hours % 24 > 0) timeParts.push(`${hours % 24} hour${hours % 24 > 1 ? 's' : ''}`);
      if (minutes % 60 > 0) timeParts.push(`${minutes % 60} minute${minutes % 60 > 1 ? 's' : ''}`);

      setElapsedTime(timeParts.join(', '));
    };

    const interval = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>We've been together for: {elapsedTime}</Text>
    </View>
  );
};

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  iphoneContainer: {
    width: 300,
    height: 600,
    borderRadius: 30,
    backgroundColor: '#000',
    borderWidth: 14,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notch: {
    width: '40%',
    height: 24,
    backgroundColor: '#000',
    borderRadius: 10,
    position: 'absolute',
    top: -12,
  },
  iphoneScreen: {
    width: 272,
    height: 572,
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    padding: 8,
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
  },
  notificationIcon: {
    width: 40,
    height: 40,
  },
  notificationTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  notificationTime: {
    fontSize: 10,
    textAlign: 'right',
    color: '#666',
  },
  notificationTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 10,
    color: '#666',
  },
  imageWrapper: {
    marginTop: 60,
    alignItems: 'center',
  },
  coupleName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  imageContainer: {
    width: 200,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  complimentContainer: {
    position: 'absolute',
    bottom: 80,
  },
  complimentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  timeContainer: {
    position: 'absolute',
    bottom: 40,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Preview;
