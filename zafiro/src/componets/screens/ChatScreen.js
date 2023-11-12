import React, { useState, useCallback, useEffect } from "react";
import { WebView } from "react-native-webview";

export function ChatScreen() {
    

    return (
        <>
            <WebView
                source={{ uri: "https://console.dialogflow.com/api-client/demo/embedded/35abdc44-5c4b-4588-9426-d404bb868c35" }}
                style={{ flex: 1 }}
            />
            
        </>
    );
}
