package in.example.infolock.demo.service;

import in.example.infolock.demo.dto.DocumentDTO;
import in.example.infolock.demo.entity.Document;
import in.example.infolock.demo.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    public Document uploadDocument(MultipartFile file, String category, String filename) throws IOException {
        Document document = Document.builder()
                .fileName(filename)
                .fileType(file.getContentType())
                .category(category)
                .fileData(file.getBytes())
                .build();

        return documentRepository.save(document);
    }

    public List<DocumentDTO> getAllDocuments() {
        return documentRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<DocumentDTO> getDocumentsByCategory(String category) {
        return documentRepository.findByCategory(category).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public byte[] downloadDocument(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"))
                .getFileData();
    }

    private DocumentDTO toDTO(Document document) {
        return DocumentDTO.builder()
                .id(document.getId())
                .fileName(document.getFileName())
                .fileType(document.getFileType())
                .category(document.getCategory())
                .build();
    }

    public DocumentDTO getDocumentById(Long id) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        return toDTO(doc);
    }

    public void deleteDocument(Long id) {
        if (!documentRepository.existsById(id)) {
            throw new RuntimeException("Document not found");
        }
        documentRepository.deleteById(id);
    }

    public void updateDocument(Long id, MultipartFile file, String category) throws IOException {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (file != null) {
            doc.setFileName(file.getOriginalFilename());
            doc.setFileType(file.getContentType());
            doc.setFileData(file.getBytes());
        }
        if (category != null) {
            doc.setCategory(category);
        }
        documentRepository.save(doc);
    }

    public void updateCategory(Long id, String category) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        doc.setCategory(category);
        documentRepository.save(doc);
    }

}

