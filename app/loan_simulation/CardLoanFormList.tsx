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
      <p className="text-xl">カードローン情報を登録してください</p>
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
            <div className="mt-4 text-green-500 font-bold">
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
          <button
            type="button"
            onClick={() => deleteLoan("cardLoan", index)}
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            削除
          </button>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddCardLoan}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          カードローンを追加
        </button>
      </div>
    </div>
  );
};

export default CardLoanFormList;
