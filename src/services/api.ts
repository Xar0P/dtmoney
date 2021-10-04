import axios from 'axios';

export const api = axios.create({ // setar informações padrão para todas requisições
	baseURL: 'http://localhost:3000/api', // endereço padrao
});