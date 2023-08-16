/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#00b1ea',
  },
});

const html = `
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <body style="display:flex; flex-direction: column; flex: 1; justify-content: center; align-items: center; cursor: pointer">
    <h1>WebView</h1>
    <a id="open-pref" style="text-align: center; background: #00b1ea; text-decoration: none; padding: 8px; border-radius: 8px; font-weight: bold; color: white" href="https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=239658604-73c9a865-0538-4a7e-b656-297faa9470a8&device-override=mobile">Open preference</a>
  </body>
`;

function App() {
  useEffect(() => {
    Linking.addEventListener('url', event => {
      const {url} = event;
      if (url !== null && url.includes('iosapp://')) {
        InAppBrowser.close();
      }
    });
  }, []);
  async function openUrl(url) {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#00b1ea',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalEnabled: true,
        // Android Properties
        showTitle: true,
        toolbarColor: '#00b1ea',
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
