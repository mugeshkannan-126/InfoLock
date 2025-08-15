package in.example.infolock.demo.controllers;

import in.example.infolock.demo.dto.DocumentDTO;
import in.example.infolock.demo.exception.DocumentNotFoundException;
import in.example.infolock.demo.exception.InvalidFileException;
import in.example.infolock.demo.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<DocumentDTO> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category,
            @RequestParam("filename") String filename,
            Authentication authentication) throws IOException {

        if (file.isEmpty()) {
            throw new InvalidFileException("File cannot be empty");
        }

        String username = authentication.getName();
        DocumentDTO dto = documentService.uploadDocument(file, category, filename, username);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<DocumentDTO>> getUserDocuments(Authentication authentication) {
        String username = authentication.getName();
        List<DocumentDTO> documents = documentService.getUserDocuments(username);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<DocumentDTO>> getUserDocumentsByCategory(
            @PathVariable String category,
            Authentication authentication) {
        String username = authentication.getName();
        List<DocumentDTO> documents = documentService.getUserDocumentsByCategory(username, category);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDTO> getDocumentById(
            @PathVariable Long id,
            Authentication authentication) {
        String username = authentication.getName();
        DocumentDTO document = documentService.getDocumentById(id, username);
        return ResponseEntity.ok(document);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadUserDocument(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            byte[] fileData = documentService.downloadUserDocument(id, username);
            DocumentDTO document = documentService.getDocumentById(id, username);

            if (fileData == null || fileData.length == 0) {
                return ResponseEntity.noContent().build();
            }

            String fileName = sanitizeFilename(document.getFileName());
            MediaType contentType = MediaType.parseMediaType(
                    StringUtils.hasText(document.getFileType()) ?
                            document.getFileType() :
                            "application/octet-stream"
            );

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + fileName + "\"")
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileData.length))
                    .contentType(contentType)
                    .body(fileData);

        } catch (DocumentNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long id,
            Authentication authentication) {
        String username = authentication.getName();
        documentService.deleteDocument(id, username);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentDTO> updateDocument(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "filename", required = false) String filename,
            Authentication authentication) throws IOException {

        String username = authentication.getName();
        DocumentDTO updatedDoc = documentService.updateDocument(id, file, category, filename, username);
        return ResponseEntity.ok(updatedDoc);
    }

    private String sanitizeFilename(String filename) {
        if (!StringUtils.hasText(filename)) {
            return "document_" + System.currentTimeMillis();
        }
        return filename.replaceAll("[^a-zA-Z0-9-_.]", "_");
    }
}