import { useMountTransition } from "@/hooks";
import { Notification } from "../../Notification";
import { Quote } from "../../Quote";
import { Widget } from "../Widget";
import cn from "classnames";

export default function InfoWidget({ flashMsg, clearFlashMsg, quote }) {
  // To do: Implement smooth fade-in and fade-out

  // const isNotification = !!flashMsg.msg;

  // const unmountDelay = 5000;
  // const hasTransitioned = useMountTransition(isNotification, unmountDelay);

  // const durationMap = {
  //   5000: "duration-[5000ms]"
  // }

  // const classes = {
  //   notification: cn(
  //     "transition-opacity duration-[5000ms]",
  //     durationMap[unmountDelay],
  //     (isNotification && hasTransitioned) ? "opacity-100" : "opacity-0"
  //   ),
  //   quote: cn(
  //     "transition-opacity duration-[5000ms]",
  //     durationMap[unmountDelay],
  //     (isNotification && hasTransitioned) ? "opacity-0" : "opacity-100"
  //   )
  // }

  return (
    <Widget className="min-h-32 mm:min-h-28 tab:min-h-24 flex justify-center items-center">
      {flashMsg.msg ? (
        <Notification size="xl" msgType={flashMsg.msgType} clearMsg={clearFlashMsg}>
          {flashMsg.msg}
        </Notification>
      ) : (
        <Quote quote={quote} />
      )}
    </Widget >
  )
}
