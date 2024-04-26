# SQL 기본기

## 데이터는 왜 초기화 되는가?
- 서버가 재시작이 될 때마다 원래의 모습대로 초기화 됨.
- 이에는 하드웨어적 이유가 있음.
    - 저장장치를 일반적으로 HDD와 SSD로 봄.
    - 이 크기가 얼마냐 크냐에 따라 어떤 프로그램을 설치하고 얼마나 많은 파일들을 저장할 수 있는지 결정함.
    - 그리고 여기에 조금 더 작은 사이즈의 유닛으로 나오는 RAM이 있음.
    - RAM의 경우 2의 n승으로 구성된 64GB까지 있음.
    - HDD/SSD와 램의 관계를 설명해보면
        - 우리가 코드를 작성하면 이 코드는 HDD/SSD에 저장됨.
        - 코드를 작성하면 저장을 했을 때 컴퓨터를 아무리 껏다 켜도 코드가 남아 있음.
        - HDD/SSD의 경우엔 고장이 나지 않는 이상 데이터를 저장하면 영구적으로 저장이 됨.
        - 여기서 문제는 만약 우리가 NestJS 코드를 실행하게 되면 SSD에 저장되어 있던 코드가 그대로 램으로 올라가게 됨.
        - 그리고 램에 위치해 있는 이 데이터가 실행이 돼서 NestJS서버를 실행하게 됨.
        - 그런데 램에 올라간 데이터는 프로그램이 재시작되면 리셋됨.
        - 그렇기 때문에 실행 도중에 생성된 변수들은 유지가 안된다.
        - 재실행되면 다시 SSD로부터 램으로 올리기 때문에 SSD에 저장되어 있는 그 상태 그대로만 변수를 기억할 수 있음.

## 그렇다면 RAM을 왜 사용해야 하는가?
- RAM이 훨씬 속도가 빠름.
- 그래서 속도가 비교적 느린 SSD에는 영구적으로 데이터를 저장하고
실행할 때에는 훨씬 더 데이터를 빠르게 접근할 수 있는 램에다가 데이터를 다 올리고 실행하는 것임.
- 대부분의 컴퓨터와 핸드폰은 이렇게 작용을 함.
- 그렇다면 프로그램이 종료 되더라도 데이터를 유지하려면 HDD/SSD에 데이터를 작성해야 함.
- 이를 할 수 있는 방법 중 가장 전통적이고 흔한 방법은 SQL을 사용하는 것.

## Structured Query Language(SQL)
- Table - 정보를 담는 구조
    - Column - 세로로 봄
    - Row - 가로로 봄.
    - Row 하나하나가 실제 데이터
    - Column 하나하나가 데이터의 특성별로 값들을 묶어 놓음.

### Select - 데이터 선택하기
- SELECT {column} FROM {table}

### Update - 데이터 업데이트하기
- UPDATE {table} SET {column} WHERE {condition}
    - ex) UPDATE post SET likeCount = 0 WHERE id = 3
    - WHERE을 지정해주지 않으면 모든 데이터를 바꿔버리기 때문에 주의

### Delete - 데이터 삭제하기
- DELETE FROM {table} WHERE {condition}
    - ex) DELETE FROM post WHERE author = 'newjeans_official'

### Insert - 새로운 데이터 추가하기
- INSERT INTO {table} {column1, column2, ...} VALUES {value1, value2}
- ex) INSERT INTO posts (id, author, title, content, likeCount, commentCount) VALUES (7, 'codeFactory', '코딩하는 코팩', '플러터 개발중', 999, 888)