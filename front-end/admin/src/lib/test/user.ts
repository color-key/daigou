import {getUser} from './request';

export const getUserName = () => getUser().then(user => user.name);