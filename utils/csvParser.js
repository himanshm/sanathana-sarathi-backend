import csvtojson from 'csvtojson';

const parseCsv = async (buffer) => {
  return await csvtojson().fromString(buffer.toString());
};

export default parseCsv;
