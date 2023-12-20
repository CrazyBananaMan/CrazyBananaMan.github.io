import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { page_navigate } from '../utils/page_navigate'
import './app_layout.css'


function AppLayout() {
  return (
    <div className='app_layout'> 
        <Routes>
            {page_navigate.map((item) =>
                <Route path={item.path} key={item.path} element={item.component}></Route>
            )}
            <Route path="*" element={<Navigate to={'/home'}/>}></Route>
        </Routes>
    </div>
  )
}

export default AppLayout