import * as functions from 'firebase-functions';
import {URL, default as Url} from 'url';
import crypto from 'crypto';
import fetch from 'node-fetch';
import * as domino from 'domino';
import UserAgent from 'user-agents';
import {getMetadata, IPageMetadata} from 'page-metadata-parser';

import * as admin from 'firebase-admin';
admin.initializeApp();

// Settings
const DEPLOY_REGION = 'europe-west3';
const FIREBASE_COLLECTION = 'url';

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();
firestore.settings({ignoreUndefinedProperties: true});
const urlCollection = firestore.collection(FIREBASE_COLLECTION);

exports.getMetadata = functions
  .region(DEPLOY_REGION)
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
    const id = getHashForUrl(urlData);
    const existingData = await urlCollection.doc(id).get();
    if (existingData.exists) {
      res.json(existingData.data());
    } else {
      const result = await getData(urlData);
      if (!result) {
        res.status(404);
        res.json({
          error: {
            code: 404,
            message: `Could not fetch ${urlData.toString()}`,
          },
        });
        return;
      }
      if (result.provider) await urlCollection.doc(id).set(result);
      res.json(result);
    }
  });

const getData = async (url: URL) => {
  const userAgent = new UserAgent([/Safari/, {deviceCategory: 'mobile'}]);
  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'text/xml,application/xhtml+xml,application/xml',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': userAgent.toString(),
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        authority: url.hostname,
        dnt: '1',
        from: 'development@q42.nl',
      },
      follow: 10,
      timeout: 10000,
    });
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url.toString());
    return getSpecificProviderData(doc, metadata);
  } catch (e) {
    functions.logger.error(`Could not fetch ${url.toString()}`, e);
    return null;
  }
};

const getSpecificProviderData = (doc: Document, metadata: IPageMetadata) => {
  if (metadata.provider === 'ah') {
    metadata.title = metadata?.title?.replace(' - Recept - Allerhande', '');
    metadata.title = metadata?.title?.replace(' - Video - Allerhande', '');
  }
  // Jumbo metadata image is their logo only. So we fetch the image by scraping the page
  if (metadata.provider === 'jumbo') {
    const img = doc.querySelector(
      'figure.jum-product-image > img',
    ) as HTMLImageElement;
    metadata.image =
      img?.getAttribute('data-jum-src') || img?.nodeName || metadata.image;
  }
  return metadata;
};

const getHashForUrl = (url: URL): string => {
  const cleanedUrl = Url.resolve(url.origin, url?.pathname || '');
  return crypto.createHash('sha256').update(cleanedUrl).digest('hex');
};
