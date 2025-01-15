"use client";
import { useState } from "react";
import HeaderArea from "../component/HeaderArea";
import { LoanInfo } from "../types/LoanInfo";
import RefinanceFormList from "./RefinanceLoanFormList";
import Link from "next/link";
import { CardLoanInfo } from "../types/CardLoanInfo";
import LoanTable from "./LoanTable";
import RefinanceResult from "./refinanceResult";
import { calculateRepayment } from "../logic/calculateRepayment";
import TotalRepaymentInfo from "../loan_simulation/TotalRepaymentInfo";
export default function RefinanceSimulation() {
  const loanList = (): LoanInfo[] => {
    const savedLoanList = localStorage.getItem("loanList");
    return savedLoanList ? JSON.parse(savedLoanList) : [];
  };
  const loans: LoanInfo[] = loanList();
  const cardLoanList = (): CardLoanInfo[] => {
    const savedCardLoanList = localStorage.getItem("cardLoanList");
    return savedCardLoanList ? JSON.parse(savedCardLoanList) : [];
  };
  const cardLoans: CardLoanInfo[] = cardLoanList();

  const [refinanceLoanList, setRefinanceLoanList] = useState<LoanInfo[]>(() => {
    const savedRefinanceLoanList = localStorage.getItem("refinanceLoanList");
    return savedRefinanceLoanList ? JSON.parse(savedRefinanceLoanList) : [];
  });

  const calculateTotalAmount = () => {
    const total = [...loans, ...cardLoans].reduce((total, loan) => {
      console.log(loan);
      return total + loan.loanAmount;
    }, 0);

    return total;
  };
  const totalAmount = calculateTotalAmount();

  // 初期値として、借入額は残債を全て返せる額にする
  const handleAddLoan = () => {
    setRefinanceLoanList((prevList) => [
      ...prevList,
      {
        name: "",
        loanAmount: 0,
        year: 0,
        month: 0,
        interestRate: 0,
        repayment: null,
      },
    ]);
  };

  const deleteLoan = (index: number) => {
    setRefinanceLoanList((prevLoanList) =>
      prevLoanList.filter((_, i) => i !== index)
    );
  };

  const executeCalc = () => {
    const addRepaymentToLoanList = refinanceLoanList.map((loan) => {
      const repaymentInfo = calculateRepayment(loan);
      return {
        ...loan,
        repayment: repaymentInfo, // 計算結果を保存
      };
    });
    setRefinanceLoanList(addRepaymentToLoanList);
    localStorage.setItem(
      "refinanceLoanList",
      JSON.stringify(addRepaymentToLoanList)
    );
  };

  // 借換先バージョンにする
  const resetLoanInfo = () => {
    setRefinanceLoanList([]);
    localStorage.removeItem("refinanceLoanList");
  };

  const loanFormChange = (
    index: number,
    field: keyof LoanInfo,
    value: number | string
  ) => {
    setRefinanceLoanList((prevList) =>
      prevList.map((loan, i) =>
        i === index ? { ...loan, [field]: value } : loan
      )
    );
  };

  const calculateRemainingAmount = (): number | null => {
    console.log(refinanceLoanList);
    if (!Array.isArray(refinanceLoanList)) {
      return null;
    }
    return refinanceLoanList.reduce(
      (amount, refinanceLoan) => amount - refinanceLoan.loanAmount,
      totalAmount
    );
  };
  const remainingAmount = calculateRemainingAmount();
  return (
    <div className="mb-10">
      <HeaderArea />
      <div className="flex justify-center mt-10">
        <p>
          <Link href="/loan_simulation" className="text-blue-500 underline">
            「借入登録・シミュレーション」
          </Link>
          を未実施の方は先に実施をしてください
        </p>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <div className="refinance-simulation">
          <h1 className="text-2xl font-bold mb-4">借換シミュレーション</h1>
          <LoanTable loanList={loans} cardLoanList={cardLoans} />
          <TotalRepaymentInfo loanList={loans} cardLoanList={cardLoans} />

          <div className="mt-6">
            <RefinanceFormList
              refinanceLoanList={refinanceLoanList}
              totalAmount={totalAmount}
              loanFormChange={loanFormChange}
              deleteLoan={deleteLoan}
              handleAddLoan={handleAddLoan}
              remainingAmount={remainingAmount}
            />
          </div>
          <div className="flex justify-around">
            <button
              type="button"
              onClick={executeCalc}
              className="w-40 bg-green-500 text-white py-3 px-6 rounded mt-10"
            >
              計算
            </button>
            <button
              type="button"
              onClick={resetLoanInfo}
              className="w-40 bg-red-500 text-white py-3 px-6 rounded mt-10"
            >
              リセット
            </button>
          </div>
          <RefinanceResult
            loanList={loans}
            cardLoanList={cardLoans}
            refinanceLoanList={refinanceLoanList}
          />
        </div>
      </div>
    </div>
  );
}
