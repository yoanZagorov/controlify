import { resetFetcher } from "@/services/router/utils";
import { useEffect } from "react";

export default function useSubmitModalForm({ fetcher, closeModal, resetModalData }) {
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      console.log("useSubmitModalForm");
      closeModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
      resetModalData();
    }
  }, [fetcher.data, fetcher.state])

}