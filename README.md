## 보안 적용 라이브러리
```
1. const helmet = require('helmet');
    1-1. npm i helmet
2. const hpp = require('hpp');
    2-1. npm i hpp
3. sanitize-html
    3-1. npm i sanitize-html
    3-2. 허용되지 않은 html 입력을 막음
    3-3. <script> 같은 문자열이 빈 문자열로 치환
4. csurf (CSRF 방어)
    4-1. npm i csurf
    4-2. csrfToken을 생성해서 프론트로 보내주고(쿠키)
    4-3. Form 등록 시 csrfToken을 같이 받아 일치하는지 비교
```

## pm2 
```
1. 서버가 에러로 인해 꺼졌을 때 서버를 다시 켜 줌
2. 멀티 프로세싱 지원(노드 프로세스 수를 1개 이상으로 늘릴 수 있음) - 클러스터링
3. 요청을 프로세스들에 고르게 분배

- 단점 : 프로세스 간 서버의 메모리같은 자원 공유 불가 (멀티 프로세싱 문제)
- 해결 : memcached , redis 같은 메모리 DB사용 (공유 메모리를 별도 DB에 저장) - 여러 프로세스에서 구동 시 로그인 정보 공유 등..
```

## winston
```
1. console.log, console.error 는 휘발성
2. 로그를 파일로 기록해줌
3. 윈스턴 설치 후 logger.js 작성
4. .winston-daily-rotete-file 패키지로 날짜별 관리가능

npm i winston

-- 클라우드 사용 시에는 로그를 알아서 저장해줌 --
```

## redis
```
npm i redis connect-redis

```