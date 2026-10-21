import axios from 'axios';
export const api = axios.create({ baseURL:'/api',withCredentials:true });
let csrfToken = '';
api.interceptors.request.use(config => { if (csrfToken) config.headers['X-CSRF-Token']=csrfToken; return config; });
api.interceptors.response.use(response => { if (response.data.csrfToken) csrfToken=response.data.csrfToken; return response; });
export const errorText = (error:unknown) => {
 if (axios.isAxiosError(error)) {
  const data=error.response?.data;
  if (data?.details?.length) return data.details.map((v:{message:string}) => v.message).join(' ');
  return data?.error || 'Neizdevās sazināties ar serveri.';
 }
 return 'Darbība neizdevās. Mēģiniet vēlreiz.';
};
export async function get<T>(url:string):Promise<T> { return (await api.get(url)).data.data; }

