import React from "react";
import { CardLoanInfo } from "../types/CardLoanInfo";
import { LoanInfo } from "../types/LoanInfo";
import { formatRepaymentValue } from "../util/formatRepaymentValue";

type Props = {
  loanList: LoanInfo[];
  cardLoanList: CardLoanInfo[];
};

const LoanTable: React.FC<Props> = ({ loanList, cardLoanList }) => {
  console.log(loanList);
  console.log(cardLoanList);

  return (
    <div>
      <h2 className="text-xl font-bold mt-4">現在の借入状況</h2>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-400 px-4 py-2">名前</th>
            <th className="border border-gray-400 px-4 py-2">
              借入金額 (万円)
            </th>
            <th className="border border-gray-400 px-4 py-2">返済期間</th>
            <th className="border border-gray-400 px-4 py-2">利率 (%)</th>
            <th className="border border-gray-400 px-4 py-2">
              毎月返済額 (円)
            </th>
            <th className="border border-gray-400 px-4 py-2">総返済額 (円)</th>
          </tr>
        </thead>
        <tbody>
          {/* Loan List */}
          {loanList.map((loan, index) => (
            <tr key={`loan-${index}`} className="bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">{loan.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                {loan.loanAmount}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {loan.year} 年 {loan.month} ヶ月
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {loan.interestRate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {formatRepaymentValue(loan.repayment?.monthlyRepayment) || "-"}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {formatRepaymentValue(loan.repayment?.totalRepayment) || "-"}
              </td>
            </tr>
          ))}

          {/* Card Loan List */}
          {cardLoanList.map((loan, index) => (
            <tr key={`cardLoan-${index}`} className="bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">{loan.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                {loan.loanAmount}
              </td>
              <td className="border border-gray-400 px-4 py-2">-</td>
              <td className="border border-gray-400 px-4 py-2">
                {loan.interestRate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {formatRepaymentValue(loan.monthlyRepayment)}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {formatRepaymentValue(loan.repayment?.totalRepayment) || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
