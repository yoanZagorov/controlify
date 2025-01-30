import { useEffect, useState } from "react";

export default function useFlashMsg(messages, deps) {
  function getInitialMsg() {
    return messages.find(({ msg }) => msg) || {};
  }

  const [flashMsg, setFlashMsg] = useState(getInitialMsg());

  useEffect(() => {
    const newMsg = messages.find(({ msg }) => msg);

    if (newMsg && newMsg.msg !== flashMsg.msg) {
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
