import Sidebar from "../_components/Sidebar/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard page of the application" />
            </head>
            <>
                <div className="flex">
                    <div className="">
                        <Sidebar />
                    </div>
                    <div className="">{children}</div>
                    
                </div>
            </>
        </html>
    );
}
