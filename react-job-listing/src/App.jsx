import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import MainLayout from './layout/MainLayout.jsx'
import JobsPage from './pages/JobsPage.jsx'
import JobPage from './pages/JobPage.jsx'
import AddJobPage from './pages/AddJobPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'




function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/job/:id" element={<JobPage />} />
      <Route path="/add-job" element={<AddJobPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
