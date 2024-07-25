import axios from 'axios';

export const searchRutronik = async (partNumber) => {
    try{
  const response = await axios.get(`https://www.rutronik24.com/api/search/?apikey=${process.env.RUTRONIK_API_KEY}&searchterm=${partNumber}`);
  return response?.data;
    }
    catch(err){
        console.log(err);
    }
};

