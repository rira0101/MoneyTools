import React from "react";
import { CardLoanInfo } from "../types/CardLoanInfo";

interface CardLoanFormProps {
  index: number;
  loanInfo: CardLoanInfo;
  handleChange: (
    index: number,
    field: keyof CardLoanInfo,
    value: number | string
  ) => void;
}

export const CardLoanForm: React.FC<CardLoanFormProps> = ({
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
          onChange={(e) =>
            handleChange(index, "loanAmount", parseFloat(e.target.value) || 0)
          }
          className="w-1/2 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="例: 1000000"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">毎月返済額（円）</label>
        <input
          type="number"
          step="0.01"
          value={loanInfo.monthlyRepayment}
          onChange={(e) =>
            handleChange(
              index,
              "monthlyRepayment",
              parseFloat(e.target.value) || 0
            )
          }
          className="w-1/2 p-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="例: 10,000"
        />
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
