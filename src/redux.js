import { listObjects } from "./utils";
import { store } from "./index";

const initialState = {
  photos: [],
  currentView: "All",
  selectedPhoto: {},
  loading: false
};

export const selectPhoto = photo => {
  return {
    type: "SELECT_PHOTO",
    payload: photo
  };
};

export const viewAll = () => {
  return {
    type: "VIEW_ALL"
  };
};

export const uploadPhoto = photo => {
  return {
    type: "UPLOAD_PHOTO",
    payload: photo
  };
};

export const fetchPhotos = () => {
  listObjects().then(res => {
    const photos = res.map(photo => {
      return {
        fileName: photo.Key,
        url: encodeURI(`http://react.sprint.s3.amazonaws.com/${photo.Key}`)
      };
    });
    store.dispatch({
      type: "FETCH_PHOTOS",
      payload: photos
    });
  });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return Object.assign({}, state, { loading: true });
    case "SELECT_PHOTO":
      return Object.assign({}, state, {
        selectedPhoto: action.payload,
        currentView: "Single"
      });
    case "VIEW_ALL":
      return Object.assign({}, state, {
        selectedPhoto: {},
        currentView: "All",
        loading: true
      });
    case "FETCH_PHOTOS":
      return Object.assign({}, state, {
        photos: action.payload,
        loading: false
      });
    case "UPLOAD_PHOTO":
      return Object.assign({}, state, {
        photos: [...state.photos, action.payload],
        selectedPhoto: action.payload,
        currentView: "Single"
      });
    default:
      return state;
  }
};
