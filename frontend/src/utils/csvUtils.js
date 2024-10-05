export const downloadCSV = (data, filename = 'data.csv') => {
  if (!Array.isArray(data) || data.length === 0) {
      console.error('No data to download');
      return;
  }

  // Prepare the header
  const header = Object.keys(data[0]).join(","); // Get keys for header
  const csvRows = [
      header, // Add header row
      ...data.map(item => Object.values(item).join(",")) // Join values of each row
  ];

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the file
};
