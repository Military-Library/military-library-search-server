# military-library-search-server
국방 전자도서관 API 검색 서버


## > Feature

### 1. Update book list

국방 API와 현재 서버의 DB에 저장된 책을 동기화 하기 위한 URL

```
request:

GET /init/check

response:

{"result" : "success", "message" : "새로운 책이 없습니다."}

OR

{"result" : "processing", "message" : "새로운 책을 등록 중 입니다."}

```

### 2. Search

서버로부터 책을 검색하기 위한 URL

```
request:

GET /api/search?title=한국

response:

type: json
```

요청 파라미터 목록

```
title : 책 제목 (필수, 2글자 이상)
```

### 3. Random List

서버로부터 랜덤한 책 목록을 가져오기 위한 URL

```
request:

GET /api/random?cnt=10

response:

type: json
```

요청 파라미터 목록

```
cnt : 책 목록 개수 (선택, defalut = 20, max = 20)
```
