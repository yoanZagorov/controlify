import { redirect } from 'react-router'
import { orderBy, where } from 'firebase/firestore'

import { ROUTES } from '#constants'
import { PERIODS } from '#constants'

import { createSuccessResponse, createErrorResponse } from '../responses'

import {
  checkAuthEmailVerification,
  checkUserAuthStatus,
  getAuthUserId,
} from '#services/firebase/auth'
import { getBaseCurrency, getCurrencies } from '#services/firebase/db/currency'

import { getUser } from '#services/firebase/db/user'
import { getActiveWallets, getWallets } from '#services/firebase/db/wallet'
import { getCategories } from '#services/firebase/db/category'
import {
  getPeriodTransactions,
  getTodayTransactions,
} from '#services/firebase/db/transaction'
import { getRandomQuote } from '#services/firebase/db/quote'

import { getCurrentUserBalance } from '../utils/user'
import { getBalance, getBalanceOverTimeLineChartData } from '../utils/charts'

import { getStoredRedirectData } from '#utils/localStorage'
import { getPeriodInfo } from '#utils/date'
import { dashToCamelCase } from '#utils/str'

export default async function appLoader({ request }) {
  const userId = await getAuthUserId()
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN)
  }

  // Sync the state between Firebase Auth and Firestore (if needed; used for email updates)
  await checkAuthEmailVerification(userId)

  try {
    // Fetch display and calculation data
    const user = await getUser(userId)
    const allWallets = await getWallets(userId)

    // Get shared calculation data
    const baseCurrency = await getBaseCurrency()
    const periodInfo = getPeriodInfo(dashToCamelCase(PERIODS.DEFAULT_PERIOD))

    // Get the current user balance
    const currentBalance = await getCurrentUserBalance(
      allWallets,
      user.currency,
      baseCurrency,
    )

    // Get the opening balance (balance before the period start)
    const openingBalanceTransactionsQuery = [
      where('date', '<', periodInfo.start),
    ]
    const openingBalance = await getBalance({
      userId,
      wallets: allWallets,
      query: openingBalanceTransactionsQuery,
      preferredCurrency: user.currency,
      providedBaseCurrency: baseCurrency,
    })

    // Get the chart data
    const periodTransactions = await getPeriodTransactions({
      userId,
      periodInfo,
      providedWallets: allWallets,
    })
    const balanceOverTimeLineChartData = await getBalanceOverTimeLineChartData({
      openingBalance,
      periodTransactions,
      periodInfo,
      preferredCurrency: user.currency,
      providedBaseCurrency: baseCurrency,
    })

    // Fetch pure display data
    const activeWallets = await getActiveWallets(userId)

    const categoriesQuery = [orderBy('createdAt', 'desc')]
    const categories = await getCategories(userId, categoriesQuery)

    const todayTransactions = await getTodayTransactions(userId, allWallets)
    const randomQuote = await getRandomQuote()
    const storedRedirectData = getStoredRedirectData()
    const currencies = await getCurrencies()

    const loaderData = {
      userData: {
        ...user,
        wallets: activeWallets,
        categories,
        balance: currentBalance,
        todayTransactions,
        balanceOverTimeChartData: balanceOverTimeLineChartData,
      },
      notificationData: {
        quote: randomQuote,
        redirectData: storedRedirectData || {},
      },
      currencies,
    }

    return createSuccessResponse(loaderData)
  } catch (error) {
    console.error(error)

    throw createErrorResponse(
      "Sorry, we couldn't load your profile data. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists",
    )
  }
}
