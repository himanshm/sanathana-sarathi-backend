import express from 'express';
import PDFDocument from 'pdfkit';
import mongoose from 'mongoose';

const router = express.Router();

// Function to set up label PDF document
const setupPDF = (doc) => {
    const pageWidth = 595.28; // A4 width in points
    const pageHeight = 841.89; // A4 height in points
    const labelWidth = pageWidth / 2;
    const labelHeight = pageHeight / 6;
    const margin = 10; // Margin around each label

    return { labelWidth, labelHeight, margin, pageHeight };
};

router.post('/generate-labels', async (req, res) => {
    try {
        // Replace 'YourCollectionName' with the actual collection name passed in the request
        const { collectionName } = req.body;
        if (!collectionName) {
            return res.status(400).send('Collection name not provided');
        }


        // Check if the model has already been compiled
        let Model;
        if (mongoose.models[collectionName]) {
            Model = mongoose.model(collectionName);
        } else {
            // Compile the model if it's not already compiled
            const schema = new mongoose.Schema({}, { strict: false });
            Model = mongoose.model(collectionName, schema);
        }

        const data = await Model.find({}); // Fetch all documents

        const doc = new PDFDocument({ size: 'A4' });
        const { labelWidth, labelHeight, margin, pageHeight } = setupPDF(doc);
    
        let x = 0, y = 0;
        data.forEach((item, index) => {
            // Formatting data into a readable string format
            let labelContent = '';
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    labelContent += `${key}: ${item[key]}\n`; // Adjust as per your data structure
                }
            }
    
            doc
                .fontSize(10)
                .text(labelContent, x + margin, y + margin, { width: labelWidth - 2 * margin, height: labelHeight - 2 * margin });
    
            x += labelWidth;
            if ((index + 1) % 3 === 0) { // After every third label, reset x and increment y
                x = 0;
                y += labelHeight;
            }
    
            // Adding a new page if y exceeds page height
            if (y >= pageHeight) {
                doc.addPage();
                y = 0; // Reset y position
            }
        });

        // Finalize the PDF and send to client
        res.setHeader('Content-disposition', 'attachment; filename=labels.pdf');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error('Error generating labels:', error.message);
        res.status(500).send('Error generating labels');
    }
});

export default router;
