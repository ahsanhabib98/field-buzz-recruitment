const localhost = 'https://recruitment.fisdev.com';
const localhost1 = 'http://127.0.0.1:8000'

const apiURL = '/api';
const apiURL1 = '/api';

export const endpoint = `${localhost}${apiURL}`;
export const endpoint1 = `${localhost1}${apiURL1}`;

export const loginURL = `${endpoint}/login/`;
export const infoURL = `${endpoint1}/create/`;
export const cvUploadURL = tsync_id => `${endpoint1}/upload-cv/${tsync_id}/`;
