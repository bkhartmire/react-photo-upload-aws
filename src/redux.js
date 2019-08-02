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
      payload: photos.slice(0, 20)
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
    default:
      return state;
  }
};
