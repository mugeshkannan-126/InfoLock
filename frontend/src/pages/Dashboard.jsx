import React, { useState, useEffect, useCallback } from 'react';
import { FiUpload, FiFolder, FiSearch, FiGrid, FiList } from 'react-icons/fi';
import DocumentCard from '../components/DocumentCard';
import DocumentList from '../components/DocumentList';
import DocumentForm from '../components/DocumentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { documentAPI } from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';  // Add this at the top of your Dashboard.jsx

const Dashboard = () => {
    // ===== State Management =====
    const [documents, setDocuments] = useState([]);         // All documents
    const [isLoading, setIsLoading] = useState(true);       // Loading state
    const [searchTerm, setSearchTerm] = useState('');       // Search input
    const [isModalOpen, setIsModalOpen] = useState(false);  // Upload/Edit modal state
    const [currentDocument, setCurrentDocument] = useState(null); // Document being edited
    const [viewMode, setViewMode] = useState('grid');       // View mode toggle
    const API_BASE_URL = 'http://localhost:8080/api/documents';  // Adjust if needed

    // ===== Helper Functions =====
    // Format file size into KB/MB/GB
    const formatFileSize = useCallback((bytes) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }, []);

    // Format upload date into readable format
    const formatDate = useCallback((dateString) => {
        if (!dateString) return 'Recently';
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch {
            return 'Recently';
        }
    }, []);

    // ===== Fetch Documents on Mount =====
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setIsLoading(true);
                const data = await documentAPI.getAllDocuments();

                // Transform data for frontend consistency
                const formattedDocs = data.map(doc => ({
                    id: doc.id,
                    fileName: doc.filename || doc.name,
                    fileType: doc.fileType,
                    category: doc.category,
                    fileSize: doc.fileSize,
                    uploadDate: doc.uploadDate,
                    name: doc.filename || doc.name,
                    type: doc.fileType,
                    size: doc.size || formatFileSize(doc.fileSize),
                    uploaded: doc.uploaded || formatDate(doc.uploadDate),
                    tags: doc.tags || []
                }));

                setDocuments(formattedDocs);
                // toast.success('Documents loaded successfully');
            } catch (error) {


                console.error('Failed to fetch documents:', error);
                toast.error(error.message || 'Failed to load documents');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, [formatDate, formatFileSize]);

    // ===== Filter Documents by Search =====
    const filteredDocuments = documents.filter(doc => {
        const searchLower = searchTerm.toLowerCase();
        return (
            doc.fileName?.toLowerCase().includes(searchLower) ||
            doc.category?.toLowerCase().includes(searchLower) ||
            doc.tags?.some(tag => tag?.toLowerCase().includes(searchLower))
        );
    });

    // ===== Document Actions =====
    const handleUpload = async (newDoc, file) => {
        try {
            const uploadedDoc = await documentAPI.uploadDocument(
                file,
                newDoc.category,
                newDoc.name || file.name
            );

            const formattedDoc = {
                id: uploadedDoc.id,
                fileName: uploadedDoc.name,
                fileType: uploadedDoc.type || file.type,
                category: uploadedDoc.category,
                fileSize: file.size,
                uploadDate: new Date().toISOString(),
                name: uploadedDoc.name,
                type: uploadedDoc.type || file.name.split('.').pop().toUpperCase(),
                size: formatFileSize(file.size),
                uploaded: formatDate(new Date()),
                tags: uploadedDoc.tags || []
            };

            setDocuments([formattedDoc, ...documents]);
            setIsModalOpen(false);
            toast.success('Document uploaded successfully');
        } catch (error) {
            console.error('Error uploading document:', error);
            toast.error(error.message || 'Failed to upload document');
        }
    };

    const handleUpdate = async (updatedDoc, file) => {
        try {
            await documentAPI.updateDocument(
                updatedDoc.id,
                file,
                updatedDoc.category,
                updatedDoc.name
            );

            setDocuments(documents.map(doc =>
                doc.id === updatedDoc.id
                    ? {
                        ...doc,
                        fileName: updatedDoc.name,
                        name: updatedDoc.name,
                        category: updatedDoc.category,
                        ...(file && {
                            fileType: file.type,
                            type: file.name.split('.').pop().toUpperCase(),
                            fileSize: file.size,
                            size: formatFileSize(file.size),
                            uploadDate: new Date().toISOString()
                        })
                    }
                    : doc
            ));

            setIsModalOpen(false);
            setCurrentDocument(null);
            toast.success('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            toast.error(error.message || 'Failed to update document');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await documentAPI.deleteDocument(id);
                setDocuments(documents.filter(doc => doc.id !== id));
                toast.success('Document deleted successfully');
            } catch (error) {
                console.error('Error deleting document:', error);
                toast.error(error.message || 'Failed to delete document');
            }
        }
    };

    const handleDownload = async (id, fileName) => {
        try {
            await documentAPI.downloadDocument(id, fileName);
            toast.success('Download started');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error(error.message);

            // If unauthorized, redirect to login
            if (error.message.includes('permission') || error.message.includes('login')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    };

    // ===== Loading State =====
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <LoadingSpinner />
            </div>
        );
    }

    // ===== JSX Layout =====
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {documents.length} documents • {filteredDocuments.length} matching search
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                <FiUpload className="mr-2" />
                                Upload Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & View Mode */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Search Box */}
                    <div className="relative flex-grow max-w-xl">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* View Toggle */}
                    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-2 rounded-md flex items-center ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            <FiGrid className="mr-1.5" /> Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-2 rounded-md flex items-center ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            <FiList className="mr-1.5" /> List
                        </button>
                    </div>
                </div>

                {/* Documents Section */}
                {filteredDocuments.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300">
                        <FiFolder className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            {searchTerm.length > 0 ? 'No documents match your search' : 'Your document library is empty'}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {searchTerm.length > 0 ? 'Try different search terms' : 'Upload your first document to get started'}
                        </p>
                        {searchTerm.length === 0 && (
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    <FiUpload className="-ml-1 mr-2 h-5 w-5" />
                                    Upload Document
                                </button>
                            </div>
                        )}
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDocuments.map((document) => (
                            <DocumentCard
                                key={document.id}
                                document={document}
                                onEdit={() => {
                                    setCurrentDocument(document);
                                    setIsModalOpen(true);
                                }}
                                onDelete={handleDelete}
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>
                ) : (
                    <DocumentList
                        documents={filteredDocuments}
                        onEdit={(doc) => {
                            setCurrentDocument(doc);
                            setIsModalOpen(true);
                        }}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                    />
                )}
            </main>

            {/* Modal for Upload/Edit */}
            <DocumentForm
                isOpen={isModalOpen || !!currentDocument}
                onClose={() => {
                    setIsModalOpen(false);
                    setCurrentDocument(null);
                }}
                onSubmit={currentDocument ? handleUpdate : handleUpload}
                document={currentDocument}
            />
        </div>
    );
};

export default Dashboard;
