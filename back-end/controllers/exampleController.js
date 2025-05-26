export const getExamples = (req, res) => {
  const mockData = [
    { id: 1, name: "John Doe", role: "Student" },
    { id: 2, name: "Jane Smith", role: "Teacher" },
  ];

  res.status(200).json(mockData);
};
