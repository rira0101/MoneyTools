import React from "react";
import { LoanInfo } from "../types/LoanInfo";

interface LoanFormProps {
  index: number;
  loanInfo: LoanInfo;
  handleChange: (
    index: number,
    field: keyof LoanInfo,
    value: number | string
  ) => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({
  index,
  loanInfo,
  handleChange,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block font-medium mb-1">借入先名</label>
        <input
          type="text"
          value={loanInfo.name}
          onChange={(e) => handleChange(index, "name", e.target.value)}
          className="w-1/2 p-2 border rounded"
          placeholder="例: 銀行A"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">借入金額（万円）</label>
        <input
          type="number"
          value={loanInfo.loanAmount}
          onChange={(e) => {
            handleChange(index, "loanAmount", parseInt(e.target.value, 10));
          }}
          className="w-1/2 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="例：100"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">返済期間</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={loanInfo.year}
            onChange={(e) =>
              handleChange(index, "year", parseInt(e.target.value, 10) || 0)
            }
            className="w-1/3 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="例：5"
          />
          <span className="flex items-center">年</span>
          <input
            type="number"
            value={loanInfo.month}
            onChange={(e) =>
              handleChange(index, "month", parseInt(e.target.value, 10) || 0)
            }
            className="w-1/3 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="例：2"
          />
          <span className="flex items-center">ヶ月</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">借入利率（％）</label>
        <input
          type="number"
          step="0.01"
          value={loanInfo.interestRate}
          onChange={(e) =>
            handleChange(index, "interestRate", parseFloat(e.target.value) || 0)
          }
          className="w-1/2 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="例: 1.5"
        />
      </div>
      {}
    </div>
  );
};
