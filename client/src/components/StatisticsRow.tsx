import React, { FC } from 'react';

interface StatisticsRowProps {
  label: string;
  value: number;
}

export const StatisticsRow: FC<StatisticsRowProps> = ({ label, value }: StatisticsRowProps) => {
  return (
    <div className="flex flex-row justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
