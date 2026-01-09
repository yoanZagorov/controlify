import { useFetcher } from "react-router";

import { useModal, useTransaction } from "#hooks";

import { TransactionContainer } from "./components/TransactionContainer"
import { TransactionsSectionContent } from "./components/TransactionsSectionContent";

// Used to display, create and edit transactions
// Always wrapped by a TransactionProvider
export default function TransactionsSection({ action, contentProps }) {
  const { transactionData: { amount, category }, resetTransactionData } = useTransaction();

  const fetcher = useFetcher({ key: "addTransaction" });

  const modal = useModal({ fetcher, resetModalData: resetTransactionData });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <TransactionContainer
      modal={modal}
      formProps={{ fetcher, action }}
      submitBtn={{
        text: "complete transaction",
        props: {
          value: "addTransaction",
          disabled: fetcher.state === "submitting" || fetcher.state === "loading" || amount === "0" || category.name === "choose"// Default data
        }
      }}
    >
      <TransactionsSectionContent {...contentProps} action={action} openModal={() => setModalOpen(true)} />
    </TransactionContainer>
  )
}
