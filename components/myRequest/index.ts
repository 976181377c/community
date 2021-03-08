// const api = `http://119.29.79.248:8080`;
const api = `http://localhost:8080`;

export default {
  get: (url: String, queryParams: any) => {
    return new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject("错误");
      };
      xhr.open("get", api + url, true);
      xhr.send(queryParams);
    });
  },
  post: (url: String, queryParams: any) => {
    return new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject("错误");
      };
      xhr.open("post", api + `` + url, true);
      const data = new FormData();
      for (const key in queryParams) {
        data.append(key, queryParams[key]);
      }
      xhr.send(data);
    });
  },
};
