import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
    return (

        <div>
            <h1>No Match here ... </h1>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>

    )
}
export { NoMatch as default }