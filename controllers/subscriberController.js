import multer from 'multer';
import Subscriber from '../models/subscriberModel.js';
import { parseCSV } from '../utils/csvParser.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, }).single('file');

// .single('file') is a middleware that tells multer to accept only a single file in the form data. The file is expected to be uploaded with the field name 'file'.
// When a request with multipart/form-data is made to your server, multer processes the file upload. After processing, the file information is made available in req.file.

export const uploadSubscriber = (req, res) => {
  upload(req, res, async (error) => {
    if (error) return res.status(500).send('Error uploading file!');

    if (!req.file) return res.status(400).send('No File uploaded!');

    try {
      const subsribers = await parseCSV(req.file.path);
      await Subscriber.insertMany(subsribers);
      res.status(200).send('Subsribers imported successfully.');
    } catch (error) {
      console.error(err);
      res.status(500).send('Error processing file.');
    }
  });
};
