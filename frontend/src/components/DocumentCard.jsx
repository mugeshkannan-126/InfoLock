import React from 'react';
import { FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';

const DocumentCard = ({ document, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                            <div className="text-blue-600 font-medium text-sm uppercase">
                                {document.type}
                            </div>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                {document.name}
                            </h3>
                            <p className="text-sm text-gray-500">{document.category}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(document)}
                            className="text-gray-400 hover:text-blue-500"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            onClick={() => onDelete(document.id)}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{document.size}</span>
                    <span className="text-xs text-gray-500">{document.uploadedAt}</span>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                    <FiDownload className="mr-1" /> Download
                </button>
            </div>
        </div>
    );
};

export default DocumentCard;