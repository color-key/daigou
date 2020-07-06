import {Level} from './index';

const levels: Level[] = [
  {
    id: 0,
    name: 'medium'
  },{
    id: 1,
    name: 'high'
  },{
    id: 2,
    name: 'low'
  }
];

const error = {
  gwei: 'gwei cannot be equal to zero',
  gas: 'gas cannot be lower than '
};

const title = 'Transaction fee';
const additionalFee = 'Additional fee';

const modes = ['Quick mode', 'Advanced mode'];

export default {levels, error, title, additionalFee, modes};