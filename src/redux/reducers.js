import {
    START_CAMERA,
    CAPTURE_IMAGE, // Update import
    VERATAD_SUCCESS,
    VERATAD_FAILURE,
    SET_LICENSE_PREVIEW,
    SET_BARCODE_PREVIEW,
    SEND_VERATAD_REQUEST,
    SEND_VERATAD_COMPLETE,
  } from './actions';
  import { combineReducers } from 'redux';
  
  const initialState = {
    isCameraActive: false,
    capturedImage: null,
    veratadData: null,
    veratadError: null,
    licensePreview: null,
    barcodePreview: null,
    isLoading: false,
  };
  
  
  const otherReducer = (state = initialState, action) => {
    switch (action.type) {
      case START_CAMERA:
        return { ...state, isCameraActive: true };
        case CAPTURE_IMAGE:
          console.log('Reducer CAPTURE_IMAGE called with:', action.payload);
          return { ...state, capturedImage: action.payload };
      case VERATAD_SUCCESS:
        return { ...state, veratadData: action.payload, veratadError: null, isLoading: false };
      case VERATAD_FAILURE:
        return { ...state, veratadData: null, veratadError: action.payload, isLoading: false };
      case SET_LICENSE_PREVIEW:
        return { ...state, licensePreview: action.payload };
      case SET_BARCODE_PREVIEW:
        return { ...state, barcodePreview: action.payload };
      case SEND_VERATAD_REQUEST:
        return { ...state, isLoading: true };
      case SEND_VERATAD_COMPLETE:
        return { ...state, isLoading: false };
      default:
        return state;
    }
  };
  
  const rootReducer = combineReducers({
    other: otherReducer, // Update reducer name
  });
  
  export default rootReducer;