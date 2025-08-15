package in.example.infolock.demo.repository;

import in.example.infolock.demo.entity.Document;
import in.example.infolock.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByCategory(String category);
    List<Document> findByUser(UserEntity user);
    List<Document> findByUserAndCategory(UserEntity user, String category);
    Optional<Document> findByIdAndUser(Long id, UserEntity user);
    boolean existsByIdAndUser(Long id, UserEntity user);
}

