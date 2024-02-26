import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { RequestVendorForm } from "@/components/RequestVendorForm";

type Props = {};

async function AdminDashboard({}: Props) {
  const { isAuthenticated } = getKindeServerSession();
  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }

  return (
    <main className="flex flex-col  items-center justify-center py-10  ">
      <h1 className="text-4xl font-bold my-10">Personal Details</h1>
      <RequestVendorForm />
    </main>
  );
}

export default AdminDashboard;
