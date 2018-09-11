const userApi = "http://localhost:1337/api/https://blockchain.info/rawaddr/";
const usdApi = "https://blockchain.info/ticker";

function user(id, offset) {
  const url = `${userApi}${id}?offset=${offset}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then(res => res, err => Promise.reject(err));
}

function usd() {
  return fetch(usdApi)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then(res => res.USD.last, err => Promise.reject(err));
}

export { user, usd };
