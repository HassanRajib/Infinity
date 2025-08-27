"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  last_study: string;
  study: string;
  destination: string;
  europe_country: string;
  ini: string;
  elt: string;
  elt_score: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<string>("ALL")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/student"); // ✅ backend API
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // 🔹 Generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Information", 14, 10);

    autoTable(doc, {
    head: [["Full Name", "Email", "Phone", "Distination"]],
    body: filteredStudents.map((s) => [`${s.first_name} ${s.last_name}`, s.email, s.phone, s.destination === "Europe" ? s.europe_country : s.destination,]),
  });

    doc.save("students.pdf");
  };

  // 🔹 Generate Excel
  const downloadExcel = () => {
    // Convert students data into worksheet format
    const worksheet = XLSX.utils.json_to_sheet(
      filteredStudents.map((s) => ({
        ID: s.id,
        Name: `${s.first_name} ${s.last_name}`,
        Email: s.email,
        Phone: s.phone,
        Destination: s.destination === "Europe" ? s.europe_country : s.destination,
        ELT: s.elt,
        ELT_Score: s.elt_score,
        INI: s.ini,
        Study: s.study,
        Last_Study: s.last_study,
      }))
    );

    // Create a workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Export to Excel file
    XLSX.writeFile(workbook, "students.xlsx");
  };

  const filteredStudents =
    selectedDestination === "All"
      ? students
      : students.filter((s) => s.destination === selectedDestination);

    const destinations = Array.from(
    new Set(students.map((s) => s.destination))
  ).filter(Boolean);

  if (loading) return <p className="p-6 text-lg">Loading students...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-6 ">
      {/* Top bar with buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Student Information</h1>

          {/* Destination Filter */}
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="All">All Destinations</option>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={downloadExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Download Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow">
        <table className="min-w-full border border-solid rounded-lg border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Last Study</th>
              <th className="px-4 py-2 border">Study</th>
              <th className="px-4 py-2 border">Intake</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">ELT</th>
              <th className="px-4 py-2 border">ELT Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{student.id}</td>
                <td className="px-4 py-2 border">
                  {student.first_name} {student.last_name}
                </td>
                <td className="px-4 py-2 border">{student.email}</td>
                <td className="px-4 py-2 border">{student.phone}</td>
                <td className="px-4 py-2 border">{student.last_study}</td>
                <td className="px-4 py-2 border">{student.study}</td>
                <td className="px-4 py-2 border">{student.ini}</td>
                <td className="px-4 py-2 border">{student.destination === "Europe"
    ? student.europe_country
    : student.destination}</td>
                <td className="px-4 py-2 border">{student.elt}</td>
                <td className="px-4 py-2 border">{student.elt_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
