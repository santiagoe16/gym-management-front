import React from "react";

interface ActivitySummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    iconBg: "bg-green-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    iconBg: "bg-orange-100",
  },
};

export default function ActivitySummaryCard({
  title,
  value,
  icon,
  color,
}: ActivitySummaryCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} rounded-lg p-6 border border-gray-200`}>
      <div className="flex items-center">
        <div className={`${colors.iconBg} rounded-lg p-3`}>
          <div className={`${colors.text} w-6 h-6`}>{icon}</div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-semibold ${colors.text}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
