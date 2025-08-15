import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';

const DocumentForm = ({ isOpen, onClose, onSubmit, document }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Personal');
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when opening/closing or document changes
    useEffect(() => {
        if (document) {
            setName(document.fileName || document.name || '');
            setCategory(document.category || 'Personal');
            setIsEditing(true);
        } else {
            setName('');
            setCategory('Personal');
            setFile(null);
            setIsEditing(false);
        }
        setErrors({});
    }, [document, isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Document name is required';
        if (!isEditing && !file) newErrors.file = 'File is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const docData = {
                id: document?.id,
                name: name.trim(),
                category
            };
            await onSubmit(docData, file);
        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ ...errors, form: error.message || 'An error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const maxSize = 10 * 1024 * 1024; // 10MB

            // File size validation
            if (selectedFile.size > maxSize) {
                setErrors({...errors, file: 'File size must be less than 10MB'});
                return;
            }

            // File type validation
            const validTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'image/jpeg',
                'image/png'
            ];

            if (!validTypes.includes(selectedFile.type)) {
                setErrors({...errors, file: 'Only PDF, DOC, DOCX, XLS, XLSX, JPG, PNG files are allowed'});
                return;
            }

            setFile(selectedFile);
            setErrors({...errors, file: null});

            // Set name from file if not editing and name is empty
            if (!isEditing && !name) {
                setName(selectedFile.name.replace(/\.[^/.]+$/, ""));
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {isEditing ? 'Edit Document' : 'Upload New Document'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-label="Close modal"
                        disabled={isSubmitting}
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-4">
                    {/* Document Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Document Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors({...errors, name: null});
                            }}
                            required
                            maxLength={100}
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Category Field */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                        </label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            disabled={isSubmitting}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Professional">Professional</option>
                            <option value="Financial">Financial</option>
                            <option value="Legal">Legal</option>
                            <option value="Medical">Medical</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* File Upload Field */}
                    {(!isEditing || file) && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Document File {!isEditing && '*'}
                            </label>
                            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.file ? 'border-red-300' : 'border-gray-300'} border-dashed rounded-md`}>
                                <div className="space-y-1 text-center">
                                    <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label
                                            htmlFor="file-upload"
                                            className={`relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                required={!isEditing}
                                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                                disabled={isSubmitting}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)
                                    </p>
                                    {file && (
                                        <p className="text-sm text-gray-900 mt-2">
                                            Selected: {file.name} ({formatFileSize(file.size)})
                                        </p>
                                    )}
                                    {errors.file && (
                                        <p className="text-sm text-red-600 mt-2">{errors.file}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {errors.form && (
                        <div className="mb-4 text-sm text-red-600">
                            {errors.form}
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? 'Saving...' : 'Uploading...'}
                                </span>
                            ) : (
                                isEditing ? 'Save Changes' : 'Upload Document'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Helper function to format file size
function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default React.memo(DocumentForm);