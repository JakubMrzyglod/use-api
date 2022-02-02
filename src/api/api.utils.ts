import cogoToast from 'cogo-toast';
import { ShowToast } from './api.constants';

export const handleToast = (showToast?: ShowToast) => (type: 'success' | 'error', message?: string) => {
  const isSuccess = type === 'success';
  const allowTypes = [ShowToast.ALWAYS, ShowToast[isSuccess ? 'ON_SUCCESS' : 'ON_ERROR']];
  if (showToast && allowTypes.includes(showToast)) {
    message = message ?? (isSuccess ? 'Succeeded' : 'Error');
    cogoToast[isSuccess ? 'success' : 'error'](message);
  }
};
