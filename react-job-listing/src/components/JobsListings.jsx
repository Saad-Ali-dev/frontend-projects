import React from "react";
import jobsData from "../jobs.js";
import JobListing from "./JobListing.jsx";



export default function JobsListings() {

    const recentJobs = jobsData.slice(0, 3);
    const jobsListings = recentJobs.map((job) => {
        return (
            <JobListing key={job.id} job={job} />
        )
    })

  return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Browse Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobsListings}
          </div>
        </div>
      </section>
  );
}
