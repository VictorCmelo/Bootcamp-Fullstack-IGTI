import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getAllTransactions(period){

  const res = await axios.get(`${API_URL}?yearMonth=${period}`);

  return res.data;
}

export {getAllTransactions };