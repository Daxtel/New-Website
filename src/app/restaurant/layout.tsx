export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Standalone layout — no site header/footer/navigation
  // Landing pages convert better without navigation distractions
  return <>{children}</>;
}
