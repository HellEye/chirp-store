import { twMerge } from "tailwind-merge";
export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge(`container mx-auto px-4 py-8`, className)}>
      {children}
    </div>
  );
};
