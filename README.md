This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Prisma Setup with PostgreSQL using Neon

## **1. Install Prisma Client**

To get started, install Prisma Client by running:

```sh
npm i @prisma/client
```

This package allows your Node.js application to interact with the database using Prisma.

## **2. Initialize Prisma**

Initialize Prisma in your project by running:

```sh
npx prisma init
```

### **What happens behind the scenes?**

- A new `prisma/` folder is created.
- Inside this folder, a `schema.prisma` file is generated, which is where you define your database schema.
- A `.env` file is also created to store your database connection URL securely.
- This setup prepares your project to use Prisma as an ORM to interact with your database.

## **3. Define Prisma Schema**

Modify the `prisma/schema.prisma` file to define your database structure:

```prisma
// This is your Prisma schema file
// Learn more at: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  clerkId      String         @unique
  email        String         @unique
  firstname    String?        @unique
  lastname     String?        @unique
  createdAt    DateTime       @default(now())
  subscription Subscription?
  integrations Integrations[]
  automations  Automation[]
}

model Subscription {
  id         String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  User       User?             @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String?           @unique @db.Uuid
  createdAt  DateTime          @default(now())
  plan       SUBSCRIPTION_PLAN @default(FREE)
  updatedAt  DateTime          @default(now())
  customerId String?           @unique
}

// Additional models like Integrations, Automation, Dms, Post, Listener, Trigger, Keyword are also defined here.
```

## **4. Setup Neon PostgreSQL Database**

1. **Log in to ****[Neon](https://neon.tech/)**** and create a new PostgreSQL project**.
2. **Copy the database connection URL**.
3. **Save it in the ****`.env`**** file**:

```sh
DATABASE_URL="your-neon-db-url"
```

## **5. Generate Prisma Client**

After defining the schema, generate the Prisma Client to enable type-safe database queries:

```sh
npx prisma generate
```

### **What happens behind the scenes?**
- The Prisma Client is generated based on your `schema.prisma` file.
- This provides TypeScript support for database queries, ensuring type safety.
- The client enables your application to interact with the database using JavaScript/TypeScript.

## **6. Push Schema to Database**

Apply the schema changes to the PostgreSQL database by running:

```sh
npx prisma db push
```

### **What happens behind the scenes?**
- This command applies your schema changes to the actual database.
- If the tables do not exist, they are created.
- If tables already exist, it attempts to synchronize them with the latest schema.

You can now see all the tables in your Neon database.

## **7. View Database in Prisma Studio**

To visually inspect and manage your database tables, use:

```sh
npx prisma studio
```

This opens a local interface at `localhost:5555`, allowing you to view and edit records.

## **8. Setup Prisma Client in Your Project**

Inside the `lib/` folder, create a `prisma.ts` file and add the following code:

```typescript
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client
```

### **Detailed Explanation:**

- **Avoiding multiple Prisma Client instances**:
  - In development, when using Next.js or a similar framework with hot reloading, multiple instances of `PrismaClient` might be created, leading to excessive database connections.
  - The `globalThis.prisma` approach ensures that Prisma is only instantiated once.

- **Production Environment Handling**:
  - In production, hot reloading is not an issue, so we create a new `PrismaClient` instance directly.
  - This setup ensures efficiency and prevents issues related to connection limits.

## **9. Using Prisma in Your Application**

You can now query the database using Prisma Client in your application:

```typescript
import { client } from '../lib/prisma';

async function getUsers() {
  const users = await client.user.findMany();
  console.log(users);
}

getUsers();
```

### **How this works?**
- `client.user.findMany()` fetches all user records from the database.
- Prisma translates this into a SQL query and executes it.
- The results are returned as JavaScript objects that match your schema.

## **10. Summary of Commands Used**

| Step                    | Command                |
| ----------------------- | ---------------------- |
| Install Prisma          | `npm i @prisma/client` |
| Initialize Prisma       | `npx prisma init`      |
| Generate Prisma Client  | `npx prisma generate`  |
| Push Schema to Database | `npx prisma db push`   |
| Open Prisma Studio      | `npx prisma studio`    |

---

### **Conclusion**

You have successfully set up **Prisma with PostgreSQL using Neon**. This setup allows you to interact with your database efficiently with **type safety, migrations, and a visual database viewer**.
