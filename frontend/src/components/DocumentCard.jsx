import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2, FiDownload, FiMoreVertical } from 'react-icons/fi';

const DocumentCard = ({ document: doc, onEdit, onDelete, onDownload }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }, []);

    const getFileIconColor = useCallback((type) => {
        const formattedType = formatFileType(type).toLowerCase();
        switch (formattedType) {
            case 'pdf': return 'bg-red-100 text-red-600';
            case 'doc':
            case 'docx': return 'bg-blue-100 text-blue-600';
            case 'xls':
            case 'xlsx': return 'bg-green-100 text-green-600';
            case 'jpg':
            case 'jpeg':
            case 'png': return 'bg-purple-100 text-purple-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    }, [formatFileType]);

    const handleDownloadClick = useCallback(() => {
        onDownload(doc.id, doc.fileName || doc.name);
    }, [doc.id, doc.fileName, doc.name, onDownload]);

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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDropdownOpen(false);
                                            onEdit(doc);
                                        }}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        <FiEdit2 className="mr-2" /> Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDropdownOpen(false);
                                            handleDownloadClick();
                                        }}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        <FiDownload className="mr-2" /> Download
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDropdownOpen(false);
                                            onDelete(doc.id);
                                        }}
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
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {doc.fileName || 'Untitled Document'}
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
                >
                    <FiDownload className="mr-1" /> Download
                </button>
            </div>
        </div>
    );
};

export default React.memo(DocumentCard);
