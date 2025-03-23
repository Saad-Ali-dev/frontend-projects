import JobListings from "../components/JobsListings.jsx"

export default function JobsPage() {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <JobListings isHome={false}/>
    </section>
  )
}
