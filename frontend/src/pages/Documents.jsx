import React, { useState, useEffect } from 'react';
import { FiUpload, FiSearch, FiTrash2, FiEdit2, FiDownload, FiGrid, FiList } from 'react-icons/fi';
import DocumentCard from '../components/DocumentCard.jsx';
import DocumentList from '../components/DocumentList.jsx';
import DocumentForm from '../components/DocumentForm.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { documentAPI } from '../api/api.js';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await documentAPI.getAllDocuments();
                setDocuments(data);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    const handleUpload = async (newDoc, file) => {
        try {
            const uploadedDoc = await documentAPI.uploadDocument(file, newDoc.category, newDoc.name);
            setDocuments([uploadedDoc, ...documents]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };

    const handleUpdate = async (updatedDoc, file) => {
        try {
            await documentAPI.updateDocument(updatedDoc.id, file, updatedDoc.category);
            setDocuments(documents.map(doc =>
                doc.id === updatedDoc.id ? {
                    ...doc,
                    name: updatedDoc.name,
                    category: updatedDoc.category,
                    ...(file && {
                        type: file.name.split('.').pop().toUpperCase(),
                        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
                    })
                } : doc
            ));
            setIsModalOpen(false);
            setCurrentDocument(null);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await documentAPI.deleteDocument(id);
            setDocuments(documents.filter(doc => doc.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const handleDownload = async (id, name) => {
        try {
            const blob = await documentAPI.downloadDocument(id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name || `document_${id}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
                        <p className="text-gray-600">
                            {documents.length} documents • {filteredDocuments.length} matching search
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search documents..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <FiUpload className="mr-2" />
                            Upload
                        </button>
                    </div>
                </div>

                <div className="mb-6 flex justify-end">
                    <div className="inline-flex rounded-md shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'} border border-gray-300`}
                        >
                            <FiGrid />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'} border border-gray-300`}
                        >
                            <FiList />
                        </button>
                    </div>
                </div>

                {filteredDocuments.length === 0 ? (
                    <EmptyState
                        onUpload={() => setIsModalOpen(true)}
                        isSearchEmpty={searchTerm.length > 0}
                    />
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDocuments.map(doc => (
                            <DocumentCard
                                key={doc.id}
                                document={doc}
                                onEdit={() => {
                                    setCurrentDocument(doc);
                                    setIsModalOpen(true);
                                }}
                                onDelete={() => handleDelete(doc.id)}
                                onDownload={() => handleDownload(doc.id, doc.name)}
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

                <DocumentForm
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCurrentDocument(null);
                    }}
                    onSubmit={currentDocument ? handleUpdate : handleUpload}
                    document={currentDocument}
                />
            </div>
        </div>
    );
};

export default Documents;