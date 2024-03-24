import React, { useState } from 'react';
import "./index.css"
import axios from 'axios';

const App = () => {
    const [uploadedImageFile, setUploadedImageFile] = useState(null);
    const [uploadedImageData, setUploadedImageData] = useState(null);
    const [processedImageData, setProcessedImageData] = useState(null);
    const [vehicleCount, setVehicleCount] = useState(0);

    const handleFileUpload = async () => {
        if (!uploadedImageFile) return;

        const formData = new FormData();
        formData.append('file', uploadedImageFile);
        formData.append('operation', 'identify_vehicles');

        try {
            const response = await axios.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadedImageData(response.data.uploaded_image);
            setProcessedImageData(response.data.processed_image);
            setVehicleCount(response.data.vehicle_count);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className='bg-yellow-500 h-screen w-screen'>
            <div className='flex gap-10'>

            <h1 className='text-4xl text-center mt-10 ml-2 text-bold text-cyan-700 gilroy-bold'>Vehicle Detector</h1>

            <div className='flex-col mt-20'>
                {uploadedImageFile && (
                    <img className='h-64 w-64 justify-center' src={URL.createObjectURL(uploadedImageFile)} alt="Uploaded" />
                )}
                <input
                    className='mt-5 gilroy-semibold'
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadedImageFile(e.target.files[0])}
                />
                <div><button className='p-2 gilroy-bold rounded-md mt-5 bg-blue-500' onClick={handleFileUpload}>Upload and Process</button></div>
                <h2 className='gilroy-semibold mt-5'>Vehicle Count: {vehicleCount}</h2>
           
            </div>
            <div className='flex-col gap-10'>
                {uploadedImageData && (
                    <div>
                        <h2 className='gilroy-semibold'>Uploaded Image</h2>
                        <img className='w-80 h-64 gilroy-semibold' src={`data:image/jpeg;base64,${uploadedImageData}`} alt="Uploaded" />
                    </div>
                )}
                {processedImageData && (
                    <div>
                        <h2 className='gilroy-semibold'>Processed Image</h2>
                        <img className='w-80 h-64' src={`data:image/jpeg;base64,${processedImageData}`} alt="Processed" />
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default App;