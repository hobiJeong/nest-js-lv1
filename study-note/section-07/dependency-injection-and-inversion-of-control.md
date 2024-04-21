# Dependency Injection / Inversion of Control

## 일반 인스턴스화
```typescript
class A {
    const b = B();
}

class B {

}
```

## Dependency Injection
```typescript
class A {
    constructor(instance: B)
}

class B {

}
```
- 기존에는 클래스 B를 클래스 A에서 생성했음.
- 하지만 이 경우엔 어디에선가 생성해서 constructor에서 입력을 해줌.
    - 이것을 주입이라고 한다.
- 외부에서 class A가 생성될 때 무조건 class B의 인스턴스를 넣어 주는 것이다.
- Dependency는 의존성.
- 클래스 A를 사용할 때 class B의 인스턴스가 필요함.
- 그래서 클래스 A는 클래스 B에 의존하고 있다. 고 할 수 있음.
- 이걸 풀어서 얘기하면 의존하고 있는 값을 우리가 주입해준다.
    - 이것의 Dependency Injection의 가장 큰 중요 포인트.

## Inversion of Control
- Dependency Injection의 일종이라고 볼 수도 있음.
- 대충 역제어 라는 뜻인데 무엇을 역제어하냐.
```typescript
class B {

}

class A {
    constructor(instance: B)
}

class C {
    constructor(instance: B)
}
```

- 원래는 class A, C가 둘 다 class B에 의존성이 있다. 라고 하면 class B를 직접 생성을 해서 주입을 시켜줌.
- 근데 Inversion of Control의 경우엔 해당 class B를 의존하고 있는 클래스들의 인스턴스를 생성하고 삭제하고 주입을 해주는 과정을 프레임워크가 직접 담당함.
- Inversion of Control and Dependency Injection
- NestJS IoC Container
   ```typescript
    instance b {
        class B {}
        new B()
    }

    instance c {
        class C {}
        new C()
    }
    ```
- Application Code
    ```typescript
    class A {
        constructor(instance: B)
    }

    class C {
        constructor(instance: B)
    }
    ```
- 지금 A, C 클래스에선 B라는 클래스를 사용해야 함.
- 그러면 이걸 보고 IoC컨테이너에서 클래스 B를 사용해서
- new B()로 인스턴스를 생성함.
- IoC컨테이너 안에서 이 인스턴스를 그대로 들고 있음.
- 그리고 Instance B의 lifecycle을 알아서 제어함.
- 그리고 class A 내부에서 B의 인스턴스가 필요한 상황이 있을 때마다
IoC 컨테이너가 자동으로 생성된 인스턴스를 주입을 해줌.
- 그래서 개발자는 의존성(Dependency)이 있는 것들의 생성과 폐기를 전혀
신경 쓸 필요 없이 기능에만 집중할 수 있도록 NestJS가 설계되어 있음.
- 그 외에도 직접 우리가 인스턴스를 생성하는 과정이 없기 때문에
테스트 과정이 굉장히 편해짐.
- 주입 받을 수 있는 클래스들을 NestJS에서는 Provider라고 얘기함.