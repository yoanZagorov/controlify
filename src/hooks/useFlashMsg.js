import { useEffect, useState } from "react";

export default function useFlashMsg(messages, deps) {
  function getInitialMsg() {
    return messages.find(({ msg }) => msg) || {};
  }

  const [flashMsg, setFlashMsg] = useState(getInitialMsg());

  useEffect(() => {
    if (!flashMsg.msg) {
      messages.forEach(({ msg, msgType }) => {
        if (msg) setFlashMsg({ msg, msgType });
      })
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