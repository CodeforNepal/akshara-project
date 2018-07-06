import urllib
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
from urllib.parse import urlparse, parse_qs
import json

website = "http://pustakalaya.org/en/community/literatures-and-arts"
driver = webdriver.Firefox()
driver.get(website)
main_window = driver.current_window_handle
assert "E-Pustakalaya" in driver.title
driver.find_element_by_partial_link_text("Nepali Literature").click()
driver.find_element_by_id("type-document").click()
pagination = driver.find_elements_by_class_name("page-item")
page_nums = []
books = []

for p in pagination:
	url = parse_qs(p.find_element_by_tag_name('a').get_attribute("href"))
	page_num = url['http://pustakalaya.org/en/search/?page'][0]
	page_nums.append(int(page_num))
minPage, maxPage = min(page_nums), max(page_nums) + 1
for i in range(minPage, maxPage, 1):
	driver.get('http://pustakalaya.org/en/search/?page={}{}'.format(i,'&q=&form-filter={"type":["document"],"languages":[],"education_levels":[],"communities":[],"collections":["Nepali Literature [[नेपाली साहित्य]]"],"keywords":[],"license_type":[]}&searchIn=all'))
	elements = driver.find_elements_by_class_name("col-md-3.col-sm-6.col-6")
	for e in elements:
		p = e.find_element_by_class_name("book-label")
		a = p.find_element_by_tag_name('a')
		link = a.get_attribute("href")
		driver.execute_script("window.open('', 'new_window');")
		driver.switch_to.window(driver.window_handles[-1])
		driver.get(link)
		elem = driver.find_element_by_partial_link_text("Read Book")
		jbody = {"author" : "", "title": driver.find_element_by_id('det-book-title').text, "text": elem.get_attribute('href') }
		table_rows = driver.find_element_by_tag_name('table').find_elements_by_tag_name('tr')
		for tr in table_rows:
			th = tr.find_element_by_tag_name('th')
			if th.text == "Author(s):":
				jbody["author"] = tr.find_element_by_tag_name('td').text
			break
		books.append(jbody)
		driver.switch_to_window(main_window)
with open('books_to_ocr.json', 'w') as outfile:
    json.dump(books, outfile)
print(books)
assert "No results found." not in driver.page_source
driver.close()
	

