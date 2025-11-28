'use client';

import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

export default function Error({ error }) {
  // console.log(error);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
      <div className="card w-full max-w-lg shadow-xl bg-white p-10 border-t-8 border-error">
        <FiAlertTriangle className="text-8xl text-warning mx-auto mb-6" />

        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Data Loading Failed
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          The Blood Hub couldn't load the active requests. This might be a
          temporary network issue or a problem with the database connection.
        </p>

        <p className=" text-sm text-red-500 bg-gray-100 p-2 rounded-md mb-4">
          Can'not Connect to the database OR failed to load data
        </p>

        <button className="btn btn-error btn-lg">
          <FiRefreshCw className="mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
}
