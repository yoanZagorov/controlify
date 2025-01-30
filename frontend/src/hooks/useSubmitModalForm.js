import { resetFetcher } from "@/services/router/utils";
import { useEffect } from "react";

export default function useSubmitModalForm({ fetcher, closeModal, resetModalData }) {
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      // window.scrollTo({ top: 0, behavior: "smooth" });
      // closeModal();
      // resetFetcher(fetcher);
      resetModalData();
    }
  }, [fetcher.data, fetcher.state])

}