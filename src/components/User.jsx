import React, { useState, useCallback } from 'react'
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB, storage } from '../utils/firebase.js'

import Canvas from './Canvas.jsx'

import def_img from '../images/camera-white.png'

const User = ({ user }) => {

    var picStyle = {
        height: '70px',
        width: '70px'
    }

    const handleChange = (event) => {
        console.log("Change image ... ")

        console.log("Event", event)

        // const storage = getStorage();

        // console.log("Files:", event.target.files[0]);
        var aFile = event.target.files[0];
        console.log("aFile:", aFile);
        var fileExt = aFile.name.split('.').pop()
        console.log("aFile type:", fileExt);
        // var userImagesRef = firebaseStorageRef.child('userimages/' + user.firstname + '.jpg');
        const userImagesRef = ref(storage, 'userimages/' + user.name + '.' + fileExt)

        // 'file' comes from the Blob or File API
        uploadBytes(userImagesRef, aFile).then((snapshot) => {
            console.log('Uploaded user image file!', snapshot)
            getDownloadURL(ref(storage, userImagesRef))
                .then((url) => {
                    // setUserImgDB - set the user image in the DB
                    console.log("downloadURL:", url);
                    const userRef = doc(firestoreDB, 'users', user.uid)
                    setDoc(userRef, { imageURL: url }, { merge: true })

                })
                // .error( (error ) => {
                //     console.log("File upload error:", error)
                // })
        })

        // var userImagesRef = firebaseStorageRef.child('userimages/' + user.firstname + '.' + fileExt);
        // var storageRef = firebase.storage().ref('img/'+file.name);
        // Promise.resolve(aFile).then((aFile) => {
        //   console.log("Hello:", aFile);
        //   var userImagesRef2 = firebaseStorageRef.child('userimages/' + user.firstname + '.jpg');
        //   console.log("Ref:", userImagesRef2);
        // });

        // const uploadTask = uploadBytesResumable(userImagesRef, aFile)


        // var task = userImagesRef.put(aFile);
        // task.on('state_changed',
        //     function progress(snapshot) {
        //         var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log("%:", percentage);
        //         console.log("In progress");
        //         // var downloadURL = snapshot.downloadURL;
        //         // console.log("downloadURL:", downloadURL);

        //     },
        //     function error() {
        //         console.log("Error");
        //     },
        //     function complete() { // When complete update user info in DB
        //         console.log("Upload complete");
        //         var downloadURL = task.snapshot.downloadURL;
        //         console.log("downloadURL:", downloadURL);
        //         // user.imageURL = downloadURL;
        //         // console.log("Completed file upload to user:", user);
        //         // firestoreDB.collection("users").doc(user.uid).update({imageURL: downloadURL})
        //         // setUserImgDB(user, downloadURL);
        //         // firebaseRef.child(`/users/${user.uid}/info/imageURL`).set(url)
        //         //     .then(() => {
        //         //         firebaseRef.child(`/leaderboard/${user.uid}/imageURL`).set(url)
        //         //     });

        //     })

    }

    return (

        <div>
            <h1>User</h1>

            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
            <div>
                <img style={picStyle} src={user.imageURL} alt={'user'} />
            </div>
            Change image
            <input type='file' name='img' accept='.gif,.jpg,.jpeg,.png' onChange={(event) => handleChange(event)} />
        </div>

    )
}



export { User as default }