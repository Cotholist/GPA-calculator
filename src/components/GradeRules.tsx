import React from 'react';
import type { GradeRule } from '../types';

interface GradeRulesProps {
  rules: GradeRule[];
  onUpdateRules: (rules: GradeRule[]) => void;
}

export function GradeRules({ rules, onUpdateRules }: GradeRulesProps) {
  const handleRuleChange = (index: number, field: keyof GradeRule, value: number) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    onUpdateRules(newRules);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">GPA 计算规则</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">最低分数</th>
              <th className="px-4 py-2">最高分数</th>
              <th className="px-4 py-2">GPA</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={rule.minScore}
                    onChange={(e) => handleRuleChange(index, 'minScore', Number(e.target.value))}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={rule.maxScore}
                    onChange={(e) => handleRuleChange(index, 'maxScore', Number(e.target.value))}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={rule.gpa}
                    onChange={(e) => handleRuleChange(index, 'gpa', Number(e.target.value))}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}