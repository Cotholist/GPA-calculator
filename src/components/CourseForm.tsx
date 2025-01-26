import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import type { Course } from '../types';

interface CourseFormProps {
  onAddCourse: (course: Omit<Course, 'id'>) => void;
}

export function CourseForm({ onAddCourse }: CourseFormProps) {
  const [name, setName] = useState('');
  const [examScores, setExamScores] = useState<string[]>(['']);
  const [assignmentScore, setAssignmentScore] = useState('');
  const [examWeight, setExamWeight] = useState('70');
  const [assignmentWeight, setAssignmentWeight] = useState('30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = {
      name,
      examScores: examScores.map(score => Number(score)),
      assignmentScore: Number(assignmentScore),
      examWeight: Number(examWeight),
      assignmentWeight: Number(assignmentWeight),
    };
    onAddCourse(course);
    setName('');
    setExamScores(['']);
    setAssignmentScore('');
  };

  const addExamScore = () => setExamScores([...examScores, '']);
  const removeExamScore = (index: number) => {
    setExamScores(examScores.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          课程名称
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">考试成绩</label>
        {examScores.map((score, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => {
                const newScores = [...examScores];
                newScores[index] = e.target.value;
                setExamScores(newScores);
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
            {examScores.length > 1 && (
              <button
                type="button"
                onClick={() => removeExamScore(index)}
                className="text-red-500 hover:text-red-700"
              >
                <MinusCircle size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addExamScore}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
        >
          <PlusCircle size={20} />
          添加考试成绩
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          平时成绩
          <input
            type="number"
            min="0"
            max="100"
            value={assignmentScore}
            onChange={(e) => setAssignmentScore(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="block text-gray-700 text-sm font-bold">
          考试成绩权重 (%)
          <input
            type="number"
            min="0"
            max="100"
            value={examWeight}
            onChange={(e) => {
              setExamWeight(e.target.value);
              setAssignmentWeight((100 - Number(e.target.value)).toString());
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold">
          平时成绩权重 (%)
          <input
            type="number"
            min="0"
            max="100"
            value={assignmentWeight}
            onChange={(e) => {
              setAssignmentWeight(e.target.value);
              setExamWeight((100 - Number(e.target.value)).toString());
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        添加课程
      </button>
    </form>
  );
}