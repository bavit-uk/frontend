import DynamicTable from "@/app/_components/Table/DynamicTable";

export default function Page() {
    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">View User</h2>
                <p className="text-gray-600">Sub Line Writtern Here</p>
            </div>

            <DynamicTable
                columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "role", label: "Role" },
                    { key: "status", label: "Status" },
                    { key: "action", label: "Action" },
                ]}
                data={[
                    { name: "John Doe", email: "test@gmail.com" },
                    { name: "Jane Doe", email: "test@" },
                    { name: "John Doe", email: "}@gmail.com" },
                        ]}
            />
        </div>
    );
}
