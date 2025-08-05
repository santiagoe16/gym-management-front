type Props = {
  children: React.ReactNode;
};

export default function LayoutContainer({ children }: Props) {
  return (
    <div className="container mx-auto px-5 sm:px-4 md:px-7 lg:px-6 xl:px-10 pt-12 max-w-[1400px]">
      {children}
    </div>
  );
}
