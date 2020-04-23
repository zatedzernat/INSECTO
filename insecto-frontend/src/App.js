import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Footer from './components/Footer'
import Brands from './views/Brands'

export default function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      {/* <Content /> */}
      <Brands />
      <Footer />
    </div>
  )
}
