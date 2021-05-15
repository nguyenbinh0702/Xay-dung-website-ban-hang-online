package vn.codegym.flightagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.flightagency.dto.AccountDTO;
import vn.codegym.flightagency.dto.ResponseDTO;
import vn.codegym.flightagency.model.Account;
import vn.codegym.flightagency.service.AccountService;
import vn.codegym.flightagency.service.EmployeeService;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
//CREATE BY ANH DUC
public class EmployeeAPI {
    //CREATE BY ANH DUC
    @Autowired
    private EmployeeService employeeService;
    //CREATE BY ANH DUC
    @Autowired
    private AccountService accountService;

    //CREATE BY ANH DUC
    @GetMapping("/employeeAPI")
    public ResponseEntity<Map<String, Object>> getAllEmployee(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable paging = PageRequest.of(page, size);
        Page<AccountDTO> pageEmployees = employeeService.findAllAccount(paging);
        Map<String, Object> response = new HashMap<>();
        if (pageEmployees.isEmpty()) {
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("message", "Data Null");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        response.put("status", HttpStatus.OK);
        response.put("message", "Lấy dữ liệu thành công !");
        response.put("body", pageEmployees.getContent());
        response.put("currentPage", pageEmployees.getNumber());
        response.put("totalItems", pageEmployees.getTotalElements());
        response.put("totalPages", pageEmployees.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    //CREATE BY ANH DUC
    @GetMapping("/employeeAPI/{id}")
    public ResponseEntity<? extends Object> getEmployeeById(@PathVariable("id") Long id) {
        ResponseDTO response = new ResponseDTO();
        Optional<Account> employee = employeeService.findById(id);
        if (!employee.isPresent()) {
            response.setStatus(HttpStatus.NOT_FOUND);
            response.setMessage("Nhân viên Id :" + id + " không tồn tại!");
            return new ResponseEntity<Object>(response, response.getStatus());
        }
        response.setStatus(HttpStatus.OK);
        response.setMessage("Get data Thành Công");
        response.setBody(employee);
        return new ResponseEntity<Object>(response, response.getStatus());
    }

    //CREATE BY ANH DUC
    @PostMapping("/employeeAPI")
    public ResponseEntity<? extends Object> saveEmployees(@RequestBody List<AccountDTO> accountDTOList) {
        ResponseDTO response = new ResponseDTO();
        List<Account> employees = new ArrayList<Account>();
        employees = employeeService.coverListEmpDTOToListAccount(accountDTOList);

        if (employees == null) {
            response.setStatus(HttpStatus.NOT_FOUND);
            response.setMessage("Lưu dữ liệu thất bại");
            return new ResponseEntity<Object>(response, response.getStatus());
        }
        for (Account n : employees) {
            if (employeeService.checkEmailAlready(n.getEmail())) {
                response.setStatus(HttpStatus.NOT_FOUND);
                response.setMessage("Email Đã tồn tại : " + n.getEmail());
                return new ResponseEntity<Object>(response, response.getStatus());
            }
            employeeService.save(accountService.autoRegAccount(n));
        }
        response.setStatus(HttpStatus.OK);
        response.setMessage("Lưu dữ liệu thành công");
        return new ResponseEntity<Object>(response, response.getStatus());
    }

    @GetMapping("/employeeAPI/search")
    public ResponseEntity<Map<String, Object>> search(
            @RequestParam("key") String key,
            @RequestParam("value") String value,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable paging = PageRequest.of(page, size);
        Page<AccountDTO> pageEmployees;
        Map<String, Object> response = new HashMap<>();

        try {
            switch (key) {
                case "fullName":
                    pageEmployees = employeeService.findAllByFullName(value, paging);
                    break;
                case "email":
                    pageEmployees = employeeService.findAllByEmail(value, paging);
                    break;
                case "birthday":
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                    //convert String to LocalDate
                    LocalDate localDate = LocalDate.parse(value, formatter);
                    pageEmployees = employeeService.findAllByBirthday(localDate, paging);
                    break;
                case "phoneNumber":
                    pageEmployees = employeeService.findAllByPhoneNumber(value, paging);
                    break;
                case "address":
                    pageEmployees = employeeService.findAllByGender(value, paging);
                    break;

                default:
                    response.put("message", "Tìm kiếm không chính xác !");
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            if (pageEmployees == null) {
                response.put("message", "không có kết quả phù hợp !");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.put("body", pageEmployees.getContent());
            response.put("currentPage", pageEmployees.getNumber());
            response.put("totalItems", pageEmployees.getTotalElements());
            response.put("totalPages", pageEmployees.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //B-HoangLong
    @GetMapping("employee/edit-employee/{id}")
    public ResponseEntity<AccountDTO> getEmployeeEditById(@PathVariable Long id) {
        AccountDTO employee = this.accountService.findEmployeeDtoById(id);
        if (employee == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<AccountDTO>(employee, HttpStatus.OK);
    }

    //B-HoangLong
    @PutMapping("employee/delete-in-list/{id}")
    public ResponseEntity<Account> deleteEmployeeById(@PathVariable Long id) {
        Account employeeDelete = this.accountService.findEmployeeById(id);
        if (employeeDelete == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        this.accountService.deleteEmployee(employeeDelete);
        return new ResponseEntity<>(employeeDelete, HttpStatus.OK);
    }

    //B-HoangLong
    @PutMapping("employee/edit-in-list/{id}")
    public ResponseEntity<AccountDTO> updateUser(@PathVariable Long id, @RequestBody AccountDTO employeeEditDto) {
        this.accountService.editEmployee(employeeEditDto,id);
        return new ResponseEntity<AccountDTO>(employeeEditDto, HttpStatus.OK);
    }

}
