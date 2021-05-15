package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.CustomerChangePasswordDTO;
import vn.codegym.flightagency.dto.CustomerUpdateDTO;
import vn.codegym.flightagency.dto.JwtResponse;
import vn.codegym.flightagency.dto.TokenDto;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.dto.employeeInfoDto;
import vn.codegym.flightagency.security.JwtTokenUtil;
import vn.codegym.flightagency.service.AccountService;
import vn.codegym.flightagency.service.impl.UserDetailServiceImpl;


@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class AccountController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AccountService accountService ;

    @Autowired(required = false)
    private AuthenticationManager authenticationManager;

    @Autowired(required = false)
    private UserDetailServiceImpl userDetailServiceImpl;

    //creator: Mậu-  xem thông tin nhân viên
    @GetMapping("employee/{id}")
    public ResponseEntity<employeeInfoDto> findEmployeeById(@PathVariable Long id) {
        employeeInfoDto employeeInfoDto = accountService.findEmployeeInfoDtoById(id);
        if (employeeInfoDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(employeeInfoDto);
    }

    //creator: Mậu- đổi mật khẩu nhân viên
    @PutMapping("employee/changePassword/{id}")
    public ResponseEntity<employeeInfoDto> changePassword(@PathVariable Long id, @RequestBody employeeInfoDto employeeInfoDto) {
        Account account = accountService.findEmployeeById(id);
        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        accountService.changePassword(employeeInfoDto);
        return new ResponseEntity<>(employeeInfoDto, HttpStatus.OK);
    }

    //Created by: Quân
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account account) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(account.getEmail(), account.getPassword())
        );
        UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(authentication.getName());
        String jwtToken = jwtTokenUtil.generateToken(userDetails);
        Account accountLogin = accountService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(new JwtResponse(jwtToken,accountLogin.getId(),accountLogin.getFullName(), userDetails.getUsername(), accountLogin.getAvatarImageUrl(),userDetails.getAuthorities()));
    }

    //Created by: Quân
    @PostMapping("/google")
    public ResponseEntity<?> google(@RequestBody TokenDto tokenDto)  {
      Account accountGoogle ;

        if (accountService.existsEmail(tokenDto.getEmail())){
            accountGoogle = accountService.findByEmail(tokenDto.getEmail());
        }else{
            accountGoogle = accountService.getProfileGoogle(tokenDto);
            accountGoogle = accountService.saveAccount(accountGoogle);
        }
        UserDetails userDetails = accountService.getUserDetail(accountGoogle);
        String jwtToken = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(jwtToken,accountGoogle.getId(),accountGoogle.getFullName(),userDetails.getUsername(),accountGoogle.getAvatarImageUrl(), userDetails.getAuthorities()));
    }

    //Created by: Quân
    @PostMapping("/facebook")
    public ResponseEntity<?> facebook(@RequestBody TokenDto tokenDto)  {
        Account accountFacebook ;
        if (accountService.existsEmail(tokenDto.getEmail())){
            accountFacebook = accountService.findByEmail(tokenDto.getEmail());
        }
        else{
            accountFacebook = accountService.getProfileFacebook(tokenDto);
            accountFacebook = accountService.saveAccount(accountFacebook);
        }

        UserDetails userDetails = accountService.getUserDetail(accountFacebook);
        String jwtToken = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(jwtToken,accountFacebook.getId(),accountFacebook.getFullName(), userDetails.getUsername(), accountFacebook.getAvatarImageUrl(),userDetails.getAuthorities()));
    }

//    Created By Thiện - Tìm khách hàng theo Id
    @GetMapping("/customer/{id}")
    public ResponseEntity<CustomerUpdateDTO> findCustomerById(@PathVariable Long id) {
        CustomerUpdateDTO customerUpdateDTO = accountService.findCustomerUpdateDTOById(id);
        if (customerUpdateDTO == null) {
            return new ResponseEntity<CustomerUpdateDTO>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(customerUpdateDTO);
    }

    //    Created By Thiện - Chỉnh sửa thông tin khách hàng
    @PutMapping("customer/update/{id}")
    public ResponseEntity<CustomerUpdateDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerUpdateDTO customerUpdateDTO) {
        Account account = accountService.findAccountById(id);
        if (account == null) {
            return new ResponseEntity<CustomerUpdateDTO>(HttpStatus.NOT_FOUND);
        }
        accountService.updateCustomer(customerUpdateDTO);
        return new ResponseEntity<CustomerUpdateDTO>(customerUpdateDTO, HttpStatus.OK);
    }

    //    Created By Thiện - Thay đổi mật khẩu dành cho khách hàng
    @PutMapping("customer/changepass/{id}")
    public ResponseEntity<CustomerChangePasswordDTO> CustomerChangePassword(@PathVariable Long id, @RequestBody CustomerChangePasswordDTO customerChangePasswordDTO) {
        Account account = accountService.findAccountById(id);
        if (account == null) {
            return new ResponseEntity<CustomerChangePasswordDTO>(HttpStatus.NOT_FOUND);
        }
        accountService.changePassword(customerChangePasswordDTO);
        return new ResponseEntity<CustomerChangePasswordDTO>(customerChangePasswordDTO, HttpStatus.OK);
    }

}
