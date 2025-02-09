import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';
import * as Application from 'expo-application';

const trackVisit = async (message: string, isError = false) => {
  try {
    // Get or create user ID
    let userId = await SecureStore.getItemAsync("user_id");
    if (!userId) {
      userId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      await SecureStore.setItemAsync("user_id", userId);
    }

    // Get app info
    const appName = Application.applicationName;
    const appVersion = Application.nativeApplicationVersion;

    // Format the message based on whether it's an error
    const formattedMessage = isError 
      ? `Error: ${message} | App: ${appName}`
      : `${message}`;

    // Send to server
    await axios.post("https://66b3-95-94-53-41.ngrok-free.app/api/track-visit", {
      user_id: userId,
      message: formattedMessage,
      AppName: `${appName} Version: ${appVersion}`
    });

    console.log(`${isError ? 'Error' : 'Message'} sent: ${formattedMessage}`);
  } catch (err) {
    // Se der erro ao enviar, tenta enviar o erro
    try {
      console.error("Failed to track user activity:", err);
      await trackVisit(err.message || err.toString(), true);
    } catch {
      // Se falhar ao enviar o erro, só loga localmente
      console.error("Failed to send error track:", err);
    }
  }
};
// Handle app state changes
AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'background') {
    trackVisit(`Exit time: ${new Date().toLocaleString()}`);
  }
});

export { trackVisit };