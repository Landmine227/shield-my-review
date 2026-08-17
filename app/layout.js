import { Georgia, Source_Sans_3 } from "next/font/google";

const georgia = Georgia({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-georgia",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ShieldMyReview — Professional Reputation Defense",
  description: "Corporate-grade reputation protection and crisis defense for independent enterprise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${georgia.variable} ${sourceSans.variable}`}>
      <head>
        <style>{`
          :root {
            --bg-color: #FAF8F5;
            --text-color: #2A2A2A;
            --primary-color: #1B3B2B;
            --border-color: #D1CFCB;
            --card-bg: #FFFFFF;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: var(--font-sans), sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            padding: 40px 20px;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
