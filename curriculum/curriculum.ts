import { Curriculum } from '../types';

// Import all per-book curriculum data (these will be split into separate chunks)
import { goaldigger1Data } from './data/gd1';
import { goaldigger2Data } from './data/gd2';
import { goaldigger3Data } from './data/gd3';
import { goaldigger4Data } from './data/gd4';
import { smStarterData } from './data/sm-starter';
import { sm1Data } from './data/sm1';
import { sm2Data } from './data/sm2';
import { sm3Data } from './data/sm3';
import { sm4Data } from './data/sm4';
import { sw6Data } from './data/sw6';
import { sw7Data } from './data/sw7';
import { sw8Data } from './data/sw8';
import { sw9Data } from './data/sw9';
import { g10Data } from './data/g10';
import { g11Data } from './data/g11';
import { g12Data } from './data/g12';

// Complete curriculum with all imported data
export const curriculumData: Curriculum = [
  {
    category: { en: 'Kindergarten IVS-Mastery', vi: 'Mầm non IVS-Mastery' },
    levels: [
      goaldigger1Data,
      goaldigger2Data,
      goaldigger3Data,
      goaldigger4Data,
    ],
  },
  {
    category: { en: 'Primary IVS-Mastery', vi: 'Tiểu học IVS-Mastery' },
    levels: [
      smStarterData,
      sm1Data,
      sm2Data,
      sm3Data,
      sm4Data,
    ],
  },
  {
    category: { en: 'Secondary IVS-Mastery', vi: 'Trung học IVS-Mastery' },
    levels: [
      sw6Data,
      sw7Data,
      sw8Data,
      sw9Data,
    ],
  },
  {
    category: { en: 'High School', vi: 'Trung học phổ thông' },
    levels: [
      g10Data,
      g11Data,
      g12Data,
    ],
  },
];

// For lazy loading individual levels (optional)
export const getCurriculumData = async (): Promise<Curriculum> => {
  return curriculumData;
};

export default curriculumData;
