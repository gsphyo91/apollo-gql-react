# Apollo, GraphQL Tutorials

## Client (React + Apollo + GraphQL)

[참고문서](https://velog.io/@cadenzah/graphql-apollo-02-getting-started)

```bash
create-react-app apollo-gql-tutorials
npm install --save apollo-boost react-apollo graphql
```

- `apollo-client` : Apollo 클라이언트를 다루는 데에 필요한 패키지들을 한 번에 설치
  - `apollo-client`
  - `apollo-cache-inmemory`
  - `apollo-link-http`
  - `apollo-link-error`
  - `apollo-link-state`
  - `graphql-tag`
- `react-apollo` : Apollo 클라이언트를 React에서 사용하기 위한 바인딩 제공
- `graphql` : Facebook이 작성한 GraphQL의 참조 구현

## Server (Node.js + GraphQL)

[참고문서](https://velog.io/@cadenzah/graphql-node-01-introduction)

```bash
npm install --save graphql-yoga
```

- `graphql-yoga`
- Express.js와 기타 라이브러리들을 기반으로 개발되었으며, 바로 배포가 가능한 정도의 GraphQL 서버를 만들 수 있도록 해준다.
- 제공하는 기능
  - GraphQl 명세의 준수
  - 파일 업로드 지원
  - GraphQL 구독을 사용한 실시간 기능
  - TypeScript 지원
  - GraphQL Playground를 훌륭하게 지원
  - Express 미들웨어를 통한 확장성
  - GraphQL 스키마에서 별도로 정의한 지시자(Directive)를 리졸브
  - 쿼리 성능 추적
  - `application/json`과 `application/graphql`의 Content-type을 모두 허용
  - `now`, `up`, AWS Lambda, Heroku 등 다양한 서비스에서 작동

### Prisma

Prisma는 쿼리 리졸빙을 처리해주는 편리한 데이터 접근 계층을 제공한다.

Prisma를 사용하면, 서버로 들어온 쿼리를 Prisma에 전달하고, Prisma는 이를 받아 실제 데이터베이스에 맞추어 쿼리를 리졸브하는 식으로 리졸버를 구현하게 된다.

Prisma 서버는 어플리케이션 구조 상에 데이터 접근 계층을 제공하여 API 서버가 Prisma를 거쳐서 데이터베이스와 상호작용하기 쉽게 만들어준다. Prisma 서버의 API는 `graphql-yoga` 서버 내에서 작동하는 Prisma Client가 사용하게 된다.

`prisma.yml`은 Prisma 설정에 사용되는 주요 구성파일이다. `datamodel.prisma`는 데이터 모델의 정의를 포함하고 있다.

```bash
# Prisma CLI 전역 설치
yarn global add prisma

# pwd : server/
prisma deploy
# 회원가입 및 Region 선택

cd ./prisma

# Prisma Client 생성
prisma generate
```

### Prisma 클라이언트를 context에 추가하기

```bash
yarn add prisma-client-lib
npm install prisma-client-lib
```
