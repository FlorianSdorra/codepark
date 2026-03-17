import { RedirectToast } from "@/components/redirect-toast";

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
};

export default RootTemplate;
