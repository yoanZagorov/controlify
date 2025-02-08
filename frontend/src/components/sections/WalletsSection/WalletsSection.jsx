import { useFetcher } from "react-router";

import { useModal } from "@/hooks";
import { WalletsContent } from "./components/WalletsContent";
import { WalletsContainer } from "./components/WalletsContainer";

export default function WalletsSection({ action, contentProps }) {
  const fetcher = useFetcher({ key: "addWallet" });

  const modal = useModal({ fetcher });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <WalletsContainer fetcher={fetcher} modal={modal} action={action}>
      <WalletsContent {...contentProps} openModal={() => setModalOpen(true)} />
    </WalletsContainer>
  )
}
