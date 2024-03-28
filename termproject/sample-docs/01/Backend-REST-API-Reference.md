# Streaming Profiler Backend REST API Reference

### 1. object id와 content_info 가져오기

object id와 content_info 가져오기는 backend 서버의 데이터베이스에 저장되어 있는 품질 정보 세션의 object id와 content_info를 가져오는 API입니다.

웹 애플리케이션의 시작 단계에서 frontend 서버가 backend 서버의 object id와 content_info 가져오기 API를 호출하면 데이터베이스의 모든 document의 object id 값과 해당 세션의 content_info를 응답합니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
| BA01-1 | /session-info/session-list | http://tvmedia.lge.com:5000 | GET    |

---

#### Response

| Name               | Type     | Description                                  |
| ------------------ | -------- | -------------------------------------------- |
| ids                | String[] | 데이터베이스에 존재하는 document의 object id |
| contetn_info       | Object   | 해당 세션의 content_info                     |
| - content\_ date   | Date     | 컨텐츠 정보를 받은 시간                      |
| - url              | String   | 컨텐츠 주소                                  |
| - bitrate_resource | Number[] | 제공되는 bitrate 정보                        |
| - resolution       | Object[] | 컨텐츠의 width, height                       |                |
| - stream_type      | String   | 스트리밍 종류                                |
| - protocol         | String   | 비디오 스트리밍 프로토콜                     |

---

### 2. 품질 정보 저장하기

품질 정보 저장하기는 클라이언트로부터 받은 품질 정보를 지정한 스키마에 맞게 파싱한 후 데이터베이스에 저장하는 API입니다.

#### 2.1. 데이터베이스에 컨텐츠 정보 생성하기

데이터베이스에 저장 요청 받은 컨텐츠 정보인 url, bitrate_resource, resolution, stream_type, protocol을 품질 정보 스키마에 맞게 파싱하여 데이터베이스에 품질 정보 세션을 생성하고, 생성된 document의 object id를 응답합니다.

#### Request

| ID     | URL             | HOST                        | METHOD |
| ------ | --------------- | --------------------------- | ------ |
| BA02-1 | /player-session | http://tvmedia.lge.com:5000 | POST   |

---


#### Parameter

| Name             | Type     | Description                | Required |
| ---------------- | -------- | -------------------------- | -------- |
| url              | string   | 클라이언트가 실행한 영상   | FALSE    |
| bitrate_resource | Number[] | 제공되는 bitrate 정보      | FALSE    |
| resolution       | Object[] | width, height              | FALSE    |
| stream_type      | String   | 스트리밍 종류              | FALSE    |
| protocol         | String   | 비디오 스트리밍 프로토콜   | FALSE    |

---

#### Response

| Name | Type   | Description                 |
| ---- | ------ | --------------------------- |
| \_id | String | 생성한 document의 object id |

---

#### 2.2. 주기적인 정보 데이터베이스에 업데이트하기

| ID     | URL                      | HOST                        | METHOD |
| ------ | ------------------------ | --------------------------- | ------ |
| BA02-2 | /player-session/periodic | http://tvmedia.lge.com:5000 | PATCH  |

---

주기적인 정보인 \_id, download_bitrate, selected_bitrate, buffer_health 데이터를 요청 받은 backend 서버는 \_id 값으로 데이터베이스의 해당하는 document를 찾아 데이터를 필드에 맞게 추가하여 세션 정보를 업데이트합니다.

#### Parameter

| Name             | Type   | Description                                 | Required |
| ---------------- | ------ | ------------------------------------------- | -------- |
| \_id             | String | 품질 정보를 업데이트할 document의 object id | TRUE     |
| download_bitrate | Number | 한 세그먼트에서 다운로드 한 bitrate         | FALSE    |
| selected_bitrate | Number | 한 세그먼트에서 선택한 bitrate              | FALSE    |
| buffer_health    | Number | 그 시점에 버퍼에 쌓여있는 초 분량           | FALSE    |

---

#### 2.3. 버퍼링 시작 시간 정보 데이터베이스에 업데이트하기

| ID     | URL                             | HOST                        | METHOD |
| ------ | ------------------------------- | --------------------------- | ------ |
| BA02-3 | /player-session/buffering-start | http://tvmedia.lge.com:5000 | PATCH  |

---

이벤트성 정보인 buffering_start 데이터를 요청 받은 backend 서버는 \_id 값으로 데이터베이스의 해당하는 document를 찾아 데이터를 필드에 맞게 버퍼링이 시작된 시간을 추가하여 세션 정보를 업데이트합니다.

#### Parameter

