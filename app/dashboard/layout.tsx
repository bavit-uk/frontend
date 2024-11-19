// Assuming this is part of a layout or a specific component
// import Sidebar from '../_components/Sidebar/Sidebar';
import Login from "../_components/Auth/Login";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      {/* <Sidebar /> */}
      <Login/>
      <div>{children}</div>
    </div>
  );
}
