type SectionHeaderProps = {
  children: React.ReactNode;
};

function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-tighter text-center sm:text-4xl md:text-5xl">
        {children}
      </h2>
    </div>
  )
}

export default SectionHeader