| Name | Type   | Description                                 | Required |
| ---- | ------ | ------------------------------------------- | -------- |
| \_id | String | 품질 정보를 업데이트할 document의 object id | TRUE     |

---

#### 2.4. 버퍼링 종료 시간 정보 데이터베이스에 업데이트하기

| ID     | URL                           | HOST                        | METHOD |
| ------ | ----------------------------- | --------------------------- | ------ |
| BA02-4 | /player-session/buffering-end | http://tvmedia.lge.com:5000 | PATCH  |

---

이벤트성 정보인 buffering_end 데이터를 요청 받은 backend 서버는 \_id 값으로 데이터베이스의 해당하는 document를 찾아 데이터를 필드에 맞게 버퍼링이 끝난 시간을 추가하여 세션 정보를 업데이트합니다.

#### Parameter

| Name | Type   | Description                                 | Required |
| ---- | ------ | ------------------------------------------- | -------- |
| \_id | String | 품질 정보를 업데이트할 document의 object id | TRUE     |

---

#### 2.5. Startup Delay 시간 데이터베이스에 업데이트하기

| ID    | URL       | HOST | METHOD |
|--- |--- | --- | ---|
| BA02-5 | /player-session/startup-delay | http://tvmedia.lge.com:5000 | PATCH |
 ---

컨텐츠의 실행 중 한 번 생성되는 startup delay 정보를 backend 서버는 \_id 값으로 데이터베이스의 해당하는 document를 찾아 데이터를 필드에 맞게 값을 추가하여 세션 정보를 업데이트합니다.

 #### Parameter
| Name | Type   | Description                                 | Required |
| ---- | ------ | ------------------------------------------- | -------- |
| \_id | String | 품질 정보를 업데이트할 document의 object id | TRUE     |
| - startup_delay    | Number   | load시간과 play시간의 간격  | true | 

#### 2.6. 세그먼트 길이 정보 데이터베이스에 업데이트하기

| ID    | URL       | HOST | METHOD |
|--- |--- | --- | ---|
| BA02-6 | /player-session/segment-duration | http://tvmedia.lge.com:5000 | PATCH |
 ---

 주기적으로 발생하는 세그먼트 길이 정보인 segment_duration 데이터를 backend 서버는 _id 값으로 데이터베이스의 해당하는 document를 찾아 데이터를 필드에 맞게 값을 추가하여 세션 정보를 업데이트합니다.

  #### Parameter
| Name | Type   | Description                                 | Required |
| ---- | ------ | ------------------------------------------- | -------- |
| \_id | String | 품질 정보를 업데이트할 document의 object id | TRUE     |
| - segment_duration    | Number   | 세그먼트 길이  | true |
---


### 3. 품질 정보 가져오기

품질정보 가져오기는 요청 받은 품질 정보를 제공하는 api 입니다.

#### 3.1. 세션 별 정보 가져오기

| ID     | URL               | HOST                        | METHOD |
| ------ | ----------------- | --------------------------- | ------ |
| BA03-1 | /session-info/:id | http://tvmedia.lge.com:5000 | GET    |

---

세션 별 정보 가져오기는 요청 받은 세션의 품질 정보를 데이터베이스에서 가져오는 API입니다.

세션 별 정보 가져오기를 통해 backend 서버는 요청 받은 \_id 값을 가지는 데이터베이스의 document를 찾아 세션의 품질 정보를 frontend 서버에 응답합니다.

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| \_id | String | 사용자가 요청한 세션의 object id | TRUE     |

---

#### Response

| Name             | Type     | Description                        |
| ---------------- | -------- | ---------------------------------- |
| \_id             | String   | document의 고유한 object id        |
| url              | String   | 클라이언트가 실행한 영상 주소      |
| bitrate_resource | Number[] | 제공되는 bitrate 정보              |
| resolution       | Object[] | width, height                      |
| startup_delay    | Number   | loade시간과 play시간의 간격        |
| stream_type      | String   | 스트리밍 종류                      |
| protocol         | String   | 비디오 스트리밍 프로토콜           |
| download_bitrate | Number[] | 한 세그먼트에서 다운로드한 bitrate |
| selected_bitrate | Number[] | 한 세그먼트에서 선택한 bitrate     |
| buffer_health    | Number[] | 그 시점에 버퍼에 쌓여있는 초 분량  |
| buffering_start  | Number[] | 버퍼링이 시작된 시간               |
| buffering_end    | Number[] | 버퍼링이 끝난 시간                 |
| segment_duration    | Object[] | 세그먼트 길이와 세그먼트 길이 정보 발생 시간                 |

---

