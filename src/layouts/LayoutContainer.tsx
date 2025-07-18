type Props = {
  children: React.ReactNode;
};

export default function LayoutContainer({ children }: Props) {
  return (
    <div className="container mx-auto sm:px-6 lg:px-8 xl:px-20 pt-12">
      {children}
    </div>
  );
}
