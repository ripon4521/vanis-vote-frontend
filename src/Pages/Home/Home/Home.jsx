import { useState, useEffect } from "react";
import { Clock, Vote, Shield, Share2, Sun, Moon } from "lucide-react";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  // ডার্ক মোড লোড করার জন্য useEffect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // ডার্ক মোড টগল করার ফাংশন
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <header className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-gray-800 shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <Vote className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">VanishVote</span>
          </a>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a href="/polls/create" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              পোল তৈরি করুন
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              গোপন ভোট <span className="text-blue-600">অদৃশ্য</span> হয়ে যাবে নির্দিষ্ট সময় পর
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 md:text-xl">
              এমন একটি পোল তৈরি করুন যা নির্দিষ্ট সময় পরে অদৃশ্য হয়ে যায়। লগইন প্রয়োজন নেই, এবং ফলাফল শুধুমাত্র মেয়াদ শেষ হওয়া পর্যন্ত দৃশ্যমান।
            </p>
            <div className="mt-6">
              <a href="/polls/create" className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700">
                পোল তৈরি করুন
              </a>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-8 md:py-12 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[{
              icon: <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />, title: "সময় সীমিত", description: "পোল ১, ১২, বা ২৪ ঘণ্টার মধ্যে মেয়াদ শেষ হয়ে যাবে।"
            }, {
              icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />, title: "গোপনীয়", description: "কোনো লগইন প্রয়োজন নেই। সম্পূর্ণ গোপনীয়ভাবে ভোট দিন।"
            }, {
              icon: <Share2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />, title: "সহজ শেয়ারিং", description: "প্রত্যেক পোলের জন্য আলাদা লিংক থাকবে যা সহজেই শেয়ার করা যায়।"
            }, {
              icon: <Vote className="h-6 w-6 text-blue-600 dark:text-blue-400" />, title: "রিয়েল-টাইম ফলাফল", description: "ফলাফল তাৎক্ষণিক দেখা যাবে বা পোল শেষ হওয়ার পর প্রকাশ করা হবে।"
            }].map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-blue-100 dark:bg-gray-700 p-4">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} VanishVote. সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
};

export default Home;
