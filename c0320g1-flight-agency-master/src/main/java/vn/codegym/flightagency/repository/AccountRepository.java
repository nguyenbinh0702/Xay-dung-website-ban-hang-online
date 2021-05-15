package vn.codegym.flightagency.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.codegym.flightagency.model.Account;

import java.time.LocalDate;
@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    //Created by: Quân
    Account findByEmailAndStatusIsTrue(String email);

    //Created by: Quân
    boolean existsAccountByEmailAndStatusTrue(String email);
    //    CREATE BY ANH DUC
    public Account findByEmail(String email);

    //    CREATE BY ANH DUC
    public Page<Account> findAllByFullNameAndRoleAndStatus(String name,String role,Boolean status, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<Account> findAllByEmailAndRoleAndStatus(String email,String role,Boolean status, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<Account> findAllByBirthDateAndRoleAndStatus(LocalDate birthday,String role,Boolean status, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<Account> findAllByPhoneNumberAndRoleAndStatus(String phone,String role,Boolean status, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<Account> findAllByAddressAndRoleAndStatus(String gender,String role,Boolean status, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<Account> findAllByRoleAndStatus(String role,Boolean status, Pageable pageable);
}
