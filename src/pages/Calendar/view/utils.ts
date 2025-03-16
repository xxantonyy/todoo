import { ICategoryOptions, IPriorityOptions } from "./types";
import priority_1_SVG from './img/priority_1.svg';
import priority_2_SVG from './img/priority_2.svg';
import priority_3_SVG from './img/priority_3.svg';

const priority: Record<number, IPriorityOptions> = {
  0: {
    label: 'Низкий',
    value: 'low',
    img: priority_1_SVG,
  },
  1: {
    label: 'Средний',
    value: 'medium',
    img: priority_2_SVG,
  },
  2: {
    label: 'Высокий',
    value: 'high',
    img: priority_3_SVG,
  },
}
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

export { priority, category }