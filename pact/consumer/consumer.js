const axios = require('axios');

const fetchCountries = async (URL, PORT) => {
  const res = await axios.get(`${URL}:${PORT}/countries`);
  return res.data;
};

const fetchSingleCountry = async (URL, PORT, code) => {
  const response = await axios
    .get(`${URL}:${PORT}/countries/${code}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};


module.exports = {
  fetchCountries,
  fetchSingleCountry,
};
