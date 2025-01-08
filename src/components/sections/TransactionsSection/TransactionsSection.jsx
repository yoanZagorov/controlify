import { useFetcher } from "react-router";

import { useModal, useTransaction } from "@/hooks";

import { Content } from "./components/Content";
import { TransactionContainer } from "@/components/containers/TransactionContainer";

export default function TransactionsSection({ action, contentProps }) {
  const { transactionData: { amount, category }, resetTransactionData } = useTransaction();

  const fetcher = useFetcher({ key: "addTransaction" });

  const modal = useModal({ fetcher, resetModalData: () => resetTransactionData });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <TransactionContainer
      modal={modal}
      fetcher={fetcher}
      action={action}
      submitBtn={{
        text: "complete transaction",
        props: {
          value: "addTransaction",
          disabled: amount === "0" || category.name === "choose"
        }
      }}
    >
      <Content {...contentProps} openModal={() => setModalOpen(true)} />
    </TransactionContainer>
  )
}
