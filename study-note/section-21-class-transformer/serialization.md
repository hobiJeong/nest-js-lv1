# Serialization and ClassSerializerInterceptor

## Serialization
- **직렬화**
    - 현재 시스템에서 사용되는 (`NestJS`) 데이터의 구조를 다른 시스템에서도 쉽게 
      사용 할 수 있는 포맷으로 변환
        - `class`의 `object`에서 `JSON` 포맷으로 변환

## Deserialization
- **역직렬화**

## ClassSerializerInterceptor
* **Request**
   * `frontend` -> `backend`
        * plain object (`JSON`) -> class  instance (`dto`)
* **Response**
   * `backend` -> `frontend`
   * class instance (`dto`) -> plain object (`JSON`)
   *
   * `toClassOnly` -> class instance로 변환될때만
   * `toPlainOnly` -> plain object로 변환될때만