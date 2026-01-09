import { redirect } from 'react-router'
import { where } from 'firebase/firestore'

import { PERIODS, ROUTES } from '#constants'

import { createErrorResponse, createSuccessResponse } from '../responses'

import { checkUserAuthStatus, getAuthUserId } from '#services/firebase/auth'

import { getBaseCurrency } from '#services/firebase/db/currency'
import {
  getPeriodTransactions,
  getTransactions,
} from '#services/firebase/db/transaction'
import { getWallet } from '#services/firebase/db/wallet'

import {
  getBalance,
  getBalanceOverTimeLineChartData,
  getCashFlowByEntityPieChartData,
  getExpensesVsIncomePieChartData,
} from '../utils/charts'
import { convertTransactionsToPreferredCurrency } from '../utils/currency'
import { getPeriodInfo } from '#utils/date'
import { dashToCamelCase } from '#utils/str'

export default async function walletLoader({ params, request }) {
  const userId = await getAuthUserId()
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN)
  }

  try {
    // Get display and calculation data
    const walletId = params.walletId
    const wallet = await getWallet(userId, walletId)

    // Get all the needed data for the calculator functions
    const periodInfo = getPeriodInfo(dashToCamelCase(PERIODS.DEFAULT_PERIOD))
    const periodTransactions = await getPeriodTransactions({
      userId,
      periodInfo,
      providedWallets: [wallet],
    })
    const baseCurrency = await getBaseCurrency()

    // Convert all transactions amounts to preferred currency here since they're the same and used in multiple functions (see the docs for more details)
    await convertTransactionsToPreferredCurrency(
      periodTransactions,
      wallet.currency,
      baseCurrency,
    )

    // Calculate balance before start of period
    const openingBalanceTransactionsQuery = [
      where('date', '<', periodInfo.start),
    ]
    const openingBalance = await getBalance({
      userId,
      wallets: [wallet],
      query: openingBalanceTransactionsQuery,
      preferredCurrency: wallet.currency,
      providedBaseCurrency: baseCurrency,
    })

    // Get the data for the charts
    const balanceOverTimeLineChartData = await getBalanceOverTimeLineChartData({
      openingBalance,
      periodTransactions,
      periodInfo,
    })
    const expensesByCategoryPieChartData =
      await getCashFlowByEntityPieChartData(
        'category',
        'expense',
        periodTransactions,
      )
    const expensesVsIncomePieChartData =
      await getExpensesVsIncomePieChartData(periodTransactions)

    // Get the display data
    const allWalletTransactions = await getTransactions({
      userId,
      providedWallets: [wallet],
      sortType: 'newestFirst',
    })

    return createSuccessResponse({
      wallet,
      transactions: allWalletTransactions,
      openingBalance,
      chartData: {
        balanceOverTime: balanceOverTimeLineChartData,
        expensesByCategory: expensesByCategoryPieChartData,
        expensesVsIncome: expensesVsIncomePieChartData,
      },
    })
  } catch (error) {
    console.error(error)

    throw createErrorResponse(
      "Sorry, we couldn't load your wallet data. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists",
    )
  }
}
