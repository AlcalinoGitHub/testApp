
import { firestore } from '$lib/firebase.js';

const getData = async () => {
  const querySnapshot = await firestore.collection('Users').get();
  const data = querySnapshot.docs.map((doc) => doc.data());
  console.log('data:', data);
  return data;
};

export default getData;