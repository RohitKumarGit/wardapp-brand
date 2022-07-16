import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDGHfyeoX0W8fO431ZGKYqmMUR7I0ZG9aI",
  authDomain: "dewarr-923ad.firebaseapp.com",
  projectId: "dewarr-923ad",
  storageBucket: "dewarr-923ad.appspot.com",
  messagingSenderId: "158708291966",
  appId: "1:158708291966:web:8f0814a3f7f77b7b15fb2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MoralisProvider
        appId={process.env.MORALIS_APP_ID}
        serverUrl={process.env.MORALIS_APP_URL}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
