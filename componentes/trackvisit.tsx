import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native'; // Importando AppState para detectar a saída do app
import * as Application from 'expo-application'; // Importando para obter o nome do app


const appName = Application.applicationName; // Obtendo o nome do app
const appVersion = Application.nativeApplicationVersion; // Obtendo a versão do app

// Função para rastrear a visita e enviar ao servidor
export const trackVisit = async (message: string) => {
  try {
    // Verificar se já existe um user_id salvo no SecureStore
    let userId = await SecureStore.getItemAsync("user_id");

    // Se não houver um user_id salvo, gerar um novo com timestamp e valor aleatório
    if (!userId) {
      const timestamp = Date.now(); // Obtém o timestamp atual
      const randomValue = Math.random().toString(36).substring(2, 15); // Gera um valor aleatório
      userId = `${timestamp}-${randomValue}`; // Combina o timestamp e o valor aleatório

      await SecureStore.setItemAsync("user_id", userId); // Salvando o user_id de forma segura
    }
    await axios.post("https://66b3-95-94-53-41.ngrok-free.app/api/track-visit", {
      user_id: userId,
      message: message, // Incluindo o nome do app na mensagem
      AppName: `${appName} Version: ${appVersion}`
    });

    console.log(`Mensagem enviada: ${message}`); // Loga a mensagem para verificar no console
} catch (error: unknown) {
    console.error("Erro ao registrar visita:", error);
  }
};

AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'background') {
    console.log('Deu exit');  
    trackVisit(`Exit time: ${new Date().toLocaleString()}`);
}
});
