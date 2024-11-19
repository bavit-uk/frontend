// Assuming this is part of a layout or a specific component
import Sidebar from '../_components/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
