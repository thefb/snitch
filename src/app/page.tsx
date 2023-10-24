'use client'

import React, { useState } from "react"

export default function Home() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (file: File | null, index: number) => {
    if (file) {
      setFiles(prevFiles => {
        const newFiles = [...prevFiles]
        newFiles[index] = file
        return newFiles
      })
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (files.length !== 3) {
      alert('Selecione os arquivos para fazer o upload')
      return
    }

    try {
      const data = new FormData()
      files.forEach((file, index) => {
        data.append(`file${index + 1}`, file)
      })

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if (!res.ok) throw new Error(res.statusText)
      console.log("Upload Successful!")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="large_size">Arquivo do dia mais antigo</label>
        <input className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" name="file1" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 0)} />
        <br></br>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="large_size">Arquivo do dia mais recente</label>
        <input className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" name="file2" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 1)} />
        <br></br>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="large_size">GMUD</label>
        <input className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" name="file3" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 2)} />
        <br></br>
        <input type="submit" value="Upload" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" />
      </form>
    </main>
  )
}
