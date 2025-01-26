import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { CourseForm } from './components/CourseForm';
import { CourseList } from './components/CourseList';
import { GradeRules } from './components/GradeRules';
import type { Course, GradeRule } from './types';
import { defaultGradeRules } from './types';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [gradeRules, setGradeRules] = useState<GradeRule[]>(defaultGradeRules);

  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    setCourses([...courses, { ...newCourse, id: crypto.randomUUID() }]);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const calculateOverallGPA = () => {
    if (courses.length === 0) return 0;

    const totalGPA = courses.reduce((sum, course) => {
      const avgExamScore = course.examScores.reduce((a, b) => a + b, 0) / course.examScores.length;
      const finalScore = (avgExamScore * course.examWeight / 100) + 
                        (course.assignmentScore * course.assignmentWeight / 100);
      const rule = gradeRules.find(r => finalScore >= r.minScore && finalScore <= r.maxScore);
      return sum + (rule ? rule.gpa : 0);
    }, 0);

    return totalGPA / courses.length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="text-blue-500" />
            大学生 GPA 计算器
          </h1>
          <div className="text-xl font-semibold">
            总体 GPA: {calculateOverallGPA().toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CourseForm onAddCourse={handleAddCourse} />
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <GradeRules rules={gradeRules} onUpdateRules={setGradeRules} />
              <CourseList
                courses={courses}
                rules={gradeRules}
                onDeleteCourse={handleDeleteCourse}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;