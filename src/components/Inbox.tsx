const Inbox = () => {
  return (
    // FIX: Removed margins. Added h-full to fill the remaining screen height.
    <div className="h-full w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      
      {/* Header inside Inbox (Optional) */}
      <div className="border-b p-4">
        <h2 className="text-xl font-bold text-gray-700">Inbox</h2>
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Dummy content to test scrolling */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
              Email Item {i + 1}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Inbox;