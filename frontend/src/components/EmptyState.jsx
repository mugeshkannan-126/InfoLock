import { FiFolder, FiUploadCloud } from 'react-icons/fi';

const EmptyState = ({ onUpload, isSearchEmpty }) => {
    return (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
            <FiFolder className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
                {isSearchEmpty ? 'No matching documents' : 'No documents yet'}
            </h3>
            <p className="text-gray-500 mb-6">
                {isSearchEmpty
                    ? 'Try a different search term'
                    : 'Get started by uploading your first document'}
            </p>
            {!isSearchEmpty && (
                <button
                    onClick={onUpload}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FiUploadCloud className="mr-2" />
                    Upload Document
                </button>
            )}
        </div>
    );
};

export default EmptyState;