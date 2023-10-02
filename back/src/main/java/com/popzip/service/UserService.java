package com.popzip.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.popzip.dto.UserDTO;
import com.popzip.entity.Role;
import com.popzip.entity.User;
import com.popzip.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    
  @Transactional
  public User signup(User user) {
      if (userRepository.findByUserId(user.getUserId()) != null) {
          throw new RuntimeException("이미 가입된 유저입니다.");
      }

      User nUser = User.builder()
              .userId(user.getUserId())
              .uPassword(passwordEncoder.encode(user.getUPassword()))
              .userName(user.getUserName())
              .email(user.getEmail())
              .role(Role.ROLE_USER)
              .build();

      userRepository.save(nUser);

      return nUser;
  }
    
    
//    @Transactional
//    public UserDTO signup(User user) {
//        if (userRepository.findByUserId(user.getUserId()) != null) {
//            return null;
//        }
//        User nUser = User.builder()
//                .userId(user.getUserId())
//                .uPassword(passwordEncoder.encode(user.getUPassword()))
//                .userName(user.getUserName())
//                .email(user.getEmail())
//                .role(Role.ROLE_USER)
//                .build();
//        
//        userRepository.save(nUser);
//
//        UserDTO rUser = UserDTO.builder()
//                .userId(nUser.getUserId())
//                .userName(nUser.getUserName())
//                .email(nUser.getEmail())
//                .role(nUser.getRole())
//                .build();
//
//        return rUser;
//    }
    
    @Transactional
    public UserDTO adminSignup(User user) {
        if (userRepository.findByUserId(user.getUserId()) != null) {
        	return null;
        }

        user.setUPassword(passwordEncoder.encode(user.getUPassword()));
        User sUser = userRepository.save(user);
        
        UserDTO rUser = UserDTO.builder()
        		.id(sUser.getId())
                .userId(sUser.getUserId())
                .userName(sUser.getUserName())
                .email(sUser.getEmail())
                .role(sUser.getRole())
                .build();

        return rUser;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    public UserDTO findByEmail(String email) {
    	User user = userRepository.findByEmail(email);
		 UserDTO nUser = UserDTO.builder()
	             .userId(user.getUserId())
	             .userName(user.getUserName())
	             .email(user.getEmail())
	             .role(Role.ROLE_USER)
	             .build();
    	
        return nUser;
    }
}