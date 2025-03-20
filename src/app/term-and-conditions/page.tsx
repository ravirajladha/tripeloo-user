import React, { FC } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface PageTermsAndConditionsProps {}

const PageTermsAndConditions: FC<PageTermsAndConditionsProps> = () => {
  return (
    <div className="nc-PageTermsAndConditions container py-24">
      <div className="text-center max-w-2xl mx-auto my-16 sm:my-20">
        <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-100">
          Terms and Conditions
        </h2>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-xl font-bold text-neutral-800">Welcome to Tripeloo!</h3>
        <p>
          These Terms and Conditions govern your access to and use of our platform, including
          booking stays and listing properties. By using Tripeloo, you agree to comply with these
          terms.
        </p>

        <h4>1. Definitions</h4>
        <ul>
          <li><strong>Platform:</strong> Refers to the Tripeloo website and services.</li>
          <li><strong>Traveler:</strong> Refers to users who book stays through Tripeloo.</li>
          <li><strong>Travel Provider:</strong> Refers to individuals or businesses listing properties for booking.</li>
          <li><strong>Trip Chat:</strong> A platform feature allowing direct communication between travelers and travel providers.</li>
        </ul>

        <h4>2. Platform Role</h4>
        <p>
          Tripeloo is an intermediary connecting travelers with travel providers. We do not own or manage properties and are not responsible for the quality, availability, or safety of listed stays.
        </p>

        <h4>3. Account Registration</h4>
        <ul>
          <li>Users must provide accurate information and maintain account security.</li>
          <li>Tripeloo reserves the right to suspend or terminate accounts for violations of these terms.</li>
        </ul>

        <h4>4. Booking and Payments</h4>
        <ul>
          <li>Travelers can negotiate pricing and terms with travel providers via Trip Chat.</li>
          <li>Payments are handled directly between travelers and travel providers; Tripeloo does not process payments.</li>
          <li>Travel providers are responsible for honoring confirmed bookings.</li>
        </ul>

        <h4>5. Cancellation and Refunds</h4>
        <ul>
          <li>Cancellation and refund policies are determined by the travel provider.</li>
          <li>Tripeloo is not responsible for refunds or disputes; travelers must contact travel providers directly.</li>
        </ul>

        <h4>6. User Responsibilities</h4>
        <ul>
          <li>Travelers must provide accurate booking details and comply with property rules.</li>
          <li>Travel Providers must ensure the accuracy of listings and maintain service quality.</li>
          <li>Users must not engage in fraudulent, abusive, or illegal activities on the platform.</li>
        </ul>

        <h4>7. Subscription Fees for Travel Providers</h4>
        <ul>
          <li>Travel providers can list their properties for free for six months.</li>
          <li>After the trial period, a ₹1,000 monthly subscription fee is required to continue listing.</li>
          <li>Tripeloo does not charge commission on bookings.</li>
        </ul>

        <h4>8. Dispute Resolution</h4>
        <ul>
          <li>Tripeloo is not liable for disputes between travelers and travel providers.</li>
          <li>Users should attempt to resolve issues independently. If needed, Tripeloo may assist but is not obligated to mediate.</li>
        </ul>

        <h4>9. Intellectual Property</h4>
        <ul>
          <li>All content on Tripeloo, including logos, text, and images, is owned by Tripeloo or its licensors.</li>
          <li>Users may not copy, modify, or distribute platform content without permission.</li>
        </ul>

        <h4>10. Limitation of Liability</h4>
        <ul>
          <li>Tripeloo is not liable for any damages, losses, or inconveniences arising from the use of the platform.</li>
          <li>We do not guarantee uninterrupted or error-free service.</li>
        </ul>

        <h4>11. Privacy Policy</h4>
        <p>
          By using Tripeloo, you agree to our Privacy Policy, which outlines how we collect, use, and protect your data.
        </p>

        <h4>12. Termination</h4>
        <p>
          Tripeloo reserves the right to suspend or terminate access to users who violate these terms.
        </p>

        <h4>13. Changes to Terms</h4>
        <p>
          Tripeloo may update these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of any changes.
        </p>

        <h4>14. Governing Law</h4>
        <p>
          These terms are governed by the laws of Kerala.
        </p>

        <h4>15. Contact Us</h4>
        <p>
          For questions or concerns, contact us at: <br />
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

export default PageTermsAndConditions;
