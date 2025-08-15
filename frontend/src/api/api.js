import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/documents';

const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const documentAPI = {
    getAllDocuments: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data.map(doc => ({
                ...doc,
                id: doc.id.toString(),
                size: formatFileSize(doc.fileSize),
                uploaded: formatDate(doc.uploadDate),
                // For backward compatibility with existing components
                name: doc.fileName,
                type: doc.fileType,
                tags: [] // Add if your frontend expects this
            }));
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw new Error('Failed to fetch documents. Please try again later.');
        }
    },

    uploadDocument: async (file, category, filename) => {
        if (!file) throw new Error('No file selected');
        if (!category) throw new Error('Category is required');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        formData.append('filename', filename || file.name);

        try {
            const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                ...response.data,
                id: response.data.id.toString(),
                size: formatFileSize(response.data.fileSize),
                uploaded: formatDate(response.data.uploadDate),
                // For backward compatibility
                name: response.data.fileName,
                type: response.data.fileType,
                tags: []
            };
        } catch (error) {
            console.error('Error uploading document:', error);
            throw new Error(error.response?.data?.message || 'Failed to upload document');
        }
    },

    updateDocument: async (id, file, category, filename) => {
        if (!id) throw new Error('Document ID is required');

        const formData = new FormData();
        if (file) formData.append('file', file);
        if (category) formData.append('category', category);
        if (filename) formData.append('filename', filename);

        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return {
                ...response.data,
                id: response.data.id.toString(),
                size: formatFileSize(response.data.fileSize),
                uploaded: formatDate(response.data.uploadDate),
                // For backward compatibility
                name: response.data.fileName,
                type: response.data.fileType
            };
        } catch (error) {
            console.error('Error updating document:', error);
            throw new Error(error.response?.data?.message || 'Failed to update document');
        }
    },

    deleteDocument: async (id) => {
        if (!id) throw new Error('Document ID is required');

        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting document:', error);
            throw new Error(error.response?.data?.message || 'Failed to delete document');
        }
    },

    downloadDocument: async (id, fileName) => {
        if (!id) throw new Error('Document ID is required');

        try {
            const response = await axios.get(`${API_BASE_URL}/download/${id}`, {
                responseType: 'blob',
            });

            // Create download link and trigger click
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName || `document_${id}`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('Error downloading document:', error);
            throw new Error(error.response?.data?.message || 'Failed to download document');
        }
    },
};