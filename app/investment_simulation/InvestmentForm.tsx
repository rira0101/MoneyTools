import React from "react";
import { SimulationForm } from "./ChartContainer";

interface InvestmentFormProps {
  simulationInfo: SimulationForm;
  handleChange: (field: keyof SimulationForm, value: number) => void;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({
  simulationInfo,
  handleChange,
}) => {
  return (
    <div className="flex">
      <div className="mr-8">
        <label className="block font-medium mb-1">毎月投資額</label>
        <input
          type="number"
          value={simulationInfo.monthlyInvestmentAmount}
          onChange={(e) => {
            handleChange(
              "monthlyInvestmentAmount",
              parseInt(e.target.value, 10)
            );
          }}
          className="w-20 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        円
      </div>
      <div className="mr-8">
        <label className="block font-medium mb-1">投資開始時期</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={simulationInfo.startYear}
            onChange={(e) =>
              handleChange("startYear", parseInt(e.target.value, 10))
            }
            className="w-14 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="例：5"
          />
          <span className="flex items-center">年</span>
          <input
            type="number"
            value={simulationInfo.startMonth}
            onChange={(e) =>
              handleChange("startMonth", parseInt(e.target.value, 10) || 0)
            }
            className="w-14 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="例：2"
          />
          <span className="flex items-center">月</span>
        </div>
      </div>
    </div>
  );
};
