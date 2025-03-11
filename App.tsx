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
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2770EF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  embedContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
   headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E2E2E', 
    paddingHorizontal: 10,
    height: 50,
  },
  headerText: {
    color: '#FFFFFF', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F39C12',
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#FFFFFF', 
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  embed: {
    flex: 1,
  },
  footer: {
    height: 50,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});
