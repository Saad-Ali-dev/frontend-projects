
import jobsData from "../jobs.js";
import JobListing from "./JobListing.jsx";



export default function JobsListings({isHome}) {

    const jobListings = () => {
        const jobListings = isHome? jobsData.slice(0, 3) : jobsData;
        return jobListings.map((job) => {
            return (
                <JobListing key={job.id} job={job} />
            )
        })
    }

  return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobListings()}
          </div>
        </div>
      </section>
  );
}
