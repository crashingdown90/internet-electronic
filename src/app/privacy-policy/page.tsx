import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Internet Electronic regarding data collection, cookies, and Google AdSense compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-14 mb-12">
      <header className="mb-10 border-b border-gray-100 pb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500 font-medium">Last updated: April 25, 2026</p>
      </header>
      
      <div className="prose prose-blue max-w-none text-gray-700">
        <p>
          At <strong>Internet Electronic</strong> (accessible from https://internet-electronic.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Internet Electronic and how we use it.
        </p>

        <h2>Google AdSense and DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
        </p>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data.
        </p>

        <h2>Log Files</h2>
        <p>
          Internet Electronic follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2>Cookies and Web Beacons</h2>
        <p>
          Like any other website, Internet Electronic uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2>Third Party Privacy Policies</h2>
        <p>
          Internet Electronic's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p>Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>

        <h2>GDPR Data Protection Rights</h2>
        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access, The right to rectification, The right to erasure, The right to restrict processing, The right to object to processing, and The right to data portability.</p>

        <h2>Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
