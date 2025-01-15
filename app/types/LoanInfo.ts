import { Repayment } from "./Repayment"

export type LoanInfo= {
    name: string
    loanAmount: number, // 借入金額
    year: number, // 返済年数
    month: number, // 返済月数
    interestRate: number, // 借入利率
    repayment: Repayment | null
}
