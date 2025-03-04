export const START_CAMERA = 'START_CAMERA';
export const CAPTURE_IMAGE = 'CAPTURE_IMAGE';
export const SEND_VERATAD = 'SEND_VERATAD';
export const VERATAD_SUCCESS = 'VERATAD_SUCCESS';
export const VERATAD_FAILURE = 'VERATAD_FAILURE';
export const SET_LICENSE_PREVIEW = 'SET_LICENSE_PREVIEW';
export const SET_BARCODE_PREVIEW = 'SET_BARCODE_PREVIEW';
export const SEND_VERATAD_REQUEST = 'SEND_VERATAD_REQUEST';
export const SEND_VERATAD_COMPLETE = 'SEND_VERATAD_COMPLETE';

export const startCamera = () => ({
  type: START_CAMERA,
});

export const captureImage = (imageDataUrl) => ({
  type: CAPTURE_IMAGE,
  payload: imageDataUrl,
});

export const sendVeratad = (image) => ({
  type: SEND_VERATAD,
  payload: image,
});

export const veratadSuccess = (data) => ({
  type: VERATAD_SUCCESS,
  payload: data,
});

export const veratadFailure = (error) => ({
  type: VERATAD_FAILURE,
  payload: error,
});

export const setLicensePreview = (previewUrl) => ({
  type: SET_LICENSE_PREVIEW,
  payload: previewUrl,
});


export const setBarcodePreview = (previewUrl) => ({
  type: SET_BARCODE_PREVIEW,
  payload: previewUrl,
});

export const sendVeratadRequest = () => ({
  type: SEND_VERATAD_REQUEST,
});

export const sendVeratadComplete = () => ({
  type: SEND_VERATAD_COMPLETE,
});