"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal } from "@/store/slice/authSlice";
import LoginModal from "@/components/LoginModal";

export default function ReduxWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector((state: any) => state.auth.isLoginModalOpen);

  return (
    <>
      {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} closeModal={() => dispatch(closeLoginModal())} />}
      {children}
    </>
  );
}
