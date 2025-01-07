import { PrismaClient } from "@prisma/client";

//encapsulation
const prismaClientSingleton = () => {
  //singleton wrapper
  return new PrismaClient(); //new instance of prisma
};

//globalThis -> global context
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global; // merges the existing properties of global with the new custom type.

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
