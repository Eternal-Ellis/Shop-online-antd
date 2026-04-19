const API_DOMAIN = "https://69e4ec62cfa9394db8da8879.mockapi.io/";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
}

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers:{
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(options)
  })
  const result = await response.json()
  return result;
}

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
}

export const path = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers:{
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}