import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service and guidelines for using the Internet Electronic website, accessing connectivity guides, and using our resources.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-14 mb-12">
      <header className="mb-10 border-b border-gray-100 pb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-500 font-medium">Last updated: April 25, 2026</p>
      </header>
      
      <div className="prose prose-blue max-w-none text-gray-700">
        <h2>1. Terms</h2>
        <p>
          By accessing the website at https://internet-electronic.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2>2. Disclaimer</h2>
        <p>
          The materials on Internet Electronic&apos;s website are provided on an &ldquo;as is&rdquo; basis. Internet Electronic makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p>
          Further, Internet Electronic does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
        </p>

        <h2>3. Limitations</h2>
        <p>
          In no event shall Internet Electronic or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Internet Electronic&apos;s website, even if Internet Electronic or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>4. Accuracy of materials</h2>
        <p>
          The materials appearing on Internet Electronic&apos;s website could include technical, typographical, or photographic errors. Internet Electronic does not warrant that any of the materials on its website are accurate, complete or current. Internet Electronic may make changes to the materials contained on its website at any time without notice.
        </p>

        <h2>5. Links</h2>
        <p>
          Internet Electronic has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Internet Electronic of the site. Use of any such linked website is at the user&apos;s own risk.
        </p>

        <h2>6. Modifications</h2>
        <p>
          Internet Electronic may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>
      </div>
    </div>
  );
}
