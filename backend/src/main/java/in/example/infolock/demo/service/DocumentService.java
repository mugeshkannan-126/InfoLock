package in.example.infolock.demo.service;

import in.example.infolock.demo.dto.DocumentDTO;
import in.example.infolock.demo.entity.Document;
import in.example.infolock.demo.exception.DocumentNotFoundException;
import in.example.infolock.demo.exception.InvalidFileException;
import in.example.infolock.demo.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Transactional
    public DocumentDTO uploadDocument(MultipartFile file, String category, String filename) throws IOException {
        if (file.isEmpty()) {
            throw new InvalidFileException("File cannot be empty");
        }

        Document document = Document.builder()
                .fileName(filename)
                .fileType(file.getContentType())
                .category(category)
                .fileData(file.getBytes())
                .fileSize(file.getSize())
                .build();

        Document savedDoc = documentRepository.save(document);
        return toDTO(savedDoc);
    }

    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocuments() {
        return documentRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DocumentDTO> getDocumentsByCategory(String category) {
        return documentRepository.findByCategory(category).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public byte[] downloadDocument(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id))
                .getFileData();
    }

    @Transactional(readOnly = true)
    public DocumentDTO getDocumentById(Long id) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));
        return toDTO(doc);
    }

    @Transactional
    public void deleteDocument(Long id) {
        if (!documentRepository.existsById(id)) {
            throw new DocumentNotFoundException("Document not found with id: " + id);
        }
        documentRepository.deleteById(id);
    }

    @Transactional
    public DocumentDTO updateDocument(Long id, MultipartFile file, String category, String filename) throws IOException {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));

        if (filename != null && !filename.isEmpty()) {
            doc.setFileName(filename);
        }

        if (file != null && !file.isEmpty()) {
            doc.setFileType(file.getContentType());
            doc.setFileData(file.getBytes());
            doc.setFileSize(file.getSize());
        }

        if (category != null && !category.isEmpty()) {
            doc.setCategory(category);
        }

        Document updatedDoc = documentRepository.save(doc);
        return toDTO(updatedDoc);
    }

    private DocumentDTO toDTO(Document document) {
        return DocumentDTO.builder()
                .id(document.getId())
                .fileName(document.getFileName())
                .fileType(document.getFileType())
                .category(document.getCategory())
                .fileSize(document.getFileSize())
                .uploadDate(document.getUploadDate())
                .build();
    }
}