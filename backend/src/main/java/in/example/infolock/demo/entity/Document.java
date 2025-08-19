package in.example.infolock.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String category;

    @Lob
    @Column(columnDefinition = "LONGBLOB") // ✅ Updated for large file storage
    private byte[] fileData;
}
