# Adaptive Streaming Player의 시청 품질 서비스 TEST Plan

## Backend Unit Test Cases
backend api의 검증은 postman을 활용한 unit test를 사용하고, postman의 command line Collection Runner인 newman을 사용하여 자동 검증을 실행한다.

API   | Test Name |  TEST Case ID  | Description | Test Data
---     |   --- |   --- | ---   | ---
/create_info    | 데이터베이스에 컨텐츠 정보 생성하기 | TC01-1   |  Status code is 200: api의 response의 status 코드가 200이면 pass한다. | {"url": "lge.com", "bitrate_resource": [32,3],"resolution": [3,2],"startup_delay": 2}
/create_info   | 데이터베이스에 컨텐츠 정보 생성하기-데이터 입력 오류 | TC01-2   |  <li>Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>api의 response값의 각 필드의 데이터 타입이 올바르면 pass한다.</li><li>api의 response의 각 필드의 값이 지정해둔 에러 문구와 같으면 pass한다.</li> | {"url": "lge.com", "bitrate_resource": "lg","resolution": 2,"startup_delay": 2}
/session_ids_infos | object id와 content_info 가져오기 | TC02-1  | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li> Test data type of the response: api의 response 데이터 type이 배열이고, response의 각 원소의 필드의 데이터 타입이 올바르면 pass한다.</li><li> response의 각 원소중 데이터 타입이 배열인 필드의 각 값이 모두 올바르면 pass한다.</li> | 
/session_info/:id | 세션 별 정보 가져오기 | TC03-1 | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>Validate data type of response: api의 response의 데이터 타입이 array이고, 데이터의 _id 필드의 데이터 타입이 string이면 pass한다.</li><li>validate data type of content info: 데이터의 content_info 필드의 세부 필드 값들의 데이터 타입이 올바르면 pass한다. </li><li>validate data type of periodic info: periodic_info 필드의 세부 필드 값들의 데이터 타입이 올바르면 pass한다.</li><li>validate data type of buffer start info: buffer_start 필드의 데이터 타입이 배열이고 각 원소의 타입이 모두 string이면 pass한다.</li><li>validate data type of buffer end info: buffer_end 필드의 데이터 타입이 배열이고 각 원소의 타입이 모두 string이면 pass한다.</li> | {"_id": 600665e3731e554ac81a3de1}
/session_info/url_statistics | URL 별 품질 정보 통계 가져오기 | TC04-1 | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>validate data type of JSON: api의 response값이 객체이면 pass한다.</li><li>validate data type of info: response값의 필드들의 데이터 타입이 올바르면 pass한다.</li> | {"url": "lge.com"}
/update/periodic | 주기적인 정보 데이터베이스에 업데이트하기 | TC05-1    | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li> | { "_id": "600665e3731e554ac81a3de1","download_bitrate": 33,"selected_bitrate": 23, "buffer_health": 3}
/update/periodic | 주기적인 정보 데이터베이스에 업데이트하기-데이터 입력 오류  | TC05-2 | <li>Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>api의 response값의 각 필드의 데이터 타입이 올바르면 pass한다.</li><li>api의 response의 각 필드의 값이 지정해둔 에러 문구와 같으면 pass한다.</li> | { "_id": "600665e3731e554ac81a3de1","download_bitrate": [33,3],"selected_bitrate": 23, "buffer_health": 3}
/update/event/buffer_end | 버퍼링 종료 시간 정보 데이터베이스에 업데이트하기 | TC06-1    | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li> | {"_id": "600665e3731e554ac81a3de1"}
/update/event/buffer_end | 버퍼링 종료 시간 정보 데이터베이스에 업데이트하기-데이터 입력 오류  | TC06-2 | <li>Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>api의 response값의 각 필드의 데이터 타입이 올바르면 pass한다.</li><li>api의 response의 각 필드의 값이 지정해둔 에러 문구와 같으면 pass한다.</li> | {"_id": 600665e3731e554ac81a3de1}
/update/event/buffer_start | 버퍼링 시작 시간 정보 데이터베이스에 업데이트하기 | TC07-1    | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li> | {"_id": "600665e3731e554ac81a3de1"}
/update/event/buffer_start | 버퍼링 시작 시간 정보 데이터베이스에 업데이트하기-데이터 입력 오류  | TC07-2 | <li>Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>api의 response값의 각 필드의 데이터 타입이 올바르면 pass한다.</li><li>api의 response의 각 필드의 값이 지정해둔 에러 문구와 같으면 pass한다.</li> | {"_id": 600665e3731e554ac81a3de1}
/session_url | URL 정보 가져오기 | TC08-1 | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>validate data type of response: api의 response의 데이터 타입이 array이면 pass한다.</li><li>validate data type of index: api의 response인 배열의 모든 값이 string이면 pass한다.</li> | 
/delete | 품질 정보 삭제하기| TC09-1 |<li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li> | {"_id":"600791e4d5ebe47e23e02b06"}
/session_info/id_statistics/:id | 세션 별 품질 정보 통계 가져오기 | TC10-1 | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>validate data type of JSON: api의 response값이 객체이면 pass한다.</li><li>validate data type of info: response값의 필드들의 데이터 타입이 올바르면 pass한다.</li> | {"_id": "600665e3731e554ac81a3de1"}

## Frontend System Test Cases
Frontend의 사용자 interaction과 view는 use case를 기반으로한 system test를 한다.

### 1. 세션 목록 조회하기
Test Case ID: TC11-1

Test Step  | Test Data | Expected Result
--- |   --- |   ---
사용자가 시스템에 접속한다. |  http://tvmedia.lge.com:3000  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 session 목록 보기 탭을 클릭한다. | 　  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
----

### 2. 세션 별 품질 정보 조회하기
Test Case ID: TC12-1

Test Step  | Test Data | Expected Result
--- |   --- |   ---
사용자가 시스템에 접속한다. |  http://tvmedia.lge.com:3000  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 session 목록 보기 탭을 클릭한다.  | 　  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 특정 세션을 클릭한다. |  　 |   <li> 세션의 품질 정보의 차트가 화면에 출력된다.</li><li> 세션의 품질 통계 정보가 화면에 출력된다.</li>
----

### 3. URL 목록 조회하기
Test Case ID: TC13-1

Test Step  | Test Data | Expected Result
--- |   --- |   ---
사용자가 시스템에 접속한다. |  http://tvmedia.lge.com:3000  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 URL 별 목록 보기 탭을 클릭한다. |  　 |    데이터베이스에 존재하는 url을 중복 없이 화면에 출력된다.
----

### 4. URL 별 통계 정보 조회하기
Test Case ID: TC14-1

Test Step  | Test Data | Expected Result
--- |   --- |   ---
사용자가 시스템에 접속한다. |  http://tvmedia.lge.com:3000  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 URL 별 목록 보기 탭을 클릭한다. |  　 |    데이터베이스에 존재하는 url을 중복 없이 화면에 출력된다.
사용자가 특정 url을 클릭한다. |  　 |    해당하는 모든 url의 품질 정보 통계 데이터가 화면에 출력된다.
----

### 5. 세션 목록 삭제하기
Test Case ID: TC15-1

Test Step  | Test Data | Expected Result
--- |   --- |   ---
사용자가 시스템에 접속한다. |  http://tvmedia.lge.com:3000  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 session 목록 보기 탭을 클릭한다.  | 　  |   세션 ID와 content_info 필드 값이 화면에 출력된다.
사용자가 특정 세션의 체크박스를 클릭하고 삭제 버튼을 누른다. | 　  |    선택한 세션이 삭제된 세션 목록이 화면에 출력된다.
----