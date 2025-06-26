import { SignOutButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router'

export default function StudentAppHeader() {
  return (
    <header>
        <nav className='flex justify-around p-3 items-center'>
            <div>
                <h3><Link to="/">Mess Master</Link></h3>
            </div>
            <div>
                <ul className='flex space-x-5 grow'>
                    <li><Link to="">Dashboard</Link></li>
                    <li><Link to="queries-complaints">Queries & Complaints</Link></li>
                    <li><Link to="payment">Payment</Link></li>
                    <li><Link to="QRcode">My Qrcode</Link></li>
                </ul>
            </div>
            <div>
                <SignOutButton />
            </div>
        </nav>
    </header>
  )
}
