import { md5 } from 'crypto-js';

export const generateGravatarURL = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`;
