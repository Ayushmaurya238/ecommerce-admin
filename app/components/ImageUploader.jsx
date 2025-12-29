'use client'

import { CldUploadWidget } from 'next-cloudinary'

export default function ImageUploader({ images, setImages }) {
  return (
    <CldUploadWidget
      uploadPreset="ecomadmin_unsigned"
      options={{
        multiple: true,
        maxFiles: 5,
        folder: 'ecomadmin/products',
      }}
      onUpload={(result) => {
        if (result.event === 'success') {
          setImages(prev => [...prev, result.info.secure_url])
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Upload Images
        </button>
      )}
    </CldUploadWidget>
  )
}
