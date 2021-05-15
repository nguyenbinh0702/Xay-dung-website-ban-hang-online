package vn.codegym.flightagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.codegym.flightagency.model.Branch;

public interface BrandRepository extends JpaRepository<Branch, Long> {
}
