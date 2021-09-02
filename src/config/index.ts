import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBh1wzojydyKVXfRkoVwEH38Gx2GnnqmtQ",
    authDomain: "instagramx-ed413.firebaseapp.com",
    projectId: "instagramx-ed413",
    storageBucket: "instagramx-ed413.appspot.com",
    messagingSenderId: "549723177366",
    appId: "1:549723177366:web:e6f2b232447ce4cc0e5db7",
    measurementId: "G-7XJS51HNVD"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {
    firebase,
    Auth
};