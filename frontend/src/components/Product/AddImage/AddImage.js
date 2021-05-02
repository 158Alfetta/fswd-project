import React, { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { storage } from '../../../firebase'
import LoadingComponent from '../../UI/Loading/Loading'

import addImg from '../../../img/addImg.png'
import remove from '../../../img/remove.png'

const AddImage = (props) => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  let { imagesFromUpdate } = props

  useEffect(() => {
    if (imagesFromUpdate) {
      setUrls(imagesFromUpdate)
    }
    return () => {}
  }, [imagesFromUpdate])

  useEffect(() => {
    props.urlsCallback(urls)
  }, [urls])

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0])
    } else console.log('No image')

    e.target.value = ''
  }

  const handleUrlsChange = (data) => {
    setUrls(data)
  }

  const handleUpload = (imageUpload) => {
    const genUUID = uuidv4()
    const uploadTask = storage.ref(`images/${genUUID}`).put(imageUpload)
    setLoading(true)
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
        setLoading(false)
      },
      () => {
        storage
          .ref('images')
          .child(genUUID)
          .getDownloadURL()
          .then((url) => {
            handleUrlsChange([...urls, url])
            setLoading(false)
            console.log(url)
          })
      }
    )
  }

  const deleteImg = (url) => {
    if (url) {
      handleUrlsChange((oldUrls) => oldUrls.filter((item) => item !== url))
    } else {
      console.log('No url')
    }
  }

  return (
    <div className="mt-10">
      {urls?.map((url) => (
        <div key={url} className="relative mb-4">
          <img
            className="w-5 h-5 cursor-pointer absolute z-40 -right-1.5 -top-1.5"
            src={remove}
            alt="remove"
            onClick={() => deleteImg(url)}
          />
          <img
            src={url || 'http://via.placeholder.com/300'}
            alt={`img: ${url}`}
          />
        </div>
      ))}
      <LoadingComponent className="m-4" showLoading={loading} />

      <label className="flex mt-4 justify-center p-4 rounded bg-gray-100 hover:bg-gray-200 text-grey-darkest cursor-pointer">
        <span className="text-base leading-normal">add image</span>
        <img className="w-4 h-4 ml-3 mt-1" src={addImg} alt="addImg" />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onInput={handleImgChange}
        />
      </label>
    </div>
  )
}

export default AddImage
