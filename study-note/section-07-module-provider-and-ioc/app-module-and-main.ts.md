# AppModule, main.ts

## AppModule
- AppModule을 보면 PostsModule을 imports하고 있음.
- PostsModule을 NestJS에서 관리를 할 수 있는 이유는
AppModule에서 PostsModule을 imports하고 있기 때문.

## main.ts
- 그래서 AppModule은 NestJS에서 어떻게 아냐?
- main.ts를 보면 bootstrap() 함수를 실행하고 있음.
- 굉장히 익숙한 코드가 보이는데 app.listen(); 코드임
- express에서도 app.listen을 통해 서버를 실행했음.
- app을 만들 때 NestFactory.create를 통해 만들고 있음.
- 그리고 해당 메서드의 인수로 AppModule이라는 레퍼런스를 넣어줌.
- 그렇기 때문에 NestJS에서는 AppModule로 부터 모듈을 확장해 나가고 이 안에 있는 Provider들을 관리하면 되겠구나 를 알 수 있는거임.
- 