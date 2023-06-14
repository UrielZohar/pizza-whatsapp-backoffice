
const fetchCollectionButton = document.querySelector('#fetchCollection');
const productsList = document.querySelector('.productsList');
const toppingsList = document.querySelector('.toppingsList');

const auth = firebase.auth();

// Firebase previously initialized using firebase.initializeApp().
var db = firebase.firestore();
if (location.hostname === "localhost") {
  db.useEmulator("127.0.0.1", 8080);
}

const debouncer = (callback) => {
  let timeoutRef;
  return (...args) => {
    clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => callback(...args), 1000);
  }
}

const updateProductAvalability = debouncer(async ({checked}, docId) => {
  await db.collection('pizza-types').doc(docId).update({enabled: checked});
  console.log('updated !');
});

const updateProductPrice = debouncer(async ({valueAsNumber: price}, docId) => {
  await db.collection('pizza-types').doc(docId).update({price});
  console.log('updated !');
});

const updateToppingAvalability = debouncer(async ({checked}, docId) => {
  await db.collection('toppings').doc(docId).update({enabled: checked});
  console.log('updated !');
});

const updateToppingPrice = debouncer(async ({valueAsNumber: price}, docId) => {
  await db.collection('toppings').doc(docId).update({price});
  console.log('updated !');
});

const setProductsList = (productsArr) => {
  productsList.innerHTML += productsArr.map(({id, text, price, enabled}) => `
    <div><input type="checkbox" ${enabled ? 'checked' : ''} onchange="updateProductAvalability(this, '${id}');"/></div>
    <div>${text}</div>
   <div><input class="price"type="number" value="${price}" onkeypress="updateProductPrice(this, '${id}');"/></div>
  `).join('');
};

const setToppingsList = (toppingsArr) => {
  toppingsList.innerHTML += toppingsArr.map(({id, text, price, enabled}) => `
    <div><input type="checkbox" ${enabled ? 'checked' : ''} onchange="updateToppingAvalability(this, '${id}');"/></div>
    <div>${text}</div>
   <div><input class="price"type="number" value="${price}" onkeypress="updateToppingPrice(this, '${id}');"/></div>
  `).join('');
};

const fetchCollection = async () => {
  // types
  const productsQuerySnapshot = await db.collection('pizza-types').get();
  const productsArr = productsQuerySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  setProductsList(productsArr);
  // toppings
  const toppingsQuerySnapshot = await db.collection('toppings').get();
  const toppingsArr = toppingsQuerySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  setToppingsList(toppingsArr);

}

setTimeout(fetchCollection, 0);
