import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native'; // Importando AppState para detectar a saída do app
import * as Application from 'expo-application'; // Importando para obter o nome do app

// Função para capturar o horário de saída e enviar ao banco de dados
const logExitTime = async () => {
  console.log('Deu exit');  
  await trackVisit(`Exit time: ${new Date().toLocaleString()}`);
};
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

    // Obtendo o nome do app automaticamente



    // Enviar os dados para o banco de dados com o message "Exit time: ${TIMEofEXIT}"
    await axios.post("https://66b3-95-94-53-41.ngrok-free.app/api/track-visit", {
      user_id: userId,
      message: message, // Incluindo o nome do app na mensagem
      AppName: `${appName} Version: ${appVersion}`
    });

    console.log(`Mensagem enviada: ${message}`); // Loga a mensagem para verificar no console
  } catch (error) {
    console.error("Erro ao registrar visita:", error);

    // Se ocorrer um erro, envia a mensagem de erro para o servidor
    await sendErrorToServer(error);
  }
};

// Função para enviar erro para o servidor
const sendErrorToServer = async (error) => {
  const errorMessage = `Error: ${error.message || error.toString()}`;
  try {
    // Verificar se já existe um user_id salvo no SecureStore
    let userId = await SecureStore.getItemAsync("user_id");

    if (!userId) {
      const timestamp = Date.now();
      const randomValue = Math.random().toString(36).substring(2, 15);
      userId = `${timestamp}-${randomValue}`;

      await SecureStore.setItemAsync("user_id", userId);
    }

    // Enviar a mensagem de erro para o servidor
    await axios.post("https://66b3-95-94-53-41.ngrok-free.app/api/track-visit", {
      user_id: userId,
      message: errorMessage,
      AppName: `${appName} Version: ${appVersion}`

    });

    console.log(`Erro enviado: ${errorMessage}`);
  } catch (err) {
    console.error("Erro ao registrar erro:", err);
  }
};

// Usando o AppState para detectar quando o app vai para o fundo
AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'background') {
    // Quando o app vai para o fundo, registramos o horário de saída
    logExitTime();
  }
});