#### 3.2. 세션 별 품질 정보 통계 가져오기

| ID     | URL                         | HOST                        | METHOD |
| ------ | --------------------------- | --------------------------- | ------ |
| BA03-2 | /session-info/statitics/:id | http://tvmedia.lge.com:5000 | GET    |

---

세션 별 품질 정보 통계 가져오기 요청 받은 세션의 품질 정보를 데이터베이스에서 가져와 세션의 통계를 제공하는 API입니다.

세션 별 품질 정보 통계 가져오기를 통해 backend 서버는 요청 받은 \_id 값을 가지는 데이터베이스의 document를 찾아 세션의 품질 데이터로 처리한 통계 정보를 frontend 서버에 응답합니다.

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| \_id | String | 사용자가 요청한 세션의 object id | TRUE     |

---

#### Response

| Name                 | Type   | Description                            |
| -------------------- | ------ | -------------------------------------- |
| startup_delay        | Number | 한 세션의 startup_delay 정보           |
| avg_download_bitrate | Number | 한 세션 동안의 download_bitrate의 평균 |
| avg_selected_bitrate | Number | 한 세션 동안의 selected_bitrate의 평균 |
| avg_buffer_health    | Number | 한 세션 동안의 buffer_health의 평균    |
| avg_buffering_time   | Number | 한 세션 동안의 buffering_time 평균     |
| buffering_count      | Number | 한 세션 동안의 버퍼링 횟수             |

---

#### 3.3. URL 별 품질 정보 통계 가져오기

| ID     | URL                      | HOST                        | METHOD |
| ------ | ------------------------ | --------------------------- | ------ |
| BA03-3 | /url-info/statitics/:url | http://tvmedia.lge.com:5000 | GET    |

---

URL 별 품질 정보 통계 가져오기 요청 받은 세션의 품질 정보를 데이터베이스에서 가져와 세션의 통계를 제공하는 API입니다.

URL 별 품질 정보 통계 가져오기를 통해 backend 서버는 요청 받은 \_id 값을 가지는 데이터베이스의 document를 찾아 세션의 품질 데이터로 처리한 통계 정보를 frontend 서버에 응답합니다.

#### Parameter

| Name | Type   | Description              | Required |
| ---- | ------ | ------------------------ | -------- |
| url  | String | 사용자가 요청한 url 주소 | TRUE     |

---

#### Response

| Name                  | Type   | Description                                  |
| --------------------- | ------ | -------------------------------------------- |
| total_buffering_count | Number | 한 URL의 모든 세션의 버퍼링 횟수             |
| avg_download_bitrate  | Number | 한 URL의 모든 세션의 download_bitrate의 평균 |
| avg_selected_bitrate  | Number | 한 URL의 모든 세션의 selected_bitrate의 평균 |
| avg_buffer_health     | Number | 한 URL의 모든 세션의 buffer_health의 평균    |
| avg_buffering_time    | Number | 한 URL의 모든 세션의 buffering_time 평균     |
| avg_buffering_count   | Number | avg_buffering_count 버퍼링 횟수의 평균       |
| avg_startup_delay     | Number | 한 URL의 모든 세션의 startup_delay의 평균    |
| url_count | Number    | 데이터베이스에 존재하는 세션 중 해당하는 URL 개수 |
---

### 4. URL 정보 가져오기

| ID     | URL                | HOST                        | METHOD |
| ------ | ------------------ | --------------------------- | ------ |
| BA04-1 | /url-info/url-list | http://tvmedia.lge.com:5000 | GET    |

---

URL 정보 가져오기는 데이터베이스에 존재하는 모든 세션의 컨텐츠 주소인 URL을 중복 없이 가져오는 api입니다.

#### Response

| Name | Type     | Description                               |
| ---- | -------- | ----------------------------------------- |
| urls | String[] | 중복을 제거한 데이터베이스에 존재하는 URL |

---

### 5. 품질 정보 삭제하기

| ID     | URL             | HOST                        | METHOD |
| ------ | --------------- | --------------------------- | ------ |
| BA05-1 | /player-session | http://tvmedia.lge.com:5000 | DELETE |

---

품질 정보 삭제하기는 요청 받은 \_id와 일치하는 세션을 데이터베이스에서 삭제하는 API입니다.

품질 정보 삭제하기를 통해 backend 서버는 요청 받은 \_id의 품질 정보를 데이터베이스에서 삭제합니다.

#### Parameter

| Name | Type   | Description                                         | Required |
| ---- | ------ | --------------------------------------------------- | -------- |
| \_id | String | 사용자가 삭제 요청한 품질 정보 document의 object id | TRUE     |

---

