import React, { useState, useRef } from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View,
  Alert
} from 'react-native';
import { init } from 'embed-react-native-sdk';
import { createConfiguration, ServerConfiguration, ThoughtSpotRestApi } from '@thoughtspot/rest-api-sdk';
import { LStrong } from './src/lbstrong';


export default function App() {
  const [credentials, setCredentials] = useState({
    tsHost: '',
    username: '',
    password: '',
    secretKey: ''
  });
  const [viewConfig, setViewConfig] = useState({
    liveboardId: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = async () => {
    try {
      const { tsHost, username, password, secretKey } = credentials;
      
      const config = createConfiguration({
        baseServer: new ServerConfiguration(tsHost, {}),
      });
      
      const tsRestApiClient = new ThoughtSpotRestApi(config);
      init({
        thoughtSpotHost: tsHost,
        authType: "AuthServerCookieless",
        getAuthToken: async () => {
          try {
            const data = await tsRestApiClient.getFullAccessToken({
              username,
              // password,
              secret_key: secretKey,
              validity_time_in_sec: 30000,
            });
            return data.token;
          } catch (error) {
            Alert.alert(error as string)
            throw error;
          }
        },
        loginFailedMessage: "Login Failed",
        logLevel: "debug",
        customizations: {
          style: {
            customCSS: {
              variables: {
                "--ts-var-root-background": "#fef4dd",
                "--ts-var-root-color": "#4a4a4a",
                "--ts-var-viz-title-color": "#8e6b23",
                "--ts-var-viz-title-font-family": "'Georgia', 'Times New Roman', serif",
                "--ts-var-viz-title-text-transform": "capitalize",
                "--ts-var-viz-description-color": "#6b705c",
                "--ts-var-viz-description-font-family": "'Verdana', 'Helvetica', sans-serif",
                "--ts-var-viz-description-text-transform": "none",
                "--ts-var-viz-border-radius": "6px",
                "--ts-var-viz-box-shadow": "0 3px 6px rgba(0, 0, 0, 0.15)",
                "--ts-var-viz-background": "#fffbf0",
                "--ts-var-viz-legend-hover-background": "#ffe4b5",
                "--ts-var-root-secondary-color":"#f5e0b8",
              },
            },
          },
        }, 
          
      });

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
      Alert.alert(
        "Error",
        `Authentication failed: ${error as string}`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
