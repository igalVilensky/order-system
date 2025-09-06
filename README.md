# 🌿 Cannabis Order System

A modern and secure order management and dashboard system for a Cannabis Club / Apotheke, built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It features role-based authentication, order management, patient management (admin-only), and local storage for data persistence.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&style=flat-square)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&style=flat-square)

## 🚀 Features

- 🔐 **Role-Based Authentication**: Mock login for `staff` (order management) and `admin` (orders + patients).
- 📋 **Order Management**: Create, filter, and update orders (pending → approved → dispensed).
- 🩺 **Patient Management** (Admin-only): Add/edit patients with prescription limits.
- 📊 **Dashboard**: Visualize KPIs (total orders, revenue, avg order size) and charts (orders per day, top products).
- 📦 **Inventory Tracking**: Local storage for orders, patients, and products with stock and prescription validation.
- 📱 **Responsive Design**: Mobile-friendly UI with shadcn/ui components and Tailwind CSS.

## 🛠️ Tech Stack

| Technology                                      | Description                                |
| ----------------------------------------------- | ------------------------------------------ |
| [Next.js](https://nextjs.org/)                  | React framework for SSR and static sites   |
| [TypeScript](https://www.typescriptlang.org/)   | Static typing for robust development       |
| [Tailwind CSS](https://tailwindcss.com/)        | Utility-first CSS framework for styling    |
| [shadcn/ui](https://ui.shadcn.com/)             | Accessible, customizable UI components     |
| [React Query](https://tanstack.com/query)       | Data fetching and caching                  |
| [react-hook-form](https://react-hook-form.com/) | Form handling with validation              |
| [Zod](https://zod.dev/)                         | Schema validation for forms                |
| [Local Storage]                                 | Client-side data persistence for mock data |
| [Netlify](https://www.netlify.com/)             | Hosting platform for deployment            |

## ⚙️ Project Setup

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: Package manager
- **Git**: Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/igalVilensky/cannabis-order-system.git
   cd cannabis-order-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser. Use username `staff` or `admin` and password `password` to log in.

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌍 Deployment (Netlify)

1. Push your code to a GitHub repository.
2. Go to [Netlify](https://www.netlify.com/) and select **New site from Git**.
3. Connect your GitHub repository for `CannabisOrderSystem`.
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Deploy the site to get a live URL! 🎉
   - Project name: `CannabisOrderSystem`
   - Ensure the site loads and test the login flow (`staff` or `admin`, password: `password`).

## 📂 Project Structure

```plaintext
cannabis-order-system/
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── public/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── patients/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── LocalStorageInitializer.tsx
│   │   ├── OrderTable.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── table.tsx
│   ├── features/
│   │   ├── orders/
│   │   │   ├── mutations.ts
│   │   │   └── queries.ts
│   │   └── patients/
│   │       ├── mutations.ts
│   │       └── queries.ts
│   ├── hooks/
│   ├── lib/
│   │   ├── localStorage.ts
│   │   └── utils.ts
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   └── QueryProvider.tsx
│   ├── tests/
│   └── types/
```

## 📸 Demo

- **Frontend App**: [https://canordersystem.netlify.app/](#) (Update with your Netlify URL after deployment)
- **Login Credentials**:
  - Staff: Username `staff`, Password `password`
  - Admin: Username `admin`, Password `password`

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/igalVilensky/cannabis-order-system).
