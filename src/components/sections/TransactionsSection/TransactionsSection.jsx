import { useFetcher } from "react-router";

import { useModal, useTransaction } from "@/hooks";

import { TransactionContainer } from "@/components/containers/TransactionContainer";
import { Content } from "./components/Content";

export default function TransactionsSection({ action, contentProps }) {
  const { transactionData: { amount, category }, resetTransactionData } = useTransaction();

  const fetcher = useFetcher({ key: "addTransaction" });

  const modal = useModal({ fetcher, resetModalData: resetTransactionData });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <TransactionContainer
      fetcher={fetcher}
      modal={modal}
      action={action}
      submitBtn={{
        text: "complete transaction",
        props: {
          value: "addTransaction",
          disabled: amount === "0" || category.name === "choose"
        }
      }}
    >
      <Content {...contentProps} action={action} openModal={() => setModalOpen(true)} />
    </TransactionContainer>
  )
}
