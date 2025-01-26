export interface Course {
  id: string;
  name: string;
  examScores: number[];
  assignmentScore: number;
  examWeight: number;
  assignmentWeight: number;
}

export interface GradeRule {
  minScore: number;
  maxScore: number;
  gpa: number;
}

export const defaultGradeRules: GradeRule[] = [
  { minScore: 95, maxScore: 100, gpa: 4.0 },
  { minScore: 90, maxScore: 94, gpa: 3.7 },
  { minScore: 85, maxScore: 89, gpa: 3.3 },
  { minScore: 80, maxScore: 84, gpa: 3.0 },
  { minScore: 75, maxScore: 79, gpa: 2.7 },
  { minScore: 70, maxScore: 74, gpa: 2.3 },
  { minScore: 65, maxScore: 69, gpa: 2.0 },
  { minScore: 60, maxScore: 64, gpa: 1.7 },
  { minScore: 0, maxScore: 59, gpa: 0 },
];