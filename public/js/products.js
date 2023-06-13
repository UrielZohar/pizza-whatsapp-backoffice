
const fetchCollectionButton = document.querySelector('#fetchCollection');
const productsList = document.querySelector('.productsList');

const auth = firebase.auth();

// Firebase previously initialized using firebase.initializeApp().
var db = firebase.firestore();
if (location.hostname === "localhost") {
  db.useEmulator("127.0.0.1", 8080);
}

const updateProductAvalability = async ({checked}, docId) => {
  await db.collection('pizza-types').doc(docId).update({enabled: checked});
  console.log('updated !');
}

const setProductsList = (productsArr) => {
  productsList.innerHTML += productsArr.map(({id, text, price, enabled}) => `
    <div><input type="checkbox" ${enabled ? 'checked' : ''} onchange="updateProductAvalability(this, '${id}');"/></div>
    <div>${text}</div>
   <div><input class="price"type="number" value="${price}"/></div>
  `).join('');
}

const fetchCollection = async () => {
  const productQuerySnapshot = await db.collection('pizza-types').get();
  const productsArr = productQuerySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  setProductsList(productsArr);
}

setTimeout(fetchCollection, 0);
