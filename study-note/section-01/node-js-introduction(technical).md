# nodeJS introduction(technical)

## Javascript Engine

### V8 Engine
- 크롬에서 사용
- 구글에서 제작
    - 구글 지도가 너무 복잡해서 빠른 속도를 유지하기 위해 만든 엔진
    - 속도가 좋음
- nodejs에서 채택해서 사용

### SpiderMonkey
- firefox 브라우저에서 사용

### JavaScript Core
- MacOS의 Safari에서 사용

## Compiled 언어와 Interpreted 언어

### Compiled
> 프로그램을 실행하기 전에 작성된 코드를 기계어로 `한번에` 모두 변환한 후 실행한다.
- 영어가 있으면 한번에 한국어로 번역을 해서 한국어로 된 문자를 제공

### Interpreted
> 프로그램을 실행하면서 동시에 코드를 `한줄 한줄씩` 변환해서 실행한다.
- 영어를 통역사가 읽으면서 동시에 한국어로 애기를 해줌

| Compiled  | Interpreted  |
| --------- | ------------ |
| 프로그램을 실행하기 전에 기계어(Machined Code)로 전부 변환을 한 다음 실행한다. | 프로그램을 실행하는 도중에 각 코드를 줄별로 변환해서 실행한다. |
| 기계어로 모두 변환이 된 상태에서 실행되기 때문에 실행 과정은 빠르다. | 모든 코드가 변환이 된 상태로 실행되지 않기 때문에 실행이 비교적 느리다. |
| 작성한 코드가 변경될 때마다 오랜 시간 컴파일을 해야 하는 문제가 있다. | 한번에 컴파일을 할 필요가 없기 때문에 코드 변경이 있을 때마다 매번 전체 컴파일을 할 필요가 없다. |
| 타겟 플랫폼에서 직접 컴파일을 진행한다.(Windows, MacOS 각각 Instruction set이 다르기 때문에 각각 플랫폼에서 각각 기능대로 맞게 컴파일을 해야 함.) | 코드를 실행하는 또 다른 프로그램 (Interpreter)가 존재한다. |

### Just In Time Compilation (JIT)
- JIT은 Compile 방식과 Interpret 방식의 장점을 모아둔 형태이다.
- V8 또한 JUT Compilation을 사용하고 있다.
- Compiled 언어와 Interpreted의 장점들만 뽑아서 씀

### Just In Time Compilation (JIT) V8
1. 코드 실행 환경 준비하기
2. 컴파일하기
3. 바이트코드(Byte Code) 생성
4. Interpret + 실행하기(Byte Code) - Ignition이라는 툴 사용
- 근데 이 중에서 자주 쓰는 코드를 5번으로 넘김 - Optimization(최적화) 
- Turbofan이 그 작업을 함. Turbofan이 컴파일을 하면서 Machine Code를 만들어 냄.
- 효율적으로 더 빠르게 실행할 수 있는 코드를 따로 생성을 함.
- 주로 굉장히 반복적인 코드, 자주 사용하고 변경이 잘 안되는 코드를 따로 찝어서 Machine Code로 최적화
5. Compile + 실행하기 (Machine Code) 
- 만약 최적화를 해놨는데 코드가 변경이 되거나 자주 사용하지 않을 것 같다면
- Deoptimization(최적화를 푼다)
- 다시 Byte Code로 변환하고 Interpretation으로 실행

#### Byte Code vs Machine Code
- 둘 다 Source Code. 기본적으로 사람이 직접 작성하는 코드
- 사람이 이해하는 문법이고, 기계(CPU)가 이해하는 문법이 아님.
- 그래서 이 코드를 기계가 이해할 수 있는 코드로 변환을 해줌.
- 이 두가지를 Machine Code, Byte Code로 볼 수 있다.
- **Machine Code**
    - CPU가 바로 읽고 사용할 수 있는 바이너리로 구성된 코드이다.
    - 바이트 코드보다 컴퓨터에 더 가까운 (Low Level)코드이다.
    - 실행이 매우 빠르다.
    - 컴파일이 느리다.
    - 플랫폼에 종속성이 있다.
    - 하나의 운영체제에서 실행 할 수 있는 기계어는 다른 운영체제에서 실행 할 수 없다.
- **Byte Code**
    - 바이트 코드는 CPU가 바로 읽을 수 있는 코드가 아니다. 중간에 가상환경이나 또 다른 프로그램(interpreter)이 실행을 중재한다.
    - 머신코드보단 사람과 가까운 (High Level) 코드다.
    - 실행이 상대적으로 느리다.
    - 컴파일이 빠르다.
    - 플랫폼 종속성이 없다. interpreter만 있으면 실행 가능하다.

