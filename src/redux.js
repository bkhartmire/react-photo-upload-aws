import { listObjects } from "./utils";

const redux = require("redux");

const initialState = {
  photos: [],
  currentView: "All",
  selectedPhoto: {}
  // base64Array: [],
  // photoKeys: []
};

export const selectPhoto = photoObj => {
  return {
    type: "SELECT_PHOTO",
    payload: photoObj
  };
};

export const viewAll = () => {
  return {
    type: "VIEW_ALL"
  };
};

export const insertBase64 = (base64str, photoKey) => {
  return {
    type: "INSERT_BASE64",
    payload: {
      base64str,
      photoKey
    }
  };
};

export const getPhotos = () => {
  return {
    type: "GET_PHOTOS",
    payload: JSON.parse(window.localStorage.getItem("photos"))
  };
};
export const fetchPhotos = () => {
  listObjects().then(res => {
    window.localStorage.setItem("photos", JSON.stringify(res.slice(0, 20)));
    return {
      type: "FETCH_PHOTOS",
      payload: res.slice(0, 20)
    };
  });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PHOTO":
      return Object.assign({}, state, {
        selectedPhoto: action.payload,
        currentView: "Single"
      });

    case "VIEW_ALL":
      return Object.assign({}, state, {
        selectedPhoto: {},
        currentView: "All"
      });

    case "GET_PHOTOS":
      return Object.assign({}, state, { photos: action.payload });

    case "FETCH_PHOTOS":
      return Object.assign({}, state, { photos: action.payload });

    case "INSERT_BASE64":
      return Object.assign({}, state, {
        base64Array: [...state.base64Array, action.payload.base64str],
        photoKeys: [...state.photoKeys, action.payload.photoKey]
      });

    default:
      return state;
  }
};
