# Simbian Dashboard

A visual demonstration of SOC alert management transformation with Simbian integration. This project showcases the contrast between traditional SOC operations and Simbian-enhanced workflows through interactive, animated dashboards.

## Project Overview

This dashboard illustrates two distinct scenarios:

### Section 1: Without Simbian
- Three key metric cards showing problematic alert statuses:
  - Ignored Alerts (starting at 200)
  - Wrongly Closed Alerts (starting at 35)
  - Active Threats (starting at 5)
- Real-time alert animations demonstrate the overwhelming nature of traditional SOC operations
- Visual indicators highlight issues like analyst fatigue and false positives

### Section 2: With Simbian
- Step-by-step horizontal workflow visualization showing the Simbian advantage
- Transformation of the same three metric cards to zero counts
- Animations that reinforce the efficiency and accuracy of the Simbian approach

## Technologies Used

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API

## My Approach

I focused on creating a responsive, component-based architecture that clearly tells the story of how Simbian transforms SOC operations. The animation sequences are designed to guide the user's attention from the chaotic "before" state to the organized "after" state, making the benefits immediately apparent visually.

The project uses custom-built alert cards with animated counters and notifications to simulate a real-time SOC environment. For the Simbian section, I implemented a workflow visualization that highlights each step of the improved process.

## Animation Library

I used Framer Motion for all animations due to its robust API and excellent performance characteristics. The library allowed me to create complex sequences like:
- Counter animations showing alert numbers changing
- Alert notification arrival animations with various effects (shake, glow, slide)
- Smooth transitions between workflow steps
- Subtle background effects to enhance the visual distinction between sections

## Future Improvements

With additional time, I would implement:
1. More detailed alert information on click/hover
2. Additional animation variations for alert arrivals
3. User-configurable simulation parameters
4. Dark/light theme toggle
5. More advanced alert correlation visualizations

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
npm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
