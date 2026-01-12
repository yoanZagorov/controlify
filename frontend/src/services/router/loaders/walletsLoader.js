import { redirect } from 'react-router'

import { PERIODS, ROUTES } from '#/constants'
import { checkUserAuthStatus, getAuthUserId } from '#/services/firebase/auth'
import { getUser } from '#/services/firebase/db/user'
import { getActiveWallets, getWallets } from '#/services/firebase/db/wallet'
import {
  getPeriodTransactions,
  getTransactions,
} from '#/services/firebase/db/transaction'
import { getPeriodInfo } from '#/utils/date'
import { dashToCamelCase } from '#/utils/str'

import { getCashFlowByEntityPieChartData } from '../utils/charts'
import { createErrorResponse, createSuccessResponse } from '../responses'

export default async function walletsLoader({ request }) {
  const userId = await getAuthUserId()
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN)
  }

  try {
    // Calculation data
    const allWallets = await getWallets(userId)

    // Calculation/display data
    // To do (Non-MVP): limit the data and implement pagination
    const allTransactions = await getTransactions({
      userId,
      providedWallets: allWallets,
      sortType: 'newestFirst',
    })

    // Calculation data
    const periodInfo = getPeriodInfo(dashToCamelCase(PERIODS.DEFAULT_PERIOD))
    const periodTransactions = await getPeriodTransactions({
      userId,
      providedWallets: allWallets,
      periodInfo,
    })
    const { currency: userCurrency } = await getUser(userId)
    const expensesByWalletPieChartData = await getCashFlowByEntityPieChartData(
      'wallet',
      'expense',
      periodTransactions,
      userCurrency,
    )

    // Display data
    const activeWallets = await getActiveWallets(userId)

    const loaderData = {
      wallets: activeWallets,
      transactions: allTransactions,
      expensesByWalletChartData: expensesByWalletPieChartData,
    }

    return createSuccessResponse(loaderData)
  } catch (error) {
    console.error(error)

    throw createErrorResponse(
      "Sorry, we couldn't load your wallets data. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists",
    )
  }
}
