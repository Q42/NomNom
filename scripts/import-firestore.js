const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tell-me-what-to-eat-94d90.firebaseio.com'
});

const firestore = admin.firestore();

const importRecipes = async () => {
  const recipes = JSON.parse(fs.readFileSync('./output-keywords.json')) || [];
  const recipeRef = firestore.collection('recipes');
  
  const maxUploadSize = 500;

  let count = 0;

  while (count <= recipes.length) {
    const batch = firestore.batch();

    recipes.slice(count, maxUploadSize + count).forEach(recipe => {
      batch.set(recipeRef.doc(), recipe);
    });
    
    await batch.commit();

    count += maxUploadSize;
  }
}

importRecipes();