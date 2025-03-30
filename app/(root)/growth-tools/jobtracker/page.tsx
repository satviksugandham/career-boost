"use client";

import PageWrapper from "@/components/common/PageWrapper";
import Header from "@/components/layout/Header";
import React, { useState } from "react";

interface Job {
  id: number;
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Rejected" | "Offer";
}

const JobTracker: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");

  const addJob = () => {
    if (!company || !position) return;

    const newJob: Job = {
      id: Date.now(),
      company,
      position,
      status,
    };

    setJobs([...jobs, newJob]);
    setCompany("");
    setPosition("");
    setStatus("Applied");
  };

  const updateStatus = (id: number, newStatus: Job["status"]) => {
    setJobs(jobs.map(job => (job.id === id ? { ...job, status: newStatus } : job)));
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <PageWrapper>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Job Tracker</h1>

        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border rounded-lg"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Job["status"])}
            className="p-2 border rounded-lg"
          >
            {(["Applied", "Interview", "Rejected", "Offer"] as Job["status"][]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button
            onClick={addJob}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add Job
          </button>
        </div>

        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{job.company}</p>
                <p className="text-gray-600">{job.position}</p>
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job.id, e.target.value as Job["status"])}
                  className="mt-2 p-1 border rounded-lg"
                >
                  {(["Applied", "Interview", "Rejected", "Offer"] as Job["status"][]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => deleteJob(job.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
};

export default JobTracker;



