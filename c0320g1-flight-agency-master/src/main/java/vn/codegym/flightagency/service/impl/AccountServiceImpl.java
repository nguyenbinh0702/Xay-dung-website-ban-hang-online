package vn.codegym.flightagency.service.impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.model.Date;
import com.google.api.services.people.v1.model.Person;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.dto.*;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.repository.AccountRepository;
import vn.codegym.flightagency.security.JwtTokenUtil;
import vn.codegym.flightagency.service.AccountService;
import vn.codegym.flightagency.service.EmailService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


@Service
public class AccountServiceImpl implements AccountService {


    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    private EmailService emailService;

    @Value("${secretPsw}")
    String secretPsw;

    @Autowired(required = false)
    private UserDetailServiceImpl userDetailServiceImpl;

    @Autowired(required = false)
    private AuthenticationManager authenticationManager;
    //creator: Mậu
    @Override
    public employeeInfoDto findEmployeeInfoDtoById(Long id) {
        employeeInfoDto employeeInfoDtos = new employeeInfoDto();
        Account account = accountRepository.findById(id).orElse(null);
        if (account != null) {
            employeeInfoDtos.setFullName(account.getFullName());
            employeeInfoDtos.setGender(account.getGender());
            employeeInfoDtos.setBirthday(account.getBirthDate());
            employeeInfoDtos.setEmail(account.getEmail());
            employeeInfoDtos.setPhoneNumber(account.getPhoneNumber());
            employeeInfoDtos.setAddress(account.getAddress());
            employeeInfoDtos.setAvatarUrl(account.getAvatarImageUrl());
            return employeeInfoDtos;
        }
        return null;
    }

    //creator: Mậu
    @Override
    public Account findEmployeeById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    //creator: Mậu
    @Override
    public void changePassword(employeeInfoDto employeeInfoDto) {
        Account account = accountRepository.findById(employeeInfoDto.getId()).orElse(null);
        assert account != null;
        List<String> messages = new ArrayList<>();
        if (!employeeInfoDto.getPassword().equals("")) {
            if (!employeeInfoDto.getNewPassword().equals("")) {
                if (BCrypt.checkpw(employeeInfoDto.getPassword(), account.getPassword())) {
                    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                    account.setPassword(encoder.encode(employeeInfoDto.getNewPassword()));
                } else {
                    messages.add("Mật khẩu hiện tại không đúng. Xin vui lòng nhập lại.");
                }
            }
        }
        employeeInfoDto.setBackendMessage(messages);
        if (employeeInfoDto.getBackendMessage().size() == 0) {
            accountRepository.save(account);
        }

    }

    //Created by: Quân
    @Override
    public boolean existsEmail(String email) {
        return accountRepository.existsAccountByEmailAndStatusTrue(email);
    }
    //Created by: Quân
    @Override
    public Account findByEmail(String email) {
        return accountRepository.findByEmailAndStatusIsTrue(email);
    }
    //Created by: Quân
    @Override
    public Account saveAccount(Account account) {
        accountRepository.save(account);
        return account;
    }

    //Created by: Quân
    @Override
    public UserDetails getUserDetail(Account account) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(account.getEmail(), secretPsw)
        );
        return userDetailServiceImpl.loadUserByUsername(authentication.getName());
    }
    //Created by: Quân
    @Override
    public Account getProfileGoogle(TokenDto tokenDto) {
        final NetHttpTransport transport = new NetHttpTransport();
        final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();

        GoogleCredential credential = new GoogleCredential.Builder().build().setAccessToken(tokenDto.getValue());
        PeopleService peopleService =
                new PeopleService(transport, jacksonFactory, credential);
        Person profile = null;
        try {
            profile = peopleService.people().get("people/me")
                    .setPersonFields("emailAddresses,birthdays,names,genders,photos,addresses,phoneNumbers")
                    .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Account account = null;
        if (profile != null) {
            String email = profile.getEmailAddresses().get(0).getValue();
            Date date = profile.getBirthdays().get(0).getDate();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/M/yyyy");
            LocalDate birthday = LocalDate.parse(date.getDay() + "/" + date.getMonth() + "/" + date.getYear(), formatter );
            String name = profile.getNames().get(0).getDisplayName();
            String gender = profile.getGenders().get(0).getValue();
            gender = checkGender(gender);
            account = new Account(email, passwordEncoder.encode(secretPsw), "ROLE_USER",
                    true, name, birthday, tokenDto.getAvatarURL(), gender);

        } else {
            Logger.getLogger("Not profile google");
        }

        return account;
    }
    //Created by: Quân
    @Override
    public Account getProfileFacebook(TokenDto tokenDto) {
        Facebook facebook = new FacebookTemplate(tokenDto.getValue());
        final String[] fields = {"email", "birthday", "name", "gender"};
        User userFacebook = facebook.fetchObject("me", User.class, fields);

        String email = userFacebook.getEmail();
        System.out.println(userFacebook.getBirthday());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate birthday = LocalDate.parse(userFacebook.getBirthday(),formatter);
        String name = userFacebook.getName();
        String gender = userFacebook.getGender();
         gender = checkGender(gender);
        return new Account(email, passwordEncoder.encode(secretPsw), "ROLE_USER",
                true, name, birthday, tokenDto.getAvatarURL(), gender);
    }

    public String checkGender(String gender){
        if("male".equals(gender)){
            return "nam";
        }else {
            return "nữ";
        }


    }
    //BHung
    @Override
    public Account findAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    //    Created By Thiện
    @Override
    public Account findAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    //    Created By Thiện
    @Override
    public CustomerUpdateDTO findCustomerUpdateDTOById(Long id) {
        CustomerUpdateDTO customerUpdateDTO = new CustomerUpdateDTO();
        Account account = accountRepository.findById(id).orElse(null);
        if (account != null ) {
            customerUpdateDTO.setFullName(account.getFullName());
            customerUpdateDTO.setEmail(account.getEmail());
            customerUpdateDTO.setGender(account.getGender());
            customerUpdateDTO.setPhoneNumber(account.getPhoneNumber());
            customerUpdateDTO.setBirthday(account.getBirthDate());
            customerUpdateDTO.setAvatarImageUrl(account.getAvatarImageUrl());
            customerUpdateDTO.setAddress(account.getAddress());
            customerUpdateDTO.setRank(account.getCustomerRank());
            return customerUpdateDTO;
        }
        return null ;
    }

    //    Created By Thiện
    @Override
    public void updateCustomer(CustomerUpdateDTO customerUpdateDTO) {
        Account account = accountRepository.findById(customerUpdateDTO.getId()).orElse(null);
        assert account != null;
        account.setFullName(customerUpdateDTO.getFullName().trim());
        account.setAddress(customerUpdateDTO.getAddress().trim());
        account.setGender(customerUpdateDTO.getGender());
        account.setPhoneNumber(customerUpdateDTO.getPhoneNumber());
        account.setBirthDate(customerUpdateDTO.getBirthday());
        account.setAvatarImageUrl(customerUpdateDTO.getAvatarImageUrl());
        List<String> messages = new ArrayList<>();
        List<Account> accounts = accountRepository.findAll();
        for (Account testAcc : accounts) {
            if (!account.getEmail().equals(customerUpdateDTO.getEmail().trim()) && testAcc.getEmail().equals(customerUpdateDTO.getEmail().trim())) {
                messages.add("Email này đã được đăng kí. Vui lòng nhập lại email khác.");
                break;
            }
        }
        account.setEmail(customerUpdateDTO.getEmail().trim());
        for (Account testAcc : accounts) {
            if (!account.getPhoneNumber().equals(customerUpdateDTO.getPhoneNumber()) && testAcc.getPhoneNumber().equals(customerUpdateDTO.getPhoneNumber())) {
                messages.add("Số điện thoại này đã được đăng kí. Vui lòng nhập lại số điện thoại khác.");
                break;
            }
        }
        account.setPhoneNumber(customerUpdateDTO.getPhoneNumber());
        customerUpdateDTO.setBackendMessage(messages);
        if (customerUpdateDTO.getBackendMessage().size() == 0) {
            accountRepository.save(account);
        }
    }

    //    Created By Thiện
    @Override
    public void changePassword(CustomerChangePasswordDTO customerChangePasswordDTO) {
        Account account = accountRepository.findById(customerChangePasswordDTO.getId()).orElse(null);
        assert account != null;
        List<String> messages = new ArrayList<>();
        if (!customerChangePasswordDTO.getPassword().equals("")) {
            if (!customerChangePasswordDTO.getNewPassword().equals("")) {
                if (BCrypt.checkpw(customerChangePasswordDTO.getPassword(), account.getPassword())) {
                    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                    account.setPassword(encoder.encode(customerChangePasswordDTO.getNewPassword()));
                } else {
                    messages.add("Mật khẩu hiện tại không đúng. Xin vui lòng nhập lại.");
                }
            } else {
                messages.add("Vui lòng nhập mật khẩu hiện tại đi kèm với mật khẩu mới và xác nhận mật khẩu.");
            }
        } else if (!customerChangePasswordDTO.getNewPassword().equals("")) {
            messages.add("Vui lòng nhập mật khẩu hiện tại khi đổi mật khẩu.");
        }
        customerChangePasswordDTO.setBackendMessage(messages);
        if (customerChangePasswordDTO.getBackendMessage().size() == 0) {
            accountRepository.save(account);
        }
    }

    //CREATE BY ANH DUC
    @Override
    public Account autoRegAccount(Account account) {
        account.setRole("ROLE_EMPLOYEE");
        String newPassword;
        String passwordEncryption;
        newPassword = RandomStringUtils.randomAlphanumeric(10);
        passwordEncryption = passwordEncoder.encode(newPassword);
        account.setPassword(passwordEncryption);
        account.setStatus(true);
        accountRepository.save(account);
        String to = account.getEmail();
        String subject = "Chào mừng bạn gia nhập CGB Airlines ";
        String text = " Thông tin tài khoản của bạn \n " +
                "User : " + account.getEmail() +
                "Password: " + newPassword +
                "Tài khoản này được dùng để đăng nhập vào hệ thống tại http://localhost:4200/employee/login";
        emailService.sendSimpleMessage(to, subject, text);
        return account;
    }

    //B-HoangLong
    @Override
    public void saveEmployee(Account employeeDelete) {
        this.accountRepository.save(employeeDelete);
    }

    //B-HoangLong
    @Override
    public void editEmployee(AccountDTO employeeEditDto, Long id) {
        Account employee = findEmployeeById(id);
        employee.setFullName(employeeEditDto.getFullName());
        employee.setAddress(employeeEditDto.getAddress());
        employee.setEmail(employeeEditDto.getEmail());
        employee.setPhoneNumber(employeeEditDto.getPhoneNumber());
        employee.setBirthDate(employeeEditDto.getBirthday());
        this.accountRepository.save(employee);
    }

    //B-HoangLong
    @Override
    public AccountDTO findEmployeeDtoById(Long id) {
        Account employee = this.accountRepository.findById(id).orElse(null);
        return this.changeAccountToAccountEmployeeEditDto(employee);
    }

    //B-HoangLong
    private AccountDTO changeAccountToAccountEmployeeEditDto(Account employee){
        AccountDTO employeeEditDto = new AccountDTO();
        employeeEditDto.setId(employee.getId());
        employeeEditDto.setFullName(employee.getFullName());
        employeeEditDto.setAddress(employee.getAddress());
        employeeEditDto.setEmail(employee.getEmail());
        employeeEditDto.setPhoneNumber(employee.getPhoneNumber());
        employeeEditDto.setBirthday(employee.getBirthDate());
        return employeeEditDto;
    }

    //B-HoangLong
    @Override
    public void deleteEmployee(Account employeeDelete){
        employeeDelete.setStatus(false);
        this.accountRepository.save(employeeDelete);
    }
}

