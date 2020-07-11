import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import * as domino from 'domino';
import {getMetadata} from 'page-metadata-parser';

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
    const url = req.query.url as string;
    const result = await getData(url);
    res.json(result);
  });

const getData = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/xml',
      From: 'development@q42.nl',
      'User-Agent': 'TellMeWhatToEat App',
    },
    follow: 10,
    timeout: 30000,
  });
  const html = await response.text();
  const doc = domino.createWindow(html).document;
  const metadata = getMetadata(doc, url);
  if (metadata.provider === 'ah') {
    metadata.title = metadata?.title?.replace(' - Recept - Allerhande', '');
  }
  if (metadata.provider === 'jumbo') {
    const el = doc.querySelector(
      'figure[data-jum-product-image="default-main-image"]',
    );
    const img = el?.querySelector('img');
    metadata.image = img?.src;
  }
  return metadata;
};
