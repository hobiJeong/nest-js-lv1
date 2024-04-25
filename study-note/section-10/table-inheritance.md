# Table Inheritance

## 예시코드 1 (Inheritance)
```typescript
export class BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class StudentModel extends BaseModel {
    @Column()
    name: string;
}

// 위 같이 하면 student_model 이라는 테이블이 생성됨.
// 내부 값은 id: integer, name: varchar, createdAt: timestamp, updatedAt: timestamp 같이 생성이 될것임.
```

## 예시코드 2 (Single Table Inheritance)
```typescript
@Entity()
@TableInheritance({
    column: {
        name: 'type',
        type: 'varchar',
    }
})
export class SingleBaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity()
export class StudentModel extends SingleBaseModel {
    @Column()
    name: string;
}

@ChildEntity()
export class TeacherModel extends SingleBaseModel {
    @Column()
    role: string;
}

// 위 같이 하면 single_base_model이 생성됨.
// 내부의 값은 id: integer, name: varchar, role: varchar, type: varchar, createdAt: timestamp, updatedAt: timestamp로 하나의 테이블에 모든 컬럼이 생성됨.
// 하나의 테이블에서 모든 엔티티를 관리.
// Student, Teacher 둘 중 어떤 모델에 생성된 값인지에 대한 구분은 type 컬럼을 통해 구분할 수 있음.
```
- 이 정도 차이이다.