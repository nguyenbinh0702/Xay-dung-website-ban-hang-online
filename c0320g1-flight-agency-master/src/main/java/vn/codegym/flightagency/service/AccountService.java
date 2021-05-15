package vn.codegym.flightagency.service;

import org.springframework.security.core.userdetails.UserDetails;
import vn.codegym.flightagency.dto.*;
import vn.codegym.flightagency.model.Account;

public  interface AccountService {
    
    //Created by: Quân
     boolean existsEmail(String email);

    //Created by: Quân
      Account findByEmail(String email);

    //Created by: Quân
    Account saveAccount(Account account);

    //Created by: Quân
    UserDetails getUserDetail(Account account);

    //Created by: Quân
    Account getProfileGoogle(TokenDto tokenDto);

    //Created by: Quân
    Account getProfileFacebook(TokenDto tokenDto);
    //BHung
    Account findAccountByEmail(String email);

    //    Created By Thiện
    Account findAccountById(Long id) ;

    //    Created By Thiện
    CustomerUpdateDTO findCustomerUpdateDTOById(Long id) ;

    //    Created By Thiện
    void updateCustomer(CustomerUpdateDTO customerUpdateDTO);

    //    Created By Thiện
    void changePassword(CustomerChangePasswordDTO customerChangePasswordDTO);

    //CREATE BY ANH DUC
    Account autoRegAccount(Account account);


    //creator: Mậu
    employeeInfoDto findEmployeeInfoDtoById(Long id);

    //creator: Mậu
    Account findEmployeeById(Long id);

    //creator: Mậu
    void changePassword(employeeInfoDto employeeInfoDto);

    //B-HoangLong
    void saveEmployee(Account employeeDelete);

    //B-HoangLong
    void editEmployee(AccountDTO employeeEditDto, Long id);

    //B-HoangLong
    AccountDTO findEmployeeDtoById(Long id);

    void deleteEmployee(Account employeeDelete);
}

