import './loader';
import './api';
import './footer/footer';
import './exercises';
import './scroll-to-top.js';
import './switch-pages.js';
import './header.js';
import './quote.js';
import Modal from './modal.js';

const modal = new Modal();
const data = {
  _id: '64f389465ae26083f39b1ab2',
  bodyPart: 'back',
  equipment: 'barbell',
  gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/1316.gif',
  name: 'barbell bent arm pullover',
  target: 'lats',
  description:
    'These large back muscles are responsible for shoulder adduction and horizontal extension. Pull-ups and lat pulldowns are common exercises targeting the lats.',
  rating: 3.13,
  burnedCalories: 324,
  time: 3,
  popularity: 5314,
};
modal.showModal(data);
