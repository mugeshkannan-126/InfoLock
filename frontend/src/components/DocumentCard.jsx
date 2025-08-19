import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2, FiDownload, FiMoreVertical } from 'react-icons/fi';
import PropTypes from 'prop-types';

const DocumentCard = ({ document: doc, onEdit, onDelete, onDownload }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const API_BASE_URL = 'http://localhost:8080/api/documents';  // Adjust if needed

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Memoized helper functions
    const formatFileType = useCallback((type) => {
        if (!type) return 'FILE';
        const parts = type.split('/');
        return parts[parts.length - 1].toUpperCase();
    }, []);

    const formatDate = useCallback((dateString) => {
        if (!dateString) return 'Recently';
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch {
            return 'Recently';
        }
    }, []);

    const formatFileSize = useCallback((bytes) => {
        if (!bytes) return 'Unknown size';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }, []);

    const getFileIconColor = useCallback((type) => {
        const formattedType = formatFileType(type).toLowerCase();
        switch(formattedType) {
            case 'pdf': return 'bg-red-100 text-red-600';
            case 'doc':
            case 'docx': return 'bg-blue-100 text-blue-600';
            case 'xls':
            case 'xlsx': return 'bg-green-100 text-green-600';
            case 'jpg':
            case 'jpeg':
            case 'png': return 'bg-purple-100 text-purple-600';
            case 'txt': return 'bg-gray-100 text-gray-600';
            case 'zip':
            case 'rar': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    }, [formatFileType]);

    const handleDownloadClick = useCallback((e) => {
        e?.stopPropagation();
        onDownload(doc.id, doc.fileName || doc.name);
    }, [doc.id, doc.fileName, doc.name, onDownload]);

    const handleEditClick = useCallback((e) => {
        e?.stopPropagation();
        onEdit(doc);
    }, [doc, onEdit]);

    const handleDeleteClick = useCallback((e) => {
        e?.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${doc.fileName || doc.name}"?`)) {
            onDelete(doc.id);
        }
    }, [doc.id, doc.fileName, doc.name, onDelete]);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-5">
                <div className="flex items-start justify-between">
                    {/* File type badge */}
                    <div className={`rounded-lg p-3 ${getFileIconColor(doc.fileType)}`}>
                        <span className="font-bold text-xs uppercase">
                            {formatFileType(doc.fileType)}
                        </span>
                    </div>

                    {/* Action menu */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpen(!dropdownOpen);
                            }}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Document actions"
                        >
                            <FiMoreVertical />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                    <button
                                        onClick={handleEditClick}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        <FiEdit2 className="mr-2" /> Edit
                                    </button>
                                    <button
                                        onClick={handleDownloadClick}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        <FiDownload className="mr-2" /> Download
                                    </button>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                        <FiTrash2 className="mr-2" /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate" title={doc.fileName || doc.name}>
                        {doc.fileName || doc.name || 'Untitled Document'}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {doc.category || 'Uncategorized'}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                            {formatFileSize(doc.fileSize)}
                        </span>
                        <span className="text-xs text-gray-500">
                            {formatDate(doc.uploadDate)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    Uploaded {formatDate(doc.uploadDate)}
                </span>
                <button
                    onClick={handleDownloadClick}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    aria-label={`Download ${doc.fileName || doc.name}`}
                >
                    <FiDownload className="mr-1" /> Download
                </button>
            </div>
        </div>
    );
};

DocumentCard.propTypes = {
    document: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fileName: PropTypes.string,
        name: PropTypes.string,
        fileType: PropTypes.string,
        category: PropTypes.string,
        fileSize: PropTypes.number,
        uploadDate: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
};

export default React.memo(DocumentCard);