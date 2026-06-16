import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions about home networking or smart electronics? Get in touch with the Internet Electronic team for expert support, inquiries, or feedback.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question about your home network? Want to suggest an article topic? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
        
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-6 text-gray-600">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Email Us</p>
                <p>contact@internet-electronic.com</p>
                <p className="text-sm mt-1">We aim to respond to all inquiries within 24-48 business hours.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Editorial Office</p>
                <p>Internet Electronic Media</p>
                <p>123 Digital Connectivity Ave, Suite 400</p>
                <p>Tech Hub City, TX 75001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div>
          <form className="space-y-5" action="#">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300">
              Send Message
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              By contacting us, you agree to our Privacy Policy regarding the storage of your data.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
