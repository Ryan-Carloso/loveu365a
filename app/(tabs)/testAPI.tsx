import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Button } from 'react-native';
import { trackVisit } from '@/componentes/trackvisit';

export default function TestAPI() {
  const [message, setMessage] = useState<string>('');

  // Usando useEffect para quando o componente for montado
  useEffect(() => {
    // Chama a função assim que o componente é carregado
    trackVisit('Entrou na 2 pag');
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