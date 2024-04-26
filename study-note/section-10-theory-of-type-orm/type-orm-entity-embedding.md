# TypeORM Entity Embedding
- 예시코드
  ```typescript
  export class Name {
    @Column()
    first: string;

    @Column()
    last: string;
  }

  @Entity()
  export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name)
    name: Name;

    @CreateDateColumn()
    createdAt: Date;
  }

  @Entity()
  export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name)
    name: Name;

    @CreateDateColumn()
    createdAt: Date;
  }
  ```
- 이렇게 중복되는 칼럼을 간단하게 처리해줄 수 있음.
- 실제 db 상에 생성되는 컬럼은 name + first / last로 nameFirst, nameLast가 생성됨.
- 근데 그냥 extends가 더 나은듯.