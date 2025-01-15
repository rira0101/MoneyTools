// LoanFormList.tsx
import { LoanForm } from "../component/LoanForm";
import { LoanInfo } from "../types/LoanInfo";
import { formatNumberWithCommas } from "../util/formatNumberWithCommas";

interface LoanFormListProps {
  loanList: LoanInfo[];
  loanFormChange: (
    index: number,
    field: keyof LoanInfo,
    value: number | string
  ) => void;
  deleteLoan: (type: "loan" | "cardLoan", index: number) => void;
  handleAddLoan: () => void;
}

const LoanFormList: React.FC<LoanFormListProps> = ({
  loanList,
  loanFormChange,
  deleteLoan,
  handleAddLoan,
}) => {
  return (
    <div>
      <p className="text-xl">
        ローン情報を登録してください（カードローン除く）
      </p>
      {loanList.map((loan, index) => (
        <div
          key={index}
          className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow mt-2 mb-6"
        >
          <LoanForm
            index={index}
            loanInfo={loan}
            handleChange={loanFormChange}
          />
          {loan.repayment !== null && (
            <div className="mt-4 text-green-500 font-bold">
              <p>
                毎月返済額:{" "}
                {formatNumberWithCommas(loan.repayment.monthlyRepayment)} 円
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
            onClick={() => deleteLoan("loan", index)}
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            削除
          </button>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddLoan}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          ローンを追加
        </button>
      </div>
    </div>
  );
};

export default LoanFormList;
