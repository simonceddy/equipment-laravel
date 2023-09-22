import axios from 'axios';
import { MEDIA_URL } from '../../consts';

export function srcUrl(src) {
  return `${MEDIA_URL}/get/${src}`;
}

/**
 * Upload a file
 * @param {File} file file to upload
 * @returns {string|null}
 */
export async function upload(file) {
  const b = await file.arrayBuffer();
  console.log(b);
  const formData = new FormData();
  formData.append('uploaded-file', file);
  const res = await axios.post(`${MEDIA_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(res);
  return res.data.src ? srcUrl(res.data.src) : null;
}
