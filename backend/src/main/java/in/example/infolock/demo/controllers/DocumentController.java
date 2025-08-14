package in.example.infolock.demo.controllers;

import in.example.infolock.demo.dto.DocumentDTO;
import in.example.infolock.demo.entity.Document;
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

    // Upload new document
    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category,
            @RequestParam("filename") String filename) {
        try {
            Document savedDoc = documentService.uploadDocument(file, category, filename);
            return ResponseEntity.ok("Uploaded successfully with ID: " + savedDoc.getId());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    // Get all documents metadata
    @GetMapping
    public List<DocumentDTO> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    // Get documents by category
    @GetMapping("/category/{category}")
    public List<DocumentDTO> getDocumentsByCategory(@PathVariable String category) {
        return documentService.getDocumentsByCategory(category);
    }

    // Get document metadata by ID
    @GetMapping("/{id}")
    public DocumentDTO getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id);
    }

    // Download file by ID
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        byte[] fileData = documentService.downloadDocument(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=document_" + id)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileData);
    }

    // Delete document by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok("Document deleted successfully");
    }

    // Update file + category by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateDocument(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "category", required = false) String category) {
        try {
            documentService.updateDocument(id, file, category);
            return ResponseEntity.ok("Document updated successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    // Update category only
    @PatchMapping("/{id}/category")
    public ResponseEntity<String> updateCategory(
            @PathVariable Long id,
            @RequestParam("category") String category) {
        documentService.updateCategory(id, category);
        return ResponseEntity.ok("Category updated successfully");
    }
}
