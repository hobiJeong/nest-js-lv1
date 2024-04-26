# TypeORM Utility Function 

- 아닌 경우 가져오기
```typescript
where: {
    id: Not(1)
}
```
- 작은 경우 가져오기
```typescript
where: {
    id: LessThan(1)
}
```
- 작거나 같은 경우 가져오기
```typescript
where: {
    id: LessThanOrEqual(1)
}
```
- 큰 경우 가져오기
```typescript
where: {
    id: MoreThan(1)
}
```
- 큰 경우 가져오기
```typescript
where: {
    id: MoreThan(1)
}
```
- 크거나 같은 경우 가져오기
```typescript
where: {
    id: MoreThanOrEqual(1)
}
```
- 같은 경우 가져오기
```typescript
where: {
    id: Equal(1)
}
```
- 유사값 가져오기
```typescript
where: {
    name: Like('%google%'),
},
// 소문자 대문자는 구분함.
```
- 대소문자 구분 안하는 유사값 가져오기
```typescript
where: {
    name: ILike('%GOOGLE%'),
},
// 대소문자 구분 안함.
```
- 사이값 가져오기
```typescript
where: {
    id: Between(10, 15),
},
```
- 해당되는 여러개의 값
```typescript
where: {
    id: In([1, 3, 5, 7, 9]),
},
```
- null인 값 가져오기
```typescript
where: {
    id: IsNull(),
},
```