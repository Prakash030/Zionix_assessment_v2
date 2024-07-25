import axios from 'axios';

export const searchMouser = async (partNumber) => {
  try {
    const apiKey = process.env.MOUSER_API_KEY;
    const response = await axios.post(`https://api.mouser.com/api/v1/search/partnumber?apiKey=${apiKey}`, {
      SearchByPartRequest: {
        mouserPartNumber: partNumber,
        partSearchOptions: 'string',
      },
    });
    return response?.data;
  }
  catch (err) {
    console.log(err);
  }
};

