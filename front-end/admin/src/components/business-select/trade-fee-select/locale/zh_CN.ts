import {Level} from './index';

const levels: Level[] = [
  {
    id: 0,
    name: '标准'
  },{
    id: 1,
    name: '高'
  },{
    id: 2,
    name: '低'
  }
];

const error = {
  gwei: 'gwei不可以为0',
  gas: 'gas不可以低于'
};

const title = '交易费用';
const additionalFee = '附加费用';

const modes = ['快捷模式', '高级模式'];

export default {levels, error, title, additionalFee, modes};