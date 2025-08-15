package in.example.infolock.demo.controllers;

import in.example.infolock.demo.dto.DocumentDTO;
import in.example.infolock.demo.exception.DocumentNotFoundException;
import in.example.infolock.demo.exception.InvalidFileException;
import in.example.infolock.demo.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
            @RequestParam("filename") String filename) throws IOException {
        if (file.isEmpty()) {
            throw new InvalidFileException("File cannot be empty");
        }

        DocumentDTO dto = documentService.uploadDocument(file, category, filename);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<DocumentDTO>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(documentService.getDocumentsByCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        DocumentDTO document = documentService.getDocumentById(id);
        byte[] fileData = documentService.downloadDocument(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + document.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(document.getFileType()))
                .body(fileData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentDTO> updateDocument(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "filename", required = false) String filename) throws IOException {

        DocumentDTO updatedDoc = documentService.updateDocument(id, file, category, filename);
        return ResponseEntity.ok(updatedDoc);
    }
}