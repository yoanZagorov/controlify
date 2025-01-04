import { useFetcher } from "react-router";

import { useModal, useSubmitModalForm, useTransaction } from "@/hooks";
import { handleAmountInputChange } from "@/utils/input";

import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { Form } from "@/components/Form";
import { WalletModal } from "@/components/modals/WalletModal";
import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";

import { Content } from "./components/Content";
import { CustomAmountInput } from "./components/CustomAmountInput";
import { formatEntityName } from "@/utils/formatting";
import { getDateBtnValue } from "@/utils/date";
import { TransactionContainer } from "@/components/containers/TransactionContainer";

export default function TransactionsSection({ action, contentProps }) {
  const fetcher = useFetcher({ key: "addTransaction" });

  const modal = useModal({ fetcher });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  const { transactionData: { amount, category } } = useTransaction();

  return (
    <TransactionContainer
      modal={modal}
      fetcher={fetcher}
      modalBtn={{
        value: "addTransaction",
        text: "complete transaction",
        disabled: amount === "0" || category.name === "choose"
      }}
      action={action}
    >
      <Content {...contentProps} openModal={() => setModalOpen(true)} />
    </TransactionContainer>
  )
}
