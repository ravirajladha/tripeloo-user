"use client"
import React, { FC, useState } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { sendMessage } from "@/actions/contactUs"; // Import action to handle form submission

export interface PageContactProps {}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Wayaand , Kerala",
  },
  {
    title: "💌 EMAIL",
    desc: "Muhammednt6@gmail.com",
  },
  {
    title: "☎ PHONE",
    desc: "+91 7970067004",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await sendMessage({ name, email, message });
      setEmail("");
      setMessage("");
      setName("");


      setSuccess(response.message);  // Assuming the response has a "message" field
      setError("");
    } catch (err: any) {
      setError(err.message || "Something went wrong, please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              {/* <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div> */}
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                  <Label>Full name</Label>
                  <Input
                    placeholder="Enter your name"
                    type="text"
                    className="mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <Label>Message</Label>
                  <Textarea
                    className="mt-1"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </label>
                <div>
                  <ButtonPrimary type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </ButtonPrimary>
                </div>
              </form>
              {error && <div className="text-red-500 mt-4">{error}</div>}
              {success && <div className="text-green-500 mt-4">{success}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div>
    </div>
  );
};

export default PageContact;










// const info = [
//   {
//     title: "🗺 ADDRESS",
//     desc: "Wayaand , Kerala",
//   },
//   {
//     title: "💌 EMAIL",
//     desc: "Muhammednt6@gmail.com",
//   },
//   {
//     title: "☎ PHONE",
//     desc: "+91 7970067004",
//   },
// ];