import csvtojson from 'csvtojson';

// This utility function uses csvtojson to parse a CSV file and return JSON data.

export const parseCSV = async (filePath) => {
  return await csvtojson().fromFile(filePath);
};
