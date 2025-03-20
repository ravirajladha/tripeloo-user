import React, { FC } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";

export interface PagePrivacyPolicyProps {}

const PagePrivacyPolicy: FC<PagePrivacyPolicyProps> = () => {
  return (
    <div className="nc-PagePrivacyPolicy container py-24">
      <div className="text-center max-w-2xl mx-auto my-16 sm:my-20">
        <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-100">
          Privacy Policy
        </h2>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-xl font-bold text-neutral-800">Welcome to Tripeloo!</h3>
        <p>
          We value your privacy and are committed to protecting your personal information. This
          Privacy Policy explains how we collect, use, share, and safeguard your data when you use
          our website and services.
        </p>

        <h4>1. Information We Collect</h4>
        <p>We collect the following types of information:</p>
        <h5>a. Information You Provide to Us</h5>
        <ul>
          <li>Name, email, phone number, and address</li>
          <li>Payment details (processed securely by third-party payment gateways)</li>
          <li>Profile information when you register</li>
          <li>Messages and communications via Trip Chat</li>
        </ul>

        <h5>b. Information We Collect Automatically</h5>
        <ul>
          <li>IP address, device type, and browser information</li>
          <li>Usage data, such as pages visited and interactions</li>
          <li>Cookies and tracking technologies</li>
        </ul>

        <h5>c. Information from Third Parties</h5>
        <ul>
          <li>Information from travel providers when you make a booking</li>
          <li>Social media data if you sign up using social accounts</li>
        </ul>

        <h4>2. How We Use Your Information</h4>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our platform</li>
          <li>Facilitate bookings and transactions</li>
          <li>Communicate with you about your reservations and account</li>
          <li>Personalize user experience and recommendations</li>
          <li>Ensure security and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h4>3. How We Share Your Information</h4>
        <p>We do not sell your personal data. However, we may share information with:</p>
        <ul>
          <li>Travel Providers for booking fulfilment</li>
          <li>Third-Party Service Providers (e.g., payment processors, customer support)</li>
          <li>Legal Authorities if required by law</li>
        </ul>

        <h4>4. Data Security</h4>
        <p>
          We implement security measures to protect your data. However, no online service is 100%
          secure.
        </p>

        <h4>5. Your Rights & Choices</h4>
        <p>You can:</p>
        <ul>
          <li>Access, edit, or delete your account information</li>
          <li>Opt out of marketing communications</li>
          <li>Disable cookies through browser settings</li>
        </ul>

        <h4>6. Third-Party Links</h4>
        <p>
          Our platform may contain links to third-party websites. We are not responsible for their
          privacy practices.
        </p>

        <h4>7. Updates to This Policy</h4>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with the updated date.
        </p>

        <h4>8. Contact Us</h4>
        <p>
          If you have any questions, contact us at: <br />
          Email: Muhammednt6@gmail.com <br />
          Phone: 7970067004
        </p>
      </div>

      <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div>
    </div>
  );
};

export default PagePrivacyPolicy;
