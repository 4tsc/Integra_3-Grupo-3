import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const frasesAleatorias = [
    'Hola, ¿en qué puedo ayudarte hoy?',
    '¿Cómo estás? ¿Hay algo específico de lo que te gustaría hablar?',
    '¡Hola! ¿En qué puedo asistirte?',
    'Estoy aquí para ayudarte. ¿Tienes alguna pregunta?',
    // Agrega más frases según sea necesario
];

export function Example() {
    const [messages, setMessages] = useState([])

    /*useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)],    
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])*/

    const onSend = useCallback((messages = []) => {
        console.log(messages)
        const fraseAleatoria = frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)];
        const newMessage = {

            _id: 1,
            text: frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)],
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        }



        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessage),

        )
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}