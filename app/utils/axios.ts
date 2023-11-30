import axios, {AxiosResponse} from 'axios';

export const request = axios.create({
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

request.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  async response => {
    const {
      data: {code, data, message},
    } = response;
    if (code === 200) {
      return response;
    } else {
      return Promise.reject({code, message});
    }
  },
  error => {
    console.warn('request error:', error);

    try {
      const {message, code} = error;
      console.error('error2:', code, message);
    } catch (e) {
      console.log('error3:', e);
    }

    return Promise.reject(error);
  },
);

export function getAxios<T = any, U = any>({
  url,
  params,
}: {
  url: string;
  params?: T;
}) {
  // const { query } = useRouter()
  return new Promise((resolve, reject) => {
    request<any, AxiosResponse<U>, T>({
      url,
      method: 'get',
      params,
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// axios的post请求
export function postAxios<T = any, U = any>({
  url,
  data,
}: {
  url: string;
  data?: T;
}) {
  return new Promise((resolve, reject) => {
    request
      .post<any, AxiosResponse<U>, T>(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default axios;
