package in.example.infolock.demo.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private String category;
    private Long fileSize;
    private LocalDateTime uploadDate;
}