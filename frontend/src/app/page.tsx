import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  MousePointer2,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900">Mailnova</span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href="/login"
                className="text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-7 py-3 rounded-full text-sm font-extrabold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-10">
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-700 ring-1 ring-inset ring-indigo-200 bg-indigo-50/50">
                <Zap className="h-3.5 w-3.5 mr-2 fill-indigo-600" />
                <span>v1.0 is now live</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-black tracking-tight text-gray-900 leading-[0.95]">
                Email marketing <br />
                <span className="text-indigo-600 relative inline-block">
                  made effortless.
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0 6C20 2 40 2 60 4C80 6 100 6 100 6" stroke="#4F46E5" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium opacity-80">
                Design beautiful newsletters, manage your subscribers, and send up to 60,000 emails per month with our professional drag-and-drop builder.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                <Link
                  href="/register"
                  className="bg-green-600 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-green-700 transition-all shadow-2xl shadow-green-200 flex items-center justify-center gap-3 group"
                >
                  Start Building Now
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-2xl text-xl font-bold hover:border-indigo-300 hover:bg-indigo-50/10 transition-all flex items-center justify-center"
                >
                  View Demo
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-10 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tighter">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tighter">Unlimited Contacts</span>
                </div>
              </div>
            </div>

            <div className="mt-20 lg:mt-0 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_48px_80px_-16px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-1000">
                <Image
                  src="/images/hero-mockup.png"
                  alt="Mailnova Dashboard Mockup"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-400/20 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-indigo-600 font-black tracking-[0.3em] uppercase text-xs">The Mailnova Experience</h2>
            <p className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">Everything you need to grow your audience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-indigo-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 transition-all duration-500 shadow-inner">
                <MousePointer2 className="h-10 w-10 text-indigo-600 group-hover:text-white group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-5 tracking-tight">Drag & Drop Editor</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium opacity-80">
                Build professional newsletters in minutes using our GrapesJS powered builder. No coding required. Start with a blank canvas or a template.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-green-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-green-600 transition-all duration-500 shadow-inner">
                <BarChart3 className="h-10 w-10 text-green-600 group-hover:text-white group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-5 tracking-tight">Real-time Analytics</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium opacity-80">
                Track open rates, click-throughs, and campaign performance with our integrated tracking system. Know exactly who is engaging with your content.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-purple-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-purple-600 transition-all duration-500 shadow-inner">
                <Zap className="h-10 w-10 text-purple-600 group-hover:text-white group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-5 tracking-tight">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium opacity-80">
                Powered by Amazon SES, we ensure your emails land in the inbox, not the spam folder. Scalable infrastructure for up to 60k emails/month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-[0_48px_96px_-24px_rgba(79,70,229,0.3)]">
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                Ready to transform your email marketing?
              </h2>
              <p className="text-indigo-100 text-xl lg:text-2xl font-bold opacity-90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators who trust Mailnova for their professional communication. Sign up in 30 seconds.
              </p>
              <div className="pt-6">
                <Link
                  href="/register"
                  className="bg-white text-indigo-700 px-14 py-7 rounded-3xl text-2xl font-black hover:scale-105 hover:shadow-2xl transition-all inline-block shadow-lg active:scale-95 ease-out"
                >
                  Create Your Free Account
                </Link>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-indigo-900/40 rounded-full blur-[120px]"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-100">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-black text-gray-900 tracking-tighter">Mailnova</span>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-sm font-black text-gray-500 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-gray-300 hover:text-indigo-600 transition-all transform hover:scale-125">
                <Github className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-600 transition-all transform hover:scale-125">
                <Twitter className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-600 transition-all transform hover:scale-125">
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-gray-50 text-center text-gray-400 text-sm font-bold tracking-tight">
            © 2026 Mailnova SaaS Platform Engineering. All rights reserved globally.
          </div>
        </div>
      </footer>
    </div>
  );
}
