import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Button } from 'react-native';

const trackVisit = async (message: string) => {
  try {
    // Passando a mensagem para o endpoint
    await axios.post("https://analyticsfast.vercel.app/api/track-visit", { user_id: "TEST11", message });
    console.log(message); // Logar a mensagem para verificar no console
  } catch (error) {
    console.error("Erro ao registrar visita:", error);
  }
};

export default function TestAPI() {
  const [message, setMessage] = useState<string>('');

  // Usando useEffect para quando o componente for montado
  useEffect(() => {
    // Chama a função assim que o componente é carregado
    trackVisit('Entrou na página');
  }, []);

  return (
    <View>
      <Text>test</Text>
      
      {/* Button para disparar a função trackVisit */}
      <Button title="Registrar Visita" onPress={() => trackVisit('Clicou no botão')} />
      
      {/* Mensagem de status após clicar no botão */}
      {message && <Text>{message}</Text>}
    </View>
  );
}