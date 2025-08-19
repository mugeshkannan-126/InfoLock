import React from 'react';
import { FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';

const DocumentList = ({ documents, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
                {documents.map((document) => (
                    <li key={document.id}>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                                        <div className="text-blue-600 font-medium text-xs uppercase">
                                            {document.type}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 truncate">
                                            {document.name}
                                        </div>
                                        <div className="text-sm text-gray-500">{document.category}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">{document.size}</span>
                                    <span className="text-sm text-gray-500">{document.uploadedAt}</span>
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
                                        <button className="text-gray-400 hover:text-green-500">
                                            <FiDownload />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;