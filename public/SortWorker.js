
self.onmessage = function (e) {
    
    const items = e.data;
  
    // Define a priority for statuses
    const statusPriority = {
      'In progress': 1,
      'Pending': 2,
      'Completed': 3
    };
  
    // Sort items based on the status priority
    items.sort((a, b) => statusPriority[a?.status] - statusPriority[b?.status]);
  
    // Post the sorted items back to the main thread
    self.postMessage(items);
    
};