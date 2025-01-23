# 00. Promo Video Script (Improved for Narration)

## Intro

Hello, everyone!  
In this video, we’re going to setup a nextjs application with nextAuth,
using both credential and social provider, futhermore , we will also setup the mobile auth endpoint.

---

## Login Page

Let’s start with the login page.

At the **header**, we have:

- A brand logo and name.
- A search box with a category filter.
- A language and currency switcher. If you switch to Arabic, the layout changes to right-to-left. Let’s switch back to English. You can add new languages and currencies from the admin dashboard.
- Next, there’s a theme switcher where you can toggle between light and dark mode or change the theme color to gold, green, or red. Admins can add new colors too.
- Then we have the account menu, where users can sign in or create an account.
- And finally, the shopping cart icon.

Below the header, there’s a **navigation menu**. The first item, **"All"**, opens a sidebar where you can browse by department, access your account, or visit the customer service page.

Now, moving down, there’s a **beautiful slider** that changes every 5 seconds.

Scrolling further, we see sections for categories, new arrivals, best sellers, and featured products.

The next section displays **Today’s Deals**, which you can scroll through horizontally.

Further down, we see the **Best Selling Products**. If you hover over a product card for a second, the image changes.

At the bottom of the page, there are personalized sections like **“Related to items you’ve viewed”** and **“Your browsing history,”** similar to what you see on Amazon.

At the very end, there’s the **website footer**, which includes useful links, the site logo, and copyright information.

---

## Rgister Page

Let’s search for a product by typing **“men”** and hitting Enter.

Here’s the search results page. These products come directly from the MongoDB database.  
At the bottom, we have **pagination buttons** to navigate between pages.

We can filter items by **category**, **price range**, **rating**, or **tags**.  
Additionally, we can sort the results by **price**, **newest arrivals**, **customer reviews**, or **best-selling**.

---

## Tech Stack

This project uses:

| Feature        | Technology           |
| -------------- | -------------------- |
| **Language**   | TypeScript           |
| **Frameworks** | Next.js 15           |
| **Database**   | Neon, Postgres       |
| **Deployment** | Vercel, GitHub       |
| **Auth**       | Auth.js, Google Auth |
| **Validation** | Zod, React Hook Form |

---

## About Me

I’m Alex Ai Coding, a senior web developer with experience working for international companies and teaching over 50,000 students worldwide. I’ll guide you through building this project step by step.

---

## What You’ll Learn

By the end of this course, you’ll know how to:

- Build a modern e-commerce site with Next.js 15 and server actions.
- Design professional UI components with Tailwind and Flowbite.
- Work with Neon DB and Prisma for database management.
- Validate forms with Zod and React Hook Form.
- Manage state with Zustand and implement authentication using Next-Auth.
- Create customer and admin dashboards.
- Integrate Stripe for online payments.

This course is perfect for developers and entrepreneurs looking to enhance their skills or launch their own e-commerce platforms. Basic React and Next.js knowledge is all you need.

---

Let’s get started and create our Next.js app in the next lesson!
