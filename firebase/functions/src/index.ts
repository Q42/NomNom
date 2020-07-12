import * as functions from 'firebase-functions';
import {URL, default as Url} from 'url';
import crypto from 'crypto';
import fetch from 'node-fetch';
import * as domino from 'domino';
import UserAgent from 'user-agents';
import {getMetadata, IPageMetadata} from 'page-metadata-parser';

import * as admin from 'firebase-admin';
admin.initializeApp();

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();
firestore.settings({ignoreUndefinedProperties: true});
const urlCollection = firestore.collection('url');

exports.getMetadata = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    if (req.query.url == null) {
      res.status(400);
      res.json({
        error: {
          code: 400,
          message: 'Bad request: "url" query parameter is required.',
        },
      });
      return;
    }
    const urlData = new URL(Url.parse(req.query.url as string).href);
    const cleanedUrl = Url.resolve(urlData.origin, urlData?.pathname || '');
    const id = crypto.createHash('sha256').update(cleanedUrl).digest('hex');
    const existingData = await urlCollection.doc(id).get();
    if (existingData.exists) {
      res.json(existingData.data());
    } else {
      const result = await getData(cleanedUrl);
      await urlCollection.doc(id).set(result);
      res.json(result);
    }
  });

const getData = async (url: string) => {
  const userAgent = new UserAgent({deviceCategory: 'mobile'});
  const response = await fetch(`${url}?t=${Date.now()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/xml',
      From: 'development@q42.nl',
      'User-Agent': userAgent.toString(),
    },
    follow: 10,
    timeout: 30000,
  });
  const html = await response.text();
  const doc = domino.createWindow(html).document;
  const metadata = getMetadata(doc, url);
  return getSpecificProviderData(doc, metadata);
};

const getSpecificProviderData = (doc: Document, metadata: IPageMetadata) => {
  if (metadata.provider === 'ah') {
    metadata.title = metadata?.title?.replace(' - Recept - Allerhande', '');
  }
  if (metadata.provider === 'jumbo') {
    const img = doc.querySelector(
      'figure.jum-product-image > img',
    ) as HTMLImageElement;
    metadata.image =
      img?.getAttribute('data-jum-src') || img?.nodeName || metadata.image;
  }
  return metadata;
};
