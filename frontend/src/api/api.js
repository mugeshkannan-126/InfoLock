

// api.js
import axios from 'axios';

// Create a single axios instance with base configuration
const API = axios.create({
    baseURL: 'http://localhost:8080/api', // Your Spring Boot backend URL
    withCredentials: true,
});

// Helper functions
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

// Request interceptor to add JWT token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized (e.g., redirect to login)
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: async (username, email, password) => {
        try {
            const response = await API.post('/auth/register', {
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Registration failed' };
        }
    },

    login: async (email, password) => {
        try {
            const response = await API.post('/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            throw error.response?.data || { error: 'Login failed' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};

export const documentAPI = {
    getAllDocuments: async () => {
        try {
            const response = await API.get('/documents');
            return response.data.map(doc => ({
                ...doc,
                id: doc.id.toString(),
                size: formatFileSize(doc.fileSize),
                uploaded: formatDate(doc.uploadDate),
                name: doc.fileName,
                type: doc.fileType
            }));
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch documents');
        }
    },

    uploadDocument: async (file, category, filename) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        formData.append('filename', filename || file.name);

        try {
            const response = await API.post('/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                ...response.data,
                id: response.data.id.toString(),
                size: formatFileSize(response.data.fileSize),
                uploaded: formatDate(response.data.uploadDate),
                name: response.data.fileName,
                type: response.data.fileType
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
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please login to download files');
            }

            const response = await API.get(`/documents/download/${id}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Extract filename from content-disposition or use provided name
            const contentDisposition = response.headers['content-disposition'];
            let downloadFileName = fileName || `document-${id}`;

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (fileNameMatch && fileNameMatch[1]) {
                    downloadFileName = fileNameMatch[1];
                }
            }

            // Create blob URL
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', downloadFileName);

            // Append to body and trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('Download error:', error);
            if (error.response?.status === 403) {
                throw new Error('You don\'t have permission to download this file');
            }
            throw new Error(error.response?.data?.message || 'Download failed');
        }
    }
};
