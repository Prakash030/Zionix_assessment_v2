import axios from 'axios';

export const searchElement14 = async (partNumber) => {
  try{
  const response = await axios.get(`http://api.element14.com/catalog/products?term=manuPartNum:${partNumber}&storeInfo.id=in.element14.com&resultsSettings.offset=0&resultsSettings.numberOfResults=1&resultsSettings.refinements.filters=inStock&resultsSettings.responseGroup=medium&callInfo.omitXmlSchema=false&callInfo.callback=&callInfo.responseDataFormat=json&callinfo.apiKey=${process.env.ELEMENT14_API_KEY}`);
  return response?.data;
  }
  catch(err){
      console.log(err);
  }
};

