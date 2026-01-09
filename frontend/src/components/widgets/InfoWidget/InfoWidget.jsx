import { Notification } from '../../Notification'
import { Quote } from '../../Quote'
import { Widget } from '../Widget'

// Displays important notifications if there are some. Else displays a quote
// To do: Implement smooth fade-in and fade-out between a quote and a notification
export default function InfoWidget({ flashMsg, clearFlashMsg, quote }) {
  return (
    <Widget className="min-h-32 mm:min-h-28 tab:min-h-24 flex justify-center items-center">
      {flashMsg.msg ? (
        <Notification
          size="l"
          msgType={flashMsg.msgType}
          clearMsg={clearFlashMsg}
        >
          {flashMsg.msg}
        </Notification>
      ) : (
        <Quote quote={quote} />
      )}
    </Widget>
  )
}
