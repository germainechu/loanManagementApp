# Loan Management App 🏦

Hi there! This is my solution to the loan management app.

## 🚀 How to Run This Project

### Setting Up
1. First, clone this repo:
```bash
git clone https://github.com/germainechu/loanManagementApp.git
cd loanManagementApp
```

2. Install all the dependencies:
```bash
npm install
```

3. Create a `.env` file and add your database connection:
```env
DATABASE_URL="postgresql://username@localhost:5432/loan_management?schema=public"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

### Running the App
For normal development:
```bash
npm run dev
```

If you want to debug server-side code:
```bash
npm run dev --inspect
```

Then head over to `http://localhost:3000` and you should see the app running! 🎉

## 🤔 Design Decisions

### The Data Model
![image](https://github.com/user-attachments/assets/fcd9c0e5-b680-4351-beab-0ca40a7738ba)

### Additional Features
1. **Multi-Currency Support** 💱
   - Handles USD, EUR, GBP, CAD, AUD, JPY, NZD
   - Locale-specific currency formatting in views

2. **Separation of Concerns**
   - Server and Client maintain separation of concerns
   - Client components are reusable and modular for maintainability 

3. **Payment System Ready** 💰
   - Built the object model to also include payments
   - data schema capable of managing borrower payments and track payment status

### Challenges I Faced
1. Had some interesting debugging with Next.js dynamic routes and params
   - Initially struggled with a 405 error when implementing the view details page
   - Learned about the importance of proper route handling and the difference between API routes and page routes
   - Solved it by correctly implementing server-side params and moving API routes to a separate directory

2. Worked through server/client component separation
   - Initially had everything as server components, which caused issues with interactive elements
   - Learned to identify which components truly needed client-side interactivity

3. Handled dropdown menu context properly (this was tricky!)
   - Ran into a "MenuItem must be used within Menu" error that was particularly challenging
   - Initially tried various approaches with prop passing and component restructuring
   - Finally solved it by understanding Radix UI's context requirements and properly structuring the component hierarchy
   - This taught me a lot about React's context system and how component libraries use it internally


## 🔜 What I'd Add Next
If I had more time, I would:
- Implement the payment system
- Add user authentication
- Make a dashboard with loan analytics
