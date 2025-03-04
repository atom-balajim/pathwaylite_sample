import { sendVeratad, veratadSuccess, veratadFailure } from './actions';

export const sendVeratadAsync = (base64License, base64Barcode) => {
  return async (dispatch) => {
    dispatch(sendVeratad({ base64License, base64Barcode }));
    try {
      // Simulated Veratad API call (replace with your actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      const simulatedResponse = {
        licenseDetails: {
          name: 'John Doe',
          dob: '1990-01-01',
        },
        barcodeData: '1234567890',
      };
      dispatch(veratadSuccess(simulatedResponse));
    } catch (error) {
      dispatch(veratadFailure(error.message || 'Error processing data'));
    }
  };
};
