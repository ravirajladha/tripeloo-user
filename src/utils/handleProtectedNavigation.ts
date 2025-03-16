import { AppDispatch } from "@/store/store"; 
import { openLoginModal } from "@/store/slice/authSlice"; // Import Redux modal action

export const handleProtectedNavigation = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent> | null, // ✅ Allow null
  isAuthenticated: boolean,
  router: any, // ✅ Remove `AppRouterInstance` and use `any`
  targetPath: string,
  dispatch: AppDispatch
) => {
  e?.preventDefault(); // Prevent default navigation
  if (isAuthenticated) {
    router.push(targetPath); // ✅ Navigate if logged in
  } else {
    dispatch(openLoginModal()); // ✅ Open login modal if not logged in
  }
};
