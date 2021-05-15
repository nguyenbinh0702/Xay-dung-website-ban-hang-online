package vn.codegym.flightagency.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.flightagency.dto.AccountDTO;
import vn.codegym.flightagency.dto.EmployeePassengerDTO;
import vn.codegym.flightagency.dto.EmployeeTransactionDTO;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.model.Transaction;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    //BHung luu trans và pass
    List<Transaction> saveTransactionsAndTickets(List<EmployeeTransactionDTO> transactions, List<EmployeePassengerDTO> passengers);

    //BHung find trans By Id
    Transaction findTransactionById(Long id);
    //CREATE BY ANH DUC
    List<Account> findAll();

    //CREATE BY ANH DUC
    Page<AccountDTO> findAllAccount(Pageable pageable);

    //CREATE BY ANH DUC
    Optional<Account> findById(Long id);

    //CREATE BY ANH DUC
    Account findByEmail(String email);

    //CREATE BY ANH DUC
    Page<AccountDTO> findAllByFullName(String name, Pageable pageable);

    //CREATE BY ANH DUC
    Page<AccountDTO> findAllByBirthday(LocalDate birthday, Pageable pageable);

    //CREATE BY ANH DUC
    Page<AccountDTO> findAllByPhoneNumber(String phone, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<AccountDTO> findAllByGender(String gender, Pageable pageable);

    //    CREATE BY ANH DUC
    public Page<AccountDTO> findAllByEmail(String gender, Pageable pageable);

    //CREATE BY ANH DUC
    Boolean checkEmailAlready(String email);

    //CREATE BY ANH DUC
    void save(Account account);

    //CREATE BY ANH DUC
    void remove(Long id);

    //CREATE BY ANH DUC
    AccountDTO coverAccountToEmpDTO(Account account);

    //CREATE BY ANH DUC
    Account coverEmpDTOToAccount(AccountDTO accountDTO);

    //CREATE BY ANH DUC
    Page<AccountDTO> coverListAccountToListEmpDTO(Page<Account> accounts);

    //CREATE BY ANH DUC
    List<Account> coverListEmpDTOToListAccount(List<AccountDTO> accountDTOList);


}
