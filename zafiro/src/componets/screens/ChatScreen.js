import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { v4 as uuidv4 } from "uuid";

const opciones = [
    "https://www.google.com",
    "https://dte.uct.cl",
    "https://biblioteca.uct.cl",
    "https://inkatun.uct.cl",
];

export function ChatScreen() {
    const [messages, setMessages] = useState([]);

    const handleOptionSelection = useCallback((opcionIndex) => {
        const selectedOption = opciones[opcionIndex - 1];
        if (selectedOption) {
            window.open(selectedOption, "_blank"); // Abre el enlace en una nueva pestaña
        }
    }, []);

    const onSend = useCallback((userMessages = []) => {
        const userMessage = userMessages[0];
        setMessages((previousMessages) => GiftedChat.append(previousMessages, userMessage));

        // Verifica si el mensaje del usuario contiene una opción válida y maneja la redirección
        const lastUserMessage = userMessage.text.match(/\d+/); // Extrae el número del mensaje
        if (lastUserMessage && lastUserMessage[0] >= 1 && lastUserMessage[0] <= opciones.length) {
            handleOptionSelection(lastUserMessage[0]);
        }

        // Simula la respuesta del bot después de un breve retraso
        setTimeout(() => {
            const botMessage = {
                _id: uuidv4(),
                text: "Selecciona una opción:\n1. Recursos \n2. DTE \n3. Biblioteca \n4. INKATUN ",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Chatbot",
                },
            };
            setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
        }, 1000); // Simula un retraso de 1 segundo antes de que el bot responda
    }, [handleOptionSelection]);

    useEffect(() => {
        // Cuando el componente se monta, inicia la conversación con un mensaje del bot
        const initialBotMessage = {
            _id: uuidv4(),
            text: "Hola, ¿en qué puedo ayudarte hoy?",
            createdAt: new Date(),
            user: {
                _id: 2,
                name: "Chatbot",
            },
        };
        setMessages([initialBotMessage]);
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderAvatar={null}
        />
    );
}
