import { Path } from './api.types';

export const apiPath: Record<string, Record<string, Path>> = {
  auth: {
    login: ['post', '/auth/login'],
  },
  shifts: {
    get: ['get', '/shifts'],
    add: ['post', '/shifts'],
  },
  workers: {
    get: ['get', '/users/workers'],
    add: ['post', '/users/add-worker'],
  },
  myLeaves: {
    get: ['get', '/leaves/my'],
  },
  times: {
    get: ['get', '/times/my'],
  },
  myLeavePetitions: {
    get: ['get', '/leaves/petitions/as/worker'],
    add: ['post', '/leaves/petitions'],
    remove: ['delete', (petitionId: number) => `/leaves/petitions/${petitionId}`],
  },
  workerLeavePetitions: {
    get: ['get', '/leaves/petitions/as/supervisor'],
    handle: ['patch', (petitionId: number, action: 'accept' | 'deny') => `/leaves/petitions/${petitionId}/${action}`],
  },
};

export enum ShowToast {
  ON_SUCCESS = 'onSuccess',
  ON_ERROR = 'onError',
  ALWAYS = 'always',
}

export const API_URL = 'http://localhost:3001';
