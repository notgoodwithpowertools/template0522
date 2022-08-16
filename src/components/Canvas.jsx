import React, { useEffect, useRef } from 'react'

const Canvas = (props) => {

    const { width = 180, height = 220, img, onChange = null, setFile = null } = props

    const canvas = useRef(null)

    useEffect(() => {

        if (img) {
            console.log("Canvas useEffect ...", img)
            var image = new Image()

            image.src = img
            // image.crossOrigin = "Anonymous";
            image.onload = () => {

                canvas.current.getContext("2d")
                // canvas.current.getContext("2d").clearRect(0, 0, width, height);
                canvas.current.getContext("2d").clearRect(0, 0, width, height);
                canvas.current.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
                canvas.current.toBlob((blob) => {
                    setFile(blob)
                    // setBlobFile(blob)
                })

            }

        }
        // }, [img, width, height, setFile])
        // }, [img])
    }, [img, width, height, setFile])

    const onClick = () => {
        console.log("CanvasClicked ...")
    }

    const onFileSelect = (e) => {

        const objectURL = URL.createObjectURL(e.target.files[0])
        onChange(objectURL)

    }

    return (

        <div onClick={onClick}>
            <label htmlFor='upload'>
                <canvas ref={canvas} width={width} height={height} />
                <input type='file' id='upload' onChange={(e) => onFileSelect(e)} style={{ display: 'none' }} />
            </label>
        </div>

    )

}

export { Canvas as default }