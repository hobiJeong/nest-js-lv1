# TypeORM Common Method
- 내가 모르는 것들만

## preload
- 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
- 저장하지는 않음
```typescript
const user = await this.repository.preload({
    id: 1,
    email: 'abc@naver.com'
})

// user - id: 1, email: 'abc@naver.com'
// 실제 db값 - id: 1, email: 'fake@naver.com'
```

## sum
- 전부 다 더함.
```typescript
const sum = await this.repository.sum('count', {
    email: ILike('%naver%'),
})

// 어떤 프로퍼티를 합칠건지, 어떤 경우에 해당 프로퍼티를 합칠건지 넘김
```

## average
- 평균
```typescript
const average = await this.repository.average('count', {
    id: LessThan(4),
})
```

## minimum, maximum
- 인수로 주는 값은 같음.
- 단순 주어진 조건들의 로우중에서 첫번째 파라미터에서 받은 컬럼의 최소값을 구함.