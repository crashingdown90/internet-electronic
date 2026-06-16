import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Internet Electronic, our mission, and our team of home networking and smart electronics experts. We help you stay connected.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-14 mb-12">
      <header className="mb-10 border-b border-gray-100 pb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          About Internet Electronic
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          Your trusted source for navigating the digital landscape.
        </p>
      </header>
      
      <div className="prose prose-blue mx-auto prose-lg text-gray-700">
        <p>
          Welcome to <strong>Internet Electronic</strong>, the premier destination for in-depth guides, expert reviews, and actionable advice on internet connectivity, smart home automation, and personal electronics.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          In an increasingly connected world, understanding the technology that powers our daily lives is no longer optional—it&apos;s essential. Our mission is to demystify complex networking concepts and electronic hardware, empowering everyday users to build secure, high-speed, and intelligent home environments. We believe that technology should work for you, not the other way around.
        </p>
        
        <h2>Expertise and Trust (E-E-A-T)</h2>
        <p>
          At Internet Electronic, we adhere strictly to the highest editorial standards. Our content is crafted by a dedicated team of network engineers, cybersecurity analysts, and hardware enthusiasts with decades of combined experience in the tech industry. 
        </p>
        <p>
          Every article, guide, and review undergoes a rigorous fact-checking process to ensure accuracy, relevance, and practical utility. We do not accept sponsored placements that influence our editorial independence. When we recommend a router, a mesh network, or a smart home device, it is because we have analyzed its technical merits and believe it offers genuine value to our readers.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li><strong>High-Speed Connectivity:</strong> Deep dives into Wi-Fi 6/7, 5G Home Internet, and Fiber Optics.</li>
          <li><strong>Smart Home Integration:</strong> Guides on building cohesive IoT ecosystems that are both convenient and secure.</li>
          <li><strong>Cybersecurity:</strong> Actionable steps to defend your home network against emerging digital threats.</li>
          <li><strong>Hardware Optimization:</strong> Maximizing the performance of your daily electronics through optimal network infrastructure.</li>
        </ul>

        <p>
          Thank you for trusting Internet Electronic as your guide. We are committed to keeping you seamlessly connected to the future.
        </p>
      </div>
    </div>
  );
}
