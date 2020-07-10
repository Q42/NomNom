import * as functions from 'firebase-functions';
import * as urlMetadata from 'url-metadata';

exports.getMetadata = functions.https.onRequest(async (req, res) => {
  const url = req.query.url as string;
  if (url == null) {
    res.status(404);
    return;
  }
  const metadata = await urlMetadata(url);
  res.json(metadata);
});
