const URL = "https://swapi.dev/api/";

let configGet = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  url: "",
};

export const getPeople = async (params) => {
  configGet.url = URL + "people/?page=" + params;
  //console.log(URL + params, configGet);
  return await fetch(configGet.url)
    .then((resp) => resp.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getMoreInfoPeople = async (params) => {
  configGet.url = URL + "people/" +params;
  return await fetch(configGet.url)
    .then((resp) => resp.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};


export const getFilms = async (params) => {
  configGet.url = URL + "films/" +params;
  return await fetch(configGet.url)
    .then((resp) => resp.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};