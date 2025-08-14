import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';

const DocumentForm = ({ isOpen, onClose, onSubmit, document }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Personal');
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (document) {
            setName(document.name);
            setCategory(document.category);
            setIsEditing(true);
        } else {
            setName('');
            setCategory('Personal');
            setFile(null);
            setIsEditing(false);
        }
    }, [document]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDocument = {
            id: isEditing ? document.id : Date.now(),
            name,
            type: file ? file.name.split('.').pop().toUpperCase() : document?.type || 'PDF',
            size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : document?.size || '0 MB',
            uploadedAt: new Date().toISOString().split('T')[0],
            category
        };
        onSubmit(newDocument);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">
                        {isEditing ? 'Edit Document' : 'Upload New Document'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Document Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Professional">Professional</option>
                            <option value="Financial">Financial</option>
                            <option value="Legal">Legal</option>
                            <option value="Medical">Medical</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {!isEditing && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Document File
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) => setFile(e.target.files[0])}
                                                required={!isEditing}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PDF, DOCX, XLSX up to 10MB
                                    </p>
                                    {file && (
                                        <p className="text-sm text-gray-900 mt-2">
                                            Selected: {file.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isEditing ? 'Save Changes' : 'Upload Document'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentForm;