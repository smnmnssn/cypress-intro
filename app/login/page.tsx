import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-semibold mb-4">Logga in</h1>
      <LoginForm />
    </main>
  );
}
