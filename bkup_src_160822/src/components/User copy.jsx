import React, { useState, useCallback} from 'react'

import Canvas from './Canvas.jsx'

import def_img from '../images/camera-white.png'

const User = ({user}) => {

    const [selectedFile, setSelectedFile] = useState(new File([""], ""))
    const [displayImg, setDisplayImg] = useState(def_img)

    const picStyle = {

        height: '70px',
        width: '70px'

    }

    const setFile = useCallback((aBlob) => {
        var img = new Image()
        img = aBlob
        setSelectedFile(new File([aBlob], "image.png", {
            type: 'image/png',
        }))
    }, [setSelectedFile]);

    const onChange = (img) => {

        console.log("onChange ...", img)
        setDisplayImg(img)
       
    }

    return (

        <div>
            <h1>User</h1>

            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
            <Canvas /* img={user.imageURL} */ width={75} height={75} setFile={setFile} onChange={onChange} />

        </div>
    )
}



export { User as default }