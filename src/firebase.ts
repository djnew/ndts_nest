import { ServiceAccount } from 'firebase-admin';
import * as Firebase from 'firebase-admin';
import * as serviceAccount from './config/serviceAccountKey.json';

Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: `https://${process.env.FIREBASE_URL}.firebasedatabase.app`,
});

export const firebaseDb = Firebase.database();
