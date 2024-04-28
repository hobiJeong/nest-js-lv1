# Pipe Introduction And Try ParseIntPipe

## Pipes
- Pipe는 class
- Injectable 데코레이션 되어 있음.
- PipeTransform interface를 implements
    - OOP에서 implements

### Pipes use cases
- transformation: e.g.,string to integer 
- validation: 입력된 데이터가 유효한 데이터인지 확인한다. 유효한 데이터라면 그대로 전달을 해주고 아니면 에러를 던진다.

### Built-in pipes
- ValidationPipe
- ParseIntPipe
    - int로 변형 및 검증
- ParseFloatPipe
    - float로 변형 및 검증
- 그 외 공식문서 참조...