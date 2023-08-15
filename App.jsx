/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, StyleSheet, Linking, Button} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

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
  async function openUrl(url) {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalEnabled: true,
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Animation
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } else {
      Linking.openURL(url);
    }
  }

  const runFirst = `
      const backButton = document.querySelector("#open-pref")
      backButton.addEventListener('click', function(e){
        e.preventDefault()
        e.stopPropagation()
        window.ReactNativeWebView.postMessage(backButton.href); // Send the URL to React Native
      })
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>POC React Native CLI - Webview</Text>
      <WebView
        originWhitelist={['*']}
        style={styles.webview}
        source={{
          html,
        }}
        injectedJavaScript={runFirst}
        onMessage={event => {
          if (event.nativeEvent.data) {
            openUrl(event.nativeEvent.data);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default App;
