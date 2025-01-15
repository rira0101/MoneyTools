// LoanFormList.tsx
import { LoanForm } from "../component/LoanForm";
import { LoanInfo } from "../types/LoanInfo";
import { formatNumberWithCommas } from "../util/formatNumberWithCommas";
import { formatRepaymentValue } from "../util/formatRepaymentValue";

interface RefinanceFormListProps {
  refinanceLoanList: LoanInfo[];
  totalAmount: number;
  loanFormChange: (
    index: number,
    field: keyof LoanInfo,
    value: number | string
  ) => void;
  deleteLoan: (index: number) => void;
  handleAddLoan: () => void;
  remainingAmount: number | null;
}

const RefinanceFormList: React.FC<RefinanceFormListProps> = ({
  refinanceLoanList,
  totalAmount,
  loanFormChange,
  deleteLoan,
  handleAddLoan,
  remainingAmount,
}) => {
  return (
    <div>
      <p className="text-xl font-bold mb-2">
        借換後のローン情報を登録してください（複数ローン可）
      </p>
      <p className="text-xl text-blue-700">
        総借入額：{formatRepaymentValue(totalAmount)}万円
      </p>
      <p className="text-xl text-green-700">
        残返済額：{formatRepaymentValue(remainingAmount)}万円
      </p>
      {refinanceLoanList.map((loan, index) => (
        <div
          key={index}
          className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow mt-2 mt-4"
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
            onClick={() => deleteLoan(index)}
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
          className="bg-blue-500 text-white py-2 px-4 rounded mt-6"
        >
          ローンを追加
        </button>
      </div>
    </div>
  );
};

export default RefinanceFormList;
