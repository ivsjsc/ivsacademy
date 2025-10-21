import type { ClassData, StudentProgress } from '../types';

const DEMO: Record<string, ClassData> = {
  'class-1': {
    classId: 'class-1',
    className: 'Lớp 6A1',
    teacher: 'teacher-demo-001',
    level: '6',
    students: [
      {
        studentId: 's1',
        studentName: 'Nguyễn Văn A',
        score: 8.2,
        lessonsCompleted: 80,
        strengths: ['Vocabulary', 'Grammar'],
        areasForImprovement: ['Speaking'],
        lastActivity: '2025-09-01'
      },
      {
        studentId: 's2',
        studentName: 'Trần Thị B',
        score: 6.5,
        lessonsCompleted: 60,
        strengths: ['Reading'],
        areasForImprovement: ['Writing', 'Speaking'],
        lastActivity: '2025-09-02'
      }
    ],
    averageScore: 7.35,
    totalLessons: 100,
    completionRate: 70
  },
  'class-2': {
    classId: 'class-2',
    className: 'Lớp 7B2',
    teacher: 'teacher-demo-002',
    level: '7',
    students: [
      {
        studentId: 's3',
        studentName: 'Phạm C',
        score: 7.4,
        lessonsCompleted: 70,
        strengths: ['Listening', 'Grammar'],
        areasForImprovement: ['Writing'],
        lastActivity: '2025-09-01'
      }
    ],
    averageScore: 7.4,
    totalLessons: 100,
    completionRate: 70
  }
};

export function fetchClassAnalyticsDemo(classId: string): ClassData | null {
  return DEMO[classId] || null;
}

export const demoClassOptions = Object.entries(DEMO).map(([id, classData]) => ({
  id,
  name: classData.className,
  classData
}));