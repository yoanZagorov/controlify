import { useFetcher } from "react-router";

import { useModal } from "@/hooks";
import { WalletsContent } from "./components/WalletsContent";
import { WalletContainer } from "./components/WalletContainer";

export default function WalletsSection({ action, contentProps }) {
  const fetcher = useFetcher({ key: "addWallet" });

  const modal = useModal({ fetcher });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <WalletContainer formProps={{ fetcher, action }} modal={modal}>
      <WalletsContent {...contentProps} openModal={() => setModalOpen(true)} />
    </WalletContainer>
  )
}
