"use client";
import WeddingClassicForm from "@/components/forms/WeddingClassicForm";
import GreetingMinimalistForm from "@/components/forms/GreetingMinimalistForm";

export default function TestFormPage() {
  const handleSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Test Form: Pernikahan (Elegance Rose)</h2>
          <WeddingClassicForm onSubmit={handleSubmit} />
        </section>

        <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Test Form: Ucapan (Midnight Magic)</h2>
          <GreetingMinimalistForm onSubmit={handleSubmit} />
        </section>
      </div>
    </div>
  );
}
