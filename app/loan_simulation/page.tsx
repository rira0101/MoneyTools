"use client";
import { useState } from "react";
import HeaderArea from "../component/HeaderArea";
import { LoanInfo } from "../types/LoanInfo";
import { calculateRepayment } from "../logic/calculateRepayment";
import { CardLoanInfo } from "../types/CardLoanInfo";
import { calculateCardLoanRepayment } from "../logic/calculateCardLoanRepayment";
import CardLoanFormList from "./CardLoanFormList";
import LoanFormList from "./LoanFormList";
import TotalRepaymentInfo from "./TotalRepaymentInfo";
import Link from "next/link";

export default function LoanSimulation() {
  const [loanList, setLoanList] = useState<LoanInfo[]>(() => {
    const savedLoanList = localStorage.getItem("loanList");
    return savedLoanList ? JSON.parse(savedLoanList) : [];
  });

  const [cardLoanList, setCardLoanList] = useState<CardLoanInfo[]>(() => {
    const savedCardLoanList = localStorage.getItem("cardLoanList");
    return savedCardLoanList ? JSON.parse(savedCardLoanList) : [];
  });

  const handleAddLoan = () => {
    setLoanList((prevList) => [
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
  const handleAddCardLoan = () => {
    setCardLoanList((prevList) => [
      ...prevList,
      {
        name: "",
        loanAmount: 0,
        monthlyRepayment: 0,
        interestRate: 0,
        repayment: null,
      },
    ]);
  };

  const deleteLoan = (type: "loan" | "cardLoan", index: number) => {
    if (type === "loan") {
      setLoanList((prevLoanList) => prevLoanList.filter((_, i) => i !== index));
    } else if (type === "cardLoan") {
      setCardLoanList((prevCardLoanList) =>
        prevCardLoanList.filter((_, i) => i !== index)
      );
    }
  };

  const executeCalc = () => {
    const updatedLoanList = loanList.map((loan) => {
      const repaymentInfo = calculateRepayment(loan);
      return {
        ...loan,
        repayment: repaymentInfo, // 計算結果を保存
      };
    });

    const updatedCardLoanList = cardLoanList.map((loan) => {
      const repaymentInfo = calculateCardLoanRepayment(loan);
      return {
        ...loan,
        repayment: repaymentInfo, // 計算結果を保存
      };
    });

    setLoanList(updatedLoanList); // 計算後のリストを更新
    setCardLoanList(updatedCardLoanList);
    localStorage.setItem("loanList", JSON.stringify(updatedLoanList));
    localStorage.setItem("cardLoanList", JSON.stringify(updatedCardLoanList));
  };

  const resetLoanInfo = () => {
    setLoanList([]);
    setCardLoanList([]);
    localStorage.removeItem("loanList"); // localStorage から削除
    localStorage.removeItem("cardLoanList"); // localStorage から削除
  };

  const cardLoanFormChange = (
    index: number,
    field: keyof CardLoanInfo,
    value: number | string
  ) => {
    setCardLoanList((prevList) =>
      prevList.map((loan, i) =>
        i === index ? { ...loan, [field]: value } : loan
      )
    );
  };

  const loanFormChange = (
    index: number,
    field: keyof LoanInfo,
    value: number | string
  ) => {
    setLoanList((prevList) =>
      prevList.map((loan, i) =>
        i === index ? { ...loan, [field]: value } : loan
      )
    );
  };

  return (
    <div className="mb-10">
      <HeaderArea />
      <div className="flex justify-center">
        <div className="loan-simulation">
          <h1 className="text-2xl font-bold mb-4">借入シミュレーション</h1>

          <LoanFormList
            loanList={loanList}
            loanFormChange={loanFormChange}
            deleteLoan={deleteLoan}
            handleAddLoan={handleAddLoan}
          />
          <CardLoanFormList
            cardLoanList={cardLoanList}
            cardLoanFormChange={cardLoanFormChange}
            deleteLoan={deleteLoan}
            handleAddCardLoan={handleAddCardLoan}
          />
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
          <TotalRepaymentInfo loanList={loanList} cardLoanList={cardLoanList} />
          <div className="mt-6">
            <p className="text-2xl">
              入力情報を元に
              <Link
                href="/refinance_simulation"
                className="text-blue-500 underline"
              >
                借換シミュレーション{" "}
              </Link>
              を実施する
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
