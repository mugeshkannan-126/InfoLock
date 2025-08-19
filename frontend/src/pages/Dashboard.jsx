import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiFolder, FiSearch, FiTrash2, FiEdit2, FiDownload } from 'react-icons/fi';
import DocumentCard from '../components/DocumentCard';
import DocumentList from '../components/DocumentList';
import DocumentForm from '../components/DocumentForm';

const Dashboard = () => {
    // State for documents, search, and modal
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'list'

    // Mock data - replace with API calls in real implementation
    useEffect(() => {
        // This would be replaced with an actual API call
        const mockDocuments = [
            {
                id: 1,
                name: 'Passport.pdf',
                type: 'PDF',
                size: '2.4 MB',
                uploadedAt: '2023-05-15',
                category: 'Personal'
            },
            {
                id: 2,
                name: 'Resume.docx',
                type: 'DOCX',
                size: '1.2 MB',
                uploadedAt: '2023-06-20',
                category: 'Professional'
            },
            {
                id: 3,
                name: 'Contract.pdf',
                type: 'PDF',
                size: '3.1 MB',
                uploadedAt: '2023-07-10',
                category: 'Legal'
            },
            {
                id: 4,
                name: 'Tax_Return_2022.pdf',
                type: 'PDF',
                size: '4.5 MB',
                uploadedAt: '2023-04-05',
                category: 'Financial'
            }
        ];
        setDocuments(mockDocuments);
    }, []);

    // Filter documents based on search term
    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle document upload
    const handleUpload = (newDocument) => {
        setDocuments([...documents, newDocument]);
        setIsUploadModalOpen(false);
    };

    // Handle document delete
    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    // Handle document edit
    const handleEdit = (updatedDocument) => {
        setDocuments(documents.map(doc =>
            doc.id === updatedDocument.id ? updatedDocument : doc
        ));
        setSelectedDocument(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Main Content - now at the top */}
            <div className="flex-grow">
                {/* Dashboard Header */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
                            <div className="mt-4 md:mt-0">
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FiUpload className="mr-2" />
                                    Upload Document
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {/* Search and View Toggle */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search documents..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentView('grid')}
                                className={`px-3 py-2 rounded-md ${currentView === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                            >
                                Grid View
                            </button>
                            <button
                                onClick={() => setCurrentView('list')}
                                className={`px-3 py-2 rounded-md ${currentView === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                            >
                                List View
                            </button>
                        </div>
                    </div>

                    {/* Documents Section */}
                    {filteredDocuments.length === 0 ? (
                        <div className="text-center py-12">
                            <FiFolder className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by uploading a new document.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FiUpload className="-ml-1 mr-2 h-5 w-5" />
                                    Upload Document
                                </button>
                            </div>
                        </div>
                    ) : currentView === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredDocuments.map((document) => (
                                <DocumentCard
                                    key={document.id}
                                    document={document}
                                    onEdit={() => setSelectedDocument(document)}
                                    onDelete={() => handleDelete(document.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <DocumentList
                            documents={filteredDocuments}
                            onEdit={setSelectedDocument}
                            onDelete={handleDelete}
                        />
                    )}
                </main>

                {/* Upload/Edit Modal */}
                <DocumentForm
                    isOpen={isUploadModalOpen || !!selectedDocument}
                    onClose={() => {
                        setIsUploadModalOpen(false);
                        setSelectedDocument(null);
                    }}
                    onSubmit={selectedDocument ? handleEdit : handleUpload}
                    document={selectedDocument}
                />
            </div>

        </div>
    );
};

export default Dashboard;