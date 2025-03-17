"use client";

import PageWrapper from "@/components/common/PageWrapper";
import Header from "@/components/layout/Header";
import React, { useState } from "react";

const ResumeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a resume file.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jobDescription", jobDescription); // Send job description

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <div className="my-10 mx-10 md:mx-20 lg:mx-36 text-center">
        <h2 className="text-2xl font-bold">Resume Analysis</h2>
        <p className="text-gray-600">
          Unlock Your Career Potential: Optimize Your Resume with AI-Powered Insights! 🚀
        </p>
      </div>

      <div className="p-10 md:px-24 lg:px-48 text-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Button to show job description input */}
        <button
          onClick={() => setShowJobInput(!showJobInput)}
          className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
        >
          {showJobInput ? "Hide Job Description" : "Provide Job Description"}
        </button>

        {/* Job description input field */}
        {showJobInput && (
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description for a more tailored analysis..."
            className="mt-4 w-full p-2 border rounded-md"
            rows={4}
          />
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {analysisResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold">Analysis Results</h3>
            <p><strong>ATS Score:</strong> {analysisResult.ats_score}</p>
            <p><strong>Missing Skills:</strong> {Array.isArray(analysisResult.missing_skills) ? analysisResult.missing_skills.join(", ") : "No missing skills detected"}</p>
            <p><strong>Suggested Improvements:</strong> {analysisResult.improvements || "No improvements suggested"}</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ResumeAnalysis;
