package in.example.infolock.demo.service;

import in.example.infolock.demo.dto.DocumentDTO;
import in.example.infolock.demo.entity.Document;
import in.example.infolock.demo.entity.UserEntity;
import in.example.infolock.demo.exception.DocumentNotFoundException;
import in.example.infolock.demo.exception.InvalidFileException;
import in.example.infolock.demo.exception.UserNotFoundException;
import in.example.infolock.demo.repository.DocumentRepository;
import in.example.infolock.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    @Transactional
    public DocumentDTO uploadDocument(MultipartFile file, String category,
                                      String filename, String email) throws IOException {
        if (file.isEmpty()) {
            throw new InvalidFileException("File cannot be empty");
        }

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Document document = Document.builder()
                .fileName(filename)
                .fileType(file.getContentType())
                .category(category)
                .fileData(file.getBytes())
                .fileSize(file.getSize())
                .uploadDate(LocalDateTime.now())
                .user(user)
                .build();

        Document savedDoc = documentRepository.save(document);
        return toDTO(savedDoc);
    }

    @Transactional(readOnly = true)
    public List<DocumentDTO> getUserDocuments(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        return documentRepository.findByUser(user).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DocumentDTO> getUserDocumentsByCategory(String email, String category) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        return documentRepository.findByUserAndCategory(user, category).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public byte[] downloadUserDocument(Long id, String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Document document = documentRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));

        return document.getFileData();
    }

    @Transactional(readOnly = true)
    public DocumentDTO getDocumentById(Long id, String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + email));

        Document document = documentRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));

        return toDTO(document);
    }

    @Transactional
    public void deleteDocument(Long id, String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        if (!documentRepository.existsByIdAndUser(id, user)) {
            throw new DocumentNotFoundException("Document not found with id: " + id);
        }
        documentRepository.deleteById(id);
    }

    @Transactional
    public DocumentDTO updateDocument(Long id, MultipartFile file,
                                      String category, String filename, String email) throws IOException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Document document = documentRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));

        if (filename != null && !filename.isEmpty()) {
            document.setFileName(filename);
        }

        if (file != null && !file.isEmpty()) {
            document.setFileType(file.getContentType());
            document.setFileData(file.getBytes());
            document.setFileSize(file.getSize());
        }

        if (category != null && !category.isEmpty()) {
            document.setCategory(category);
        }

        document.setUploadDate(LocalDateTime.now());
        Document updatedDoc = documentRepository.save(document);
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