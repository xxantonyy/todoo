import priority1SVG from './img/priority_1.svg';
import priority2SVG from './img/priority_2.svg';
import priority3SVG from './img/priority_3.svg';
import { ICategoryOptions, IPriorityOptions } from './types';

const priority: Record<number, IPriorityOptions> = {
  0: {
    label: 'Низкий',
    value: 'low',
    img: priority1SVG,
  },
  1: {
    label: 'Средний',
    value: 'medium',
    img: priority2SVG,
  },
  2: {
    label: 'Высокий',
    value: 'high',
    img: priority3SVG,
  },
};
const category: Record<number, ICategoryOptions> = {
  0: {
    label: 'Работа',
    value: 'work',
    img: 'work',
  },
  1: {
    label: 'Личное',
    value: 'personal',
    img: 'personal',
  },
  2: {
    label: 'Другое',
    value: 'other',
    img: 'other',
  },
};

export { priority, category };
