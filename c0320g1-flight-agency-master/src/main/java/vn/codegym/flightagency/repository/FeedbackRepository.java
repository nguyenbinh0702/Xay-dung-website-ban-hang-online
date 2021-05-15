package vn.codegym.flightagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.codegym.flightagency.model.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long>, JpaSpecificationExecutor<Feedback> {

}
