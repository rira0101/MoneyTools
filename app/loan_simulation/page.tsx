"use client";
import { useState } from "react";
import HeaderArea from "../component/HeaderArea";
import { LoanInfo } from "../types/LoanInfo";
import { calculateRepayment } from "../logic/loan/calculateRepayment";
import { CardLoanInfo } from "../types/CardLoanInfo";
import { calculateCardLoanRepayment } from "../logic/loan/calculateCardLoanRepayment";
import CardLoanFormList from "./CardLoanFormList";
import LoanFormList from "./LoanFormList";
import TotalRepaymentInfo from "./TotalRepaymentInfo";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function LoanSimulation() {
  const [loanList, setLoanList] = useState<LoanInfo[]>(() => {
    const savedLoanList = localStorage.getItem("loanList");
    return savedLoanList ? JSON.parse(savedLoanList) : [];
  });

  const [cardLoanList, setCardLoanList] = useState<CardLoanInfo[]>(() => {
    const savedCardLoanList = localStorage.getItem("cardLoanList");
    return savedCardLoanList ? JSON.parse(savedCardLoanList) : [];
  });

  const [openItemList, setOpenItemList] = useState<string[]>([
    "item-1",
    "item-2",
  ]);

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

  const changeAccordionOpen = (item: string): string[] => {
    // 既に開いている場合は閉じる
    const isOpen = openItemList.includes(item);
    const updatedItemList = isOpen
      ? openItemList.filter((openItem) => openItem !== item) // 押下されたアイテムを削除
      : [...openItemList, item]; // 新たに押下されたアイテムを追加
    setOpenItemList(updatedItemList); // 状態を更新
    return updatedItemList; // 更新後のリストを返却
  };

  return (
    <div className="mb-10">
      <HeaderArea />
      <div className="flex justify-center">
        <div className="loan-simulation">
          <h1 className="text-2xl font-bold mb-4">借入シミュレーション</h1>
          <Accordion type="multiple" className="w-full" value={openItemList}>
            <AccordionItem value="item-1" className="mb-6 bg-gray-200 p-3">
              <AccordionTrigger onClick={() => changeAccordionOpen("item-1")}>
                ローン情報を登録してください（カードローン除く）
              </AccordionTrigger>
              <AccordionContent>
                <LoanFormList
                  loanList={loanList}
                  loanFormChange={loanFormChange}
                  deleteLoan={deleteLoan}
                  handleAddLoan={handleAddLoan}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="mb-6 bg-gray-200 p-3">
              <AccordionTrigger onClick={() => changeAccordionOpen("item-2")}>
                カードローン情報を登録してください
              </AccordionTrigger>
              <AccordionContent>
                <CardLoanFormList
                  cardLoanList={cardLoanList}
                  cardLoanFormChange={cardLoanFormChange}
                  deleteLoan={deleteLoan}
                  handleAddCardLoan={handleAddCardLoan}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-around">
            <Button
              className="bg-blue-500 hover:bg-blue-700 w-36"
              onClick={executeCalc}
            >
              計算
            </Button>
            <Button
              className="w-36 hover:bg-red-600"
              variant="destructive"
              onClick={resetLoanInfo}
            >
              リセット
            </Button>
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
