import { getProfile } from "../api/auth";

export const handleClickItem = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    const openModalEvent = new CustomEvent("triggerLoginModal");
    window.dispatchEvent(openModalEvent); 
  } else {
    try {
      const profile = await getProfile();

      if (profile?.status) {
        window.location.href = `/detail/${id}`;
      } else {
        localStorage.removeItem("token");
        const openModalEvent = new CustomEvent("triggerLoginModal");
        window.dispatchEvent(openModalEvent); 
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      const openModalEvent = new CustomEvent("triggerLoginModal");
      window.dispatchEvent(openModalEvent);
    }
  }
};
