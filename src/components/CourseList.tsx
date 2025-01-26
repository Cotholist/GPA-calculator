import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Course, GradeRule } from '../types';

interface CourseListProps {
  courses: Course[];
  rules: GradeRule[];
  onDeleteCourse: (id: string) => void;
}

export function CourseList({ courses, rules, onDeleteCourse }: CourseListProps) {
  const calculateFinalScore = (course: Course) => {
    const avgExamScore = course.examScores.reduce((a, b) => a + b, 0) / course.examScores.length;
    return (avgExamScore * course.examWeight / 100) + 
           (course.assignmentScore * course.assignmentWeight / 100);
  };

  const calculateGPA = (score: number) => {
    const rule = rules.find(r => score >= r.minScore && score <= r.maxScore);
    return rule ? rule.gpa : 0;
  };

  const sortedCourses = [...courses].sort((a, b) => 
    calculateFinalScore(b) - calculateFinalScore(a)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">课程列表</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">排名</th>
              <th className="px-4 py-2">课程名称</th>
              <th className="px-4 py-2">考试成绩</th>
              <th className="px-4 py-2">平时成绩</th>
              <th className="px-4 py-2">最终成绩</th>
              <th className="px-4 py-2">GPA</th>
              <th className="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((course, index) => {
              const finalScore = calculateFinalScore(course);
              const gpa = calculateGPA(finalScore);
              return (
                <tr key={course.id}>
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">
                    {course.examScores.join(', ')}
                  </td>
                  <td className="px-4 py-2">{course.assignmentScore}</td>
                  <td className="px-4 py-2">{finalScore.toFixed(1)}</td>
                  <td className="px-4 py-2">{gpa.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onDeleteCourse(course.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}