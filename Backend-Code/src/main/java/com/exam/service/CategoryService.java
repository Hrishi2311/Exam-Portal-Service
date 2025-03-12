package com.exam.service;

import java.util.Set;

import com.exam.entities.exam.Category;

public interface CategoryService {
	
	
	public Category addCategory(Category category);

	public Category updateCategory(Category category);
	
	public Set<Category> getCategories();
	
	public Category getCategory(Long CategoryID);
	
	public void deleteCategory(Long CategoryID);

	//public Set<Category> getCategoriesSortedByName();
	


}
