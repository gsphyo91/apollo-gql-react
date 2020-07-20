const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // 1. brcrypt 라이브러리를 사용하여 비밀번호를 암호화
  const password = await bcrypt.hash(args.password, 10);

  // 2. prisma 클라이언트를 사용하여 데이터베이스에 새로운 User를 저장
  const user = await context.prisma.createUser({...args, password });

  // 3. APP_SECRET 값으로 서명된 JWT를 생성
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4. GraphQL 스키마에 정의된 AuthPayload 객체 형태에 부합하도록 token과 user를 포함하는 객체를 반환
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1. prisma 클라이언트를 사용하여 기존의 User 레코드를 검색하여 반환
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2. 제공된 비밀번호와 데이터베이스에 저장된 비밀번호 비교
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3.token과 user를 반환
  return {
    token,
    user,
  };
}

function createLink(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

module.exports = {
  signup,
  login,
  createLink
};