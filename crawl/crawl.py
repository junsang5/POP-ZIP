##############ENVIRONMENT################
INSTA_ID = 'id'
INSTA_PASSWORD = 'pw'
STATUS = 'dev'
#STATUS = 'service'
SERVER_URL = 'server-url'
if(SERVER_URL==''):
    SERVER_URL = 'http://localhost:8080'
API_KEY = 'api-key'
##############CHECK IT FIRST################




# import fundamental
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from time import sleep
from bs4 import BeautifulSoup
import requests
import re
import os
import time
import pandas as pd


# loading drive
df = pd.DataFrame(columns=['idx','star','review'])

URL = "https://google.com"
service = Service(executable_path=r'/usr/yoonjinwon/desktop/popzip-app/crawl')
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
#options.add_argument("--headless")
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=options)


# open insta
wait = WebDriverWait(driver, 5)
driver.set_window_size(800, 800)
driver.get('https://www.instagram.com/')
driver.implicitly_wait(2)


#function: gpt api
from openai import OpenAI
import json
import requests

def gpt(prompt):
    client = OpenAI(
        api_key=API_KEY,
    )
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant designed to output JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="gpt-3.5-turbo",
    )
    return response

#function: insta macro
    
def find_following(i):
    account = driver.find_element(By.CSS_SELECTOR, '._aano > div > div > div:nth-child(%d)'%i).text
    following = account.split('\n')
    return following
    
def go_next(driver):
    right = driver.find_element(By.CSS_SELECTOR, 'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div:nth-child(1) > div > div > div > button > div > span > svg')
    right.click()

#popup crawl using gpt
def popup_crawl(account, driver):
    url = f'https://instagram.com/{account}'
    driver.get(url)
    driver.implicitly_wait(5)
    time.sleep(2)
    firstBoard = driver.find_element(By.CSS_SELECTOR, 'div._aagw')
    firstBoard.click()
    driver.implicitly_wait(5)
    time.sleep(2)
    text = driver.find_element(By.CSS_SELECTOR, 'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe.x1qjc9v5.xjbqb8w.x1lcm9me.x1yr5g0i.xrt01vj.x10y3i5r.xr1yuqi.xkrivgy.x4ii5y1.x1gryazu.x15h9jz8.x47corl.xh8yej3.xir0mxb.x1juhsu6 > div > article > div > div._ae65 > div > div > div._ae2s._ae3v._ae3w > div._ae5q._akdn._ae5r._ae5s > ul > div.x1qjc9v5.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xk390pu.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.xggy1nq.x11njtxf > li > div > div > div._a9zr').text
    if any(keyword in text.lower() for keyword in ['팝업', '쇼룸', 'popup', 'pop-up', 'pop up', 'pop - up']):
        prompt = text + '''//
        {

    private String address;
    private String latitude;
    private String longitude;
    private String name;
    private String brand;
    private String description;
    private Date start_date;
    private Date end_date;
    }
        형식으로 나타내줘. 시간과 날짜는 현재 날짜 기준으로 Date형식으로 나타내줘. latitude와 longitude는 address에서 도로명 주소나 지번주소 뽑아서 넣어줘.
    '''

        image = driver.find_element(By.CSS_SELECTOR, '._aagv > img')
        image_url = image.get_attribute('src')
        
        try:
            response = gpt(prompt)
            popup = json.loads(response.choices[0].message.content)
            popup['imageUrl'] = image_url
            popup['description'] = popup['description'].replace("\n", " ")
            return popup
        except:
            print('gpt api error')

    else:
        print("The text does not contain any keyword related to popup or showroom.")


    


def main():
    #login
    driver.get('https://www.instagram.com/')
    id_box = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(1) > div > label > input")
    password_box = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(2) > div > label > input")
    login_button = driver.find_element(By.CSS_SELECTOR, '#loginForm > div > div:nth-child(3) > button')
    act = ActionChains(driver)
    act.send_keys_to_element(id_box, INSTA_ID).send_keys_to_element(password_box, INSTA_PASSWORD).click(login_button).perform()
    time.sleep(3)

    #closing notice popup
    notice = driver.find_element(By.CSS_SELECTOR, '._ac8f')
    notice.click()

    #move on popup achieving account(ours, id is popzip__)
    driver.get('https://www.instagram.com/popzip__/')
    driver.implicitly_wait(5)
    time.sleep(2)

    #read following nums
    num_following = int(driver.find_element(By.CSS_SELECTOR, '.x1porb0y > div:nth-child(2) > section > main > div > header > section > ul > li:nth-child(3) > a > span' ).text)
    print(f'number of following accounts: {num_following}')

    #move on following list
    driver.get('https://www.instagram.com/popzip__/following/')
    following_list = []
    driver.implicitly_wait(5)
    time.sleep(5)

    #scroll to end of following list
    before_height = -1
    now_height = -2
    try:
        while before_height != now_height:
            before_height = now_height
            now_height = driver.execute_script("return document.querySelector('._aano').scrollTop;")

            driver.execute_script("document.querySelector('._aano').scrollTo(0, document.querySelector('._aano').scrollHeight)")
            time.sleep(3)

        print('following scroll end')

    except:
        print('scroll error')

    for i in range(1, num_following):
        try:
            name = find_following(i)
            following_list.append(name)
        except:
            print('all following')
            break

    #popup crawl
    popup_event_list = []
    for account in following_list:
        try:
            popup_event = popup_crawl(account[0], driver)
            if(popup_event):
                print(popup_event)
                popup_event_list.append(popup_event)
        except:
            print('crawling error')
    driver.close()

    #request save to backend server


    for popup in popup_event_list:
        try:
            requests.post(SERVER_URL+'/popup/enterNew', json = popup)
            
            response = {"success": True, "msg": "update success"}
        except:
            response = {"success": False, "msg": "update error"}
        finally:
            print(response)

import schedule
if(STATUS == 'service'):
    schedule.every().day.at("04:00").do(main())
elif(STATUS == 'dev'):
    main()
else:
    raise Exception("wrong status, check STATUS of ENVIRONMENT")
