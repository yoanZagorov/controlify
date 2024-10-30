import { capitalize } from "@/utils/generic";

export default function SelectModal({ name, closeModal, children }) {
  const modalHeightsMap = {
    "wallet": "h-1/3",
    "category": "h-3/5",
    "date": "h-1/3"
  }

  const modalHeight = modalHeightsMap[name];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className="fixed bottom-0 left-0 h-screen w-screen border-gray-dark bg-gray-light opacity-30">
      </div>

      {/* Modal */}
      <div className={`fixed bottom-0 left-0 ${modalHeight} w-screen p-6 rounded-lg border-t bg-gray-medium`}>
        <span className="text-gray-dark font-semibold">Select {capitalize(name)}</span>
        {children}
      </div>
    </>
  )
}
