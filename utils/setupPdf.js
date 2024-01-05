// Function to set up label PDF document
const setupPDF = (doc) => {
  const pageWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const labelWidth = pageWidth / 2;
  const labelHeight = pageHeight / 6;
  const margin = 10; // Margin around each label

  return { labelWidth, labelHeight, margin, pageHeight };
};

export default setupPDF;