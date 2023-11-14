package com.popzip.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.popzip.entity.User;
import com.popzip.mapper.CommonMapper;
import com.popzip.repository.UserRepository;

@Service
public class kaistDemoApiService {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	CommonMapper mapper; 

	public List<User> getUser() {
		return userRepo.findAll();
	}
	
	// 서비스에서 Repository 로 연결
	public List<User> findByUserName(String userName) {
		return userRepo.findByUserName(userName);
	}
	
	// 서비스에서 Repository 로 연결
	public Page<User> findByEmail(HashMap<String, Object> HParam) {
		int page = Integer.parseInt(HParam.get("page").toString());
		int size = Integer.parseInt(HParam.get("size").toString());
		String email = HParam.get("email").toString();
		
		PageRequest pageRequest = PageRequest.of(page, size);
		
		return userRepo.findByEmail(email, pageRequest);
	}
	
	public List<HashMap<String, Object>> findByUser(HashMap<String, Object> HParam) {
		return mapper.findByUserList(HParam);
	}
	
	
	
}
