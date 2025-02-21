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




Here's a detailed breakdown of how everything works internally, so you won't need to look elsewhere.

---

# **React Query & Optimistic UI: Complete Internal Working**

## **1. Introduction**
### **What is React Query?**
React Query is a data-fetching and state management library for React applications. It handles:
- **Caching:** Stores API responses in memory.
- **Data Synchronization:** Keeps UI updated with the latest server data.
- **Background Fetching:** Fetches fresh data while using cached data instantly.

### **What is Optimistic UI?**
Optimistic UI updates the UI **before** the server confirms the request. This makes the application feel faster because:
- The user **sees changes instantly** instead of waiting for a response.
- If the request **fails**, the UI is **reverted back** to the previous state.

---

## **2. Setting Up React Query**
### **Installing React Query**
Run the following command:
```sh
npm i @tanstack/react-query
```

### **Setting Up the Query Provider**
Before using React Query, we need to **wrap the entire app** with the `QueryClientProvider`.

#### **Code: `ReactQueryProvider.tsx`**
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient();

const ReactQueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
```

### **How It Works Internally:**
1. `QueryClient` is created to **store cached API responses**.
2. `QueryClientProvider` provides access to the cache.
3. **Any component inside this provider** can now use React Query hooks.

---

## **3. Fetching Data Using React Query**
### **Query Hook: Fetch Automations**
```tsx
import { getAllAutomations } from "@/actions/automations";
import { useQuery } from "@tanstack/react-query";

export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ["user-automations"],
    queryFn: getAllAutomations,
  });
};
```

### **How It Works Internally:**
1. **When a component uses this hook**:
   - It checks the cache for `["user-automations"]`.
   - If found, it **immediately** returns cached data.
   - If **not found**, it calls `getAllAutomations()`.

2. **What happens if data changes?**
   - React Query **re-fetches** the latest data in the background.
   - The UI updates automatically.

---

## **4. Implementing Optimistic UI in Mutations**
### **Mutation Hook: Create Automation**
```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (mutationKey, mutationFn, queryKey) => {
  const client = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onMutate: async (newData) => {
      await client.cancelQueries({ queryKey: [queryKey] });
      
      const previousData = client.getQueryData([queryKey]);
      
      client.setQueryData([queryKey], (old) => [newData, ...old]);

      return { previousData };
    },
    onError: (err, newData, context) => {
      client.setQueryData([queryKey], context.previousData);
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { mutate, isPending };
};
```

---

### **Step-by-Step Internal Working**
1. **Before the mutation (`onMutate`):**
   - **Cancel pending queries** for `"user-automations"` (to prevent race conditions).
   - **Get the existing cache** (`previousData`).
   - **Update the UI instantly** using `setQueryData()`.

2. **When the request is sent:**
   - The UI already **shows the new automation**.
   - The user **doesn’t need to wait** for a server response.

3. **If the request succeeds:**
   - Everything stays the same.

4. **If the request fails (`onError`):**
   - The UI **reverts** to the previous state (`previousData`).

5. **When the request is settled (`onSettled`):**
   - The query cache is invalidated, and **fresh data is fetched**.

---

## **5. Using Optimistic UI in a Component**
```tsx
const { data } = useQueryAutomations();
const { latestVariable } = useMutationDataState(["create-automation"]);

const optimisticUIData = useMemo(() => {
  if (latestVariable?.variables) {
    return [latestVariable.variables, ...data.data];
  }
  return data.data;
}, [latestVariable, data]);
```

### **How It Works Internally:**
1. `latestVariable.variables` holds **the new automation** **before** the server response.
2. The UI **renders it instantly** by combining:
   - The **optimistic update**.
   - The **fetched data** from `useQueryAutomations()`.

---

## **6. Flow Diagram**
```plaintext
User Action (Create Automation)
        |
        v
Update UI Instantly (Optimistic UI)
        |
        v
Send Request to Server (Mutation)
        |
   ---------------------
   |                   |
Success            Failure
   |                   |
No Change       Revert to Old Data
```

---

## **7. Summary of Internal Workings**
| Feature                | Internal Process |
|------------------------|-----------------|
| **Fetching Data**      | React Query first checks cache, then fetches if needed. |
| **Mutations (Updating Data)** | Uses optimistic UI: updates UI before the server confirms. |
| **Error Handling**     | If an error occurs, UI reverts to the previous state. |
| **Automatic Refetch**  | Once the mutation is completed, the latest data is fetched. |

---

## **8. Why Use This Approach?**
✅ **Instant UI Updates** → Feels more responsive  
✅ **Less Waiting for Users** → No delay after clicking buttons  
✅ **Automatic Cache Updates** → Data is always fresh  
✅ **Built-in Error Handling** → Prevents incorrect UI states  

This guide ensures **you fully understand how everything works** internally. 🚀 Let me know if you need any further explanations!
