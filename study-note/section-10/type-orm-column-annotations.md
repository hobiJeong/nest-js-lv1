# TypeORM Column Annotations
- 내가 모르던 것들만 적는다.

## VersionColumn
- 데이터가 업데이트 될 때마다 1씩 증가한다.
- 처음 생성되면 값은 1이다.
- 업데이트가 몇번 됐는지, 버전이 몇인지 트래킹 할 수 있는 컬럼.
- 정확히는 save() 함수가 몇번 불렸는지 기억한다.

## Generated
- Column 데코레이터와 함께 씀
- 파라미터로 increment, uuid 등등을 넣어줄 수 있음.
- 해당하는 strategy에 맞춰서 자동으로 값을 생성해줌.

## Column
- Column 데코레이터의 옵션중에서 update
    - boolean값을 받음.
    - true를 하면 값을 처음 생성할 때만 할당 가능함.
        -  즉, 값 업데이트가 불가능
- Column 데코레이터의 옵션중에서 select
    - false를 주면 
    - ```typescript
        const temp: { id: number, title: string } = this.repository.find();

        // temp: [ { id: 1 }, { id: 2 } ]
        ```
    - 위 처럼 기본적으로 title은 빼고 select