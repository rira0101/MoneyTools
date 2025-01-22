import { Button } from "@/components/ui/button";
import { CardLoanForm } from "../component/CardLoanForm";
import { CardLoanInfo } from "../types/CardLoanInfo";
import { formatRepaymentPeriod } from "../util/formatMonthsAsYearsAndMonths";
import { formatNumberWithCommas } from "../util/formatNumberWithCommas";

interface CardLoanFormListProps {
  cardLoanList: CardLoanInfo[];
  cardLoanFormChange: (
    index: number,
    field: keyof CardLoanInfo,
    value: number | string
  ) => void;
  deleteLoan: (type: "loan" | "cardLoan", index: number) => void;
  handleAddCardLoan: () => void;
}

const CardLoanFormList: React.FC<CardLoanFormListProps> = ({
  cardLoanList,
  cardLoanFormChange,
  deleteLoan,
  handleAddCardLoan,
}) => {
  return (
    <div>
      {cardLoanList.map((loan, index) => (
        <div
          key={index}
          className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow mt-2 mb-6"
        >
          <CardLoanForm
            index={index}
            loanInfo={loan}
            handleChange={cardLoanFormChange}
          />
          {loan.repayment !== null && (
            <div className="mt-4 text-green-500 font-bold mb-4">
              <p>
                返済期間:{" "}
                {formatRepaymentPeriod(loan.repayment.repaymentPeriod)}
              </p>
              <p>
                総返済利息:{" "}
                {formatNumberWithCommas(loan.repayment.totalInterest)} 円
              </p>
              <p>
                総返済額:{" "}
                {formatNumberWithCommas(loan.repayment.totalRepayment)} 円
              </p>
            </div>
          )}
          <Button
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => deleteLoan("cardLoan", index)}
          >
            削除
          </Button>
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          onClick={() => handleAddCardLoan}
        >
          ローンを追加
        </Button>
      </div>
    </div>
  );
};

export default CardLoanFormList;
