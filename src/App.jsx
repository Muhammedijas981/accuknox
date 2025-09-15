import './App.css'
import TopBar from './components/TopBar/TopBar'
import DashboardHeading from './components/DashboardHeading/DashboardHeading'

function App() {

  return (
   <div className="main-container">
    <div className='top-bar'><TopBar /></div>
    <div className='dashboard-container'>
      <div className="dashboard-heading"><DashboardHeading /></div>
      <div className='executive-dashboard'>executive dashboard</div>
      <div className='cwpp-widget'>cwpp widget</div>
      <div className='registry-scan'>Registry scan</div>
    </div>
   </div>
  )
}

export default App
