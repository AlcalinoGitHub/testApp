import { firestore } from '$lib/firebase.js';

const getData = async () => {
  const querySnapshot = await firestore.collection('Tasks').get();
  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
  return data;
};

export default getData;