package com.popzip.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommonMapper {
	public List<HashMap<String, Object>> findByUserList(HashMap<String, Object> Hparam);
	
	public List<HashMap<String, Object>> findByMyCommunity(HashMap<String, Long> map);
	
	public List<HashMap<String, Object>> findByCommunityBoard(HashMap<String, Object> map);
	
	public List<HashMap<String, Object>> findByBoardComment(HashMap<String, Object> map);
	
	
}
