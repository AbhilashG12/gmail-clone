const InboxLoader = () => {
  return (
    <div className="w-full h-full bg-white rounded-2xl p-6 shadow-sm">
      <div className="animate-pulse flex flex-col h-full">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div className="h-8 bg-gray-200 rounded w-32"></div> 
          <div className="h-4 bg-gray-200 rounded w-24"></div> 
        </div>
        <div className="flex-1 space-y-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-5 w-5 bg-gray-200 rounded shrink-0"></div> 
              <div className="h-5 w-5 bg-gray-200 rounded shrink-0"></div> 
              <div className="h-4 bg-gray-200 rounded w-48 shrink-0"></div> 
              <div className="h-4 bg-gray-200 rounded flex-1"></div>       
              <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div> 
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InboxLoader;