import Vconsole from 'vconsole';
import { isMobile } from 'react-device-detect';

// eslint-disable-next-line import/prefer-default-export
export const startVconsole = () => isMobile && new Vconsole();

export const toBase64 = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    resolve(e.target.result);
  };
});
