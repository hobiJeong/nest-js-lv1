# Encryption

## Encryption Algorithm
- bcrypt
    - 웬만하면 bcrypt 사용
    - 모든 조건을 똑같이 해서 암호화를 했을 때 항상 같은 값이 나옴
        - 암호화된 문자를 hash라고 함.
    - 일부러 속도를 느리게 만듬.
    - hash에서 원래 문자로 돌아가는건 거의 불가능함.
- md5
- sha1

### Dictionary Attack
- 간단하게 요약하면 자주 사용되는 문자들의 원본과 hash를 미리 만들어 놓고 해킹한 서버의 DB에서 일치하는 hash 값들을 찾는다.
- 미리 원본 문자열과 hash 값을 정의를 해놨기 때문에 hash가 일치하면 원본도 알 수 있다.

#### Salt
- password의 원본이 abcdefg라면 해당 문자 뒤에 특정한 값(ex: hobiJeong)을 붙이고 암호화를 함. abcdefg --> abcdefghobiJeong --> absdvdsafwaefaweasdfqe
- #### 만약 Salt도 털렸다면?
    - 여기서 Bcrypt의 알고리즘이 느린 이유가 나옴.
    - salt 값이 털리고 나면 기존에 정의 해놓았던 수많은 문자들을 다 Bcrypt로 돌려서 hash를 만들어 놔야 하는데 이 상황에서 Dictionary를 다시 만들기에는 시간이 너무 오래 걸림.
    - 그리고 실질적으로 원본 비밀번호를 확보를 할 수 있는 정도의 양을 salt와 데이터베이스를 턴 후에 다시 hash 테이블을 만들려면 정말 오랜 시간이 걸리기 때문에 사실상 불가능하다.
        - 이것이 bcrypt의 장점이자 느리게 설계한 이유
        - 원한다면 무한하게 느리게 만들 수 있음.
            - 당연히 느릴 수록 보안은 좋음
            - 물론 유저의 입장에서 느끼는 불편함과는 정비례함.
    