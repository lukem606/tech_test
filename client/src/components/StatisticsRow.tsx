import React, { FC } from 'react';

interface StatisticsRowProps {
  label: string;
  value: number;
}

export const StatisticsRow: FC<StatisticsRowProps> = ({ label, value }: StatisticsRowProps) => {
  return (
    <div className="flex flex-row justify-between p-2">
      <span>{label}</span>
      <span className="ml-20">{value}</span>
    </div>
  );
};
