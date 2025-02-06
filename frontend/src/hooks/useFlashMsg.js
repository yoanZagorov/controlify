import { isObjTruthy } from "@/utils/obj";
import { useEffect, useState } from "react";

export default function useFlashMsg(messages, deps) {
  function getMsg() {
    return messages.find(({ msg }) => msg) || {};
  }

  const [flashMsg, setFlashMsg] = useState(getMsg());

  useEffect(() => {
    const newMsg = getMsg();

    if (isObjTruthy(newMsg) && newMsg.msg !== flashMsg.msg) {
      setFlashMsg(newMsg);
    }
  }, deps)

  const clearFlashMsg = () => {
    setFlashMsg({ msg: null, msgType: null });
    messages.forEach(({ clearMsg }) => {
      if (clearMsg) clearMsg();
    })
  };

  return { flashMsg, clearFlashMsg };
}
