/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#00FF00',
  },
});

const html = `
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <body style="display:flex; flex-direction: column; flex: 1; justify-content: center; align-items: center; cursor: pointer">
    <h1>WebView</h1>
    <a id="open-pref" style="text-align: center; background: lightblue; text-decoration: none; padding: 8px; border-radius: 8px; font-weight: bold" href="https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=239658604-49220b41-cdfe-4dd0-b41c-bf806e95ed3c&device-override=mobile">Open preference</a>
  </body>
`;

function App() {
  const runFirst = `
      const backButton = document.querySelector("#open-pref")
      backButton.addEventListener('click', function(e){
        e.preventDefault()
        e.stopPropagation()
        window.alert('Mega empanada: ' + backButton.href)  
      })
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>POC new 1.1</Text>
      <WebView
        originWhitelist={['*']}
        style={styles.webview}
        source={{
          html,
        }}
        injectedJavaScript={runFirst}
      />
    </SafeAreaView>
  );
}

export default App;
