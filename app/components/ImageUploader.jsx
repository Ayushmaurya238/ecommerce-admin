'use client'

import { CldUploadWidget } from 'next-cloudinary'

export default function ImageUploader({ images, setImages }) {
  return (
    <CldUploadWidget
      // Ensure this matches your Vercel Environment Variable exactly
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        multiple: true,
        maxFiles: 5,
        folder: 'ecomadmin/products',
        // This ensures the "Upload" button in the widget allows multiple selection
        clientAllowedFormats: ["jpg", "png", "jpeg", "webp"], 
      }}
      // Use onSuccess instead of onUpload for newer next-cloudinary versions
      onSuccess={(result) => {
        if (result.event === 'success') {
          // result.info.secure_url contains the URL of the image just uploaded
          setImages((prev) => [...prev, result.info.secure_url]);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Upload Images
        </button>
      )}
    </CldUploadWidget>
  )
}