// app/register/page.tsx

import RegisterForm from "../components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <RegisterForm />
    </main>
  );
}
