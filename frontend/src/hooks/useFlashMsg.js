import { useEffect, useState } from "react";
import { isObjTruthy } from "#utils/obj";

// Look through the provided messages and return the first one with content (if there is one)
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
