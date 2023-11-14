package com.popzip.controller;

import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popzip.dto.UserDTO;
import com.popzip.entity.User;
import com.popzip.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;
    
    
    @PostMapping("signup") // 사용자 회원가입 
    public User signup(@RequestBody User user) {
		return userService.signup(user);
    }
    

//    @PostMapping("signup")
//    public ResponseEntity<Message> signup(@RequestBody User user) {
//    	
//    	
//    	UserDTO ud = userService.signup(user);
//		Message message = new Message();
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//		if(null != ud) {
//			message.setStatus(StatusEnum.OK);
//			message.setMessage("정상적으로 처리되었습니다.");
//			message.setData(ud);
//		}else {
//			message.setStatus(StatusEnum.INTERNAL_SERER_ERROR);
//			message.setMessage("오류가 발생하였습니다.");
//			message.setData(ud);
//		}
//		
//		return new ResponseEntity<>(message, headers, HttpStatus.OK);
//    }
    
    @PostMapping("/admin/signup") //관리자 회원 가입 
    public UserDTO adminSignup(@RequestBody User user) {
        return userService.adminSignup(user);
    }


    @GetMapping("/users/{userId}") // 특정 사용자 정보 조회 
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public Optional<User> getUserInfo(@PathVariable Long userId) {
        return userService.findById(userId);
    }
    
    @GetMapping("/users/all/{userId}") //특정 사용자, 관리자 정보 조회 
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public Optional<User> getUserInfoAll(@PathVariable Long userId) {
        return userService.findById(userId);
    }
    
    @GetMapping("/users/admin/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public Optional<User> getUserInfoAdmin(@PathVariable Long userId) {
        return userService.findById(userId);
    }
    
    @GetMapping("/users/all/dto/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public UserDTO getUserInfoAllDto(@PathVariable String userId) {
        return userService.findByEmail(userId);
    }
    
    
}