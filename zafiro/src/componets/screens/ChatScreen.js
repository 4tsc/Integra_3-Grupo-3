import React, {
    useState,
    useCallback,
    Fragment,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { v4 as uuidv4 } from "uuid";
const frasesAleatorias = [
    "Hola, ¿en qué puedo ayudarte hoy?",
    "¿Cómo estás? ¿Hay algo específico de lo que te gustaría hablar?",
    "¡Hola! ¿En qué puedo asistirte?",
    "Estoy aquí para ayudarte. ¿Tienes alguna pregunta?",
    "En que puedo ayudarte",
    // Agrega más frases según sea necesario
];

export function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const onSend = useCallback((messages = []) => {
        const chatMessage = {
            _id: uuidv4(),
            text: frasesAleatorias[
                Math.floor(Math.random() * frasesAleatorias.length)
            ],
            createdAt: new Date(),
            user: {
                _id: 2,
                name: "Chatbot",
            },
        };
        setMessages((previousMessages) => {
            return GiftedChat.append(
                previousMessages,
                [...messages, chatMessage].reverse()
            );
        });
    }, []);
    return (

        <GiftedChat
            messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderAvatar={null}
        />

    );
}
