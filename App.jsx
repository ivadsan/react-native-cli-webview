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

function App() {
  const runFirst = `
      const backButton = document.querySelector("#group_content > div.group-back-url > a")
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
          uri: 'https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=239658604-49220b41-cdfe-4dd0-b41c-bf806e95ed3c&device-override=mobile',
        }}
        injectedJavaScript={runFirst}
      />
    </SafeAreaView>
  );
}

export default App;
