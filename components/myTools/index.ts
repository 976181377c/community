import Base64 from "base64url";
const token = window.localStorage.getItem("token");
interface userInfo {
  uid: string;
  name: string;
}
const tools = {
  getToken: () => {
    return token;
  },

  setToken: (token: any) => {
    if (!(token == null)) {
      window.localStorage.setItem("token", token);
      token = window.localStorage.getItem("token");
    }
  },

  getUid: () => {
    if (token != undefined) {
      const userInfo: userInfo = JSON.parse(Base64.decode(token));
      return userInfo.uid;
    }
    throw "未登陆";
    return null;
  },
  getName: () => {
    if (token != undefined) {
      const userInfo: userInfo = JSON.parse(Base64.decode(token));
      return userInfo.name;
    }
    throw "未登陆";
    return null;
  },

  clearToken: () => {
    window.localStorage.clear();
  },
};

export default tools;
