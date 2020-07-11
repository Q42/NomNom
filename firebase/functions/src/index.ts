import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import * as domino from 'domino';
import UserAgent from 'user-agents';
import {getMetadata, IPageMetadata} from 'page-metadata-parser';

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
