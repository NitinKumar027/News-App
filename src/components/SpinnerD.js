import React from 'react'
import loading from './loadingD.gif'

export default function SpinnerD() {
    return (
        <div className='text-center'>
            <img src={loading} alt="Loading..."></img>
        </div>
    )
}