### 왜 Javascript는 Byte Code를 사용하는가?
- Machine Code 같은 경우엔 컴파일이 느리고 실행이 빠름
- Byte Code는 컴파일이 빠르고 실행이 느림.
- 하지만 현대에는 컴퓨터가 굉장히 좋기 때문에 컴파일 속도를 희생 하더라도 속도 자체가 빠른 머신 코드를 계속 사용하면 좋지 않을까?
    - 하지만 만약 js로 10,000줄을 썼다고 얘기를 하면 Byte Code의 경우엔 80,000줄이 된다. 근데 Machine Code로 바꾸면 80,000,000줄이 된다. 그러니까 메모리가 필요한 정도가 굉장히 차이가 많이 난다.
    - 그래서 우리가 메모리의 최적화를 위해 Byte Code를 사용하는게 좀 더 유리한 부분이 굉장히 많다. 라고도 볼 수 있음.
    - 그렇기에 우린 다양한 이유로 중간에 Byte Code를 사용하게 되는 것.

### Just In Time Compilation (JIT) V8 정리
- JIT는 Interpreted 언어와 Compiled 언어의 장점을 모두 가져간다.
- Ignition을 이용해서 Interpretation을 해서 Javascript의 Dynamically Typed 특성을 살리며 컴파일 시간을 짧게 가져간다.
- Turbofan을 이용해서 자주 사용되는 코드를 Machine Code로 최적화해서 컴파일 해둔다. 해당 코드는 최적화 된 상태에서 반복적으로 사용 할 수 있다.
- 만약에 최적화가 잘못 되었거나 더이상 필요 없어지면 다시 Byte Code로 변환된다.
- 기본적으로 Interpretation을 사용해서 코드 실행을 원칙으로 하되, 자주 사용되는 코드가 있다면 머신 코드로 최적화를 해버려서 해당 코드로 실행을 할 때 효율이 올라가도록 최적화를 한다는 것.
- 다시 의미가 없으면 Byte Code로 변환해서 Interpretation을 통해 실행을 한다.

## nodeJS 싱글 쓰레드 모델 (non-blocking)

### Thread
- CPU에서 우리가 가용할 수 있는 인력 같은 것.
- CPU가 예를 들어서 8 코어다. 라고 하면 16 쓰레드 일 수도 있고 8 쓰레드 일 수도 있는데 CPU 별로 사용 할 수 있는 쓰레드가 개수가 다름.
- CPU의 쓰레드 개수는 동시에 작업할 수 있는 작업의 개수를 의미하기도 함.
- 그래서 각각의 쓰레드 별로 작업을 돌릴 수 있음.
- Spring 같은 멀티 쓰레드 모델을 채택을 하는 프레임워크들은 요청이 들어오게 되면 각각 쓰레드 별로 하나의 요청들이 배정이 돼서, 그 요청을 프로세싱하게 됨.
- nodeJS의 경우엔 가장 첫번째로 요청을 받는 컴포넌트가 Event Loop 이라는 곳.
- Event Loop은 싱글 쓰레드
- 비효율적인 것으로 보이지만 nodeJS는 굉장히 효율적으로 빠르게 작업할 수 있는 이유가 있음.

### blocking
- 데이터베이스, 네트워크 요청, fs read write처럼 시간이 오래 걸리는 요청들을 blocking 요청이라고 함.
- 반대로 non-blocking은 단순한 작업. 방금의 예제들이 아닌 작업

### non-blocking 요청의 프로세싱 과정
- 일단 요청이 들어오면 Event Queue라는 곳에 하나씩 쌓임.
- 그리고 싱글 쓰레드인 Event Loop이 Event Queue의 요청을 하나씩 뺌
- 근데 만약 이 요청이 non-blocking 요청이라면 Event Loop에서 굉장히 빠르게 처리해서 응답으로 다시 프론트엔드에 보내줌.
- 왜냐면 이걸 프로세싱을 해도 CPU가 막힐 정도로 오래 걸리지 않음.

### blocking 요청의 프로세싱 과정
- 마찬가지로 Event Queue안에 들어감.
- Event Loop이 빼옴
- 이번에는 프로세싱을 Event Loop이 직접 하려고 기다리고 있으면 Event Loop이 막힐 것 같음. 즉 Event Queue안의 작업들을 못가져 올 것 같다고 생각이 든다면
- Worker Thread(CPU의 쓰레드들을 보관하고 있는 장소)안에 있는 남는 쓰레드 중 하나한테 blocking 요청을 그냥 보내버림.
- 만약 Event Queue에서 요청이 또 오면 Event Loop은 또 가져갈 수 있음.
- 이렇게 해서 Event Loop은 계속 우리가 사용할 수 있는 상태를 유지를 해준다.
- 그러다가 만약에 Worker Thread에 맡긴 요청의 로직이 끝났다면 다시 Event Loop에서 blocking 요청을 가져오고 프로세싱이 다 됐으니까 다시 클라이언트한테 보내준다.

#### 결론은 싱글 쓰레드로 작동되는 EventLoop이 항상 막혀 있지 않도록 유지를 하는게 NodeJS의 싱글 쓰레드 모델이다.
 