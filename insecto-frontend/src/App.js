import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Footer from './components/Footer'
import Brands from './views/Brands'
import Buildings from './views/Buildings'
import Rooms from './views/Rooms'
import Items from './views/Items'
import ItemTypes from './views/ItemTypes'
import ProblemDes from './views/ProblemDescriptions'
import Statuses from './views/Statuses'
import NotiProblems from './views/NotificationProblems'
import HistoryLogs from './views/HistoryLogs'

export default function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      {/* <Content /> */}
      {/* <Brands /> */}
      {/* <Buildings/> */}
      {/* <Rooms/> */}
      {/* <Items/> */}
      {/* <ItemTypes/> */}
      {/* <ProblemDes/> */}
      {/* <Statuses/> */}
      {/* <NotiProblems/> */}
      <HistoryLogs/>
      <Footer />
    </div>
  )
}
