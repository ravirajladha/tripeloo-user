"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/authSlice";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.data.user)); // Store user in Redux
        closeModal(); // Close modal
        router.refresh(); // Refresh to reflect login status
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid email or password.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-neutral-800">
            <Dialog.Title className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Login
            </Dialog.Title>

            <form className="mt-4 space-y-4" onSubmit={handleLogin}>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email Address
                </span>
                <Input
                  type="email"
                  placeholder="example@example.com1"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Password
                </span>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error && <p className="text-red-500">{error}</p>}

              <ButtonPrimary type="submit">Login</ButtonPrimary>
            </form>

            <button
              onClick={closeModal}
              className="mt-4 w-full text-center text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
            >
              Cancel
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
