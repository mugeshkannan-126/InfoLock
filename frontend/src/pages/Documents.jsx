import React, { useState, useEffect } from 'react';
import { FiUpload, FiSearch, FiTrash2, FiEdit2, FiDownload, FiGrid, FiList } from 'react-icons/fi';
import DocumentCard from '../components/DocumentCard';
import DocumentList from '../components/DocumentList';
import DocumentForm from '../components/DocumentForm';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';

const Documents = () => {
    // State management
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);

    // Fetch documents (mock data for now)
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockData = [
                    {
                        id: 'doc-001',
                        name: 'Passport.pdf',
                        type: 'PDF',
                        size: '2.4 MB',
                        uploaded: '2023-10-15',
                        category: 'Personal',
                        tags: ['id', 'travel']
                    },
                    {
                        id: 'doc-002',
                        name: 'Resume.docx',
                        type: 'DOCX',
                        size: '1.2 MB',
                        uploaded: '2023-11-20',
                        category: 'Professional',
                        tags: ['job', 'career']
                    },
                    {
                        id: 'doc-003',
                        name: 'House Contract.pdf',
                        type: 'PDF',
                        size: '5.7 MB',
                        uploaded: '2023-09-05',
                        category: 'Legal',
                        tags: ['property', 'agreement']
                    }
                ];

                setDocuments(mockData);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    // Filter documents based on search
    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Document actions
    const handleUpload = (newDoc) => {
        setDocuments([{ ...newDoc, id: `doc-${Date.now()}` }, ...documents]);
        setIsModalOpen(false);
    };

    const handleUpdate = (updatedDoc) => {
        setDocuments(documents.map(doc =>
            doc.id === updatedDoc.id ? updatedDoc : doc
        ));
        setIsModalOpen(false);
        setCurrentDocument(null);
    };

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
                        <p className="text-gray-600">
                            {documents.length} documents • {filteredDocuments.length} matching search
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search Bar */}
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

                        {/* Upload Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <FiUpload className="mr-2" />
                            Upload
                        </button>
                    </div>
                </div>

                {/* View Toggle */}
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

                {/* Documents Display */}
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
                    />
                )}

                {/* Document Form Modal */}
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