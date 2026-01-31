import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-blue-600">Knowledge Camp Global</h1>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your Career with
            <span className="text-blue-600"> Professional Training</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Enterprise-grade learning management system for individuals and organizations.
            Learn from experts, track progress, and earn recognized certificates.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/courses" className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700">
              Browse Courses
            </Link>
            <Link href="/pricing" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50">
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Knowledge Camp Global?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Expert-Led Courses"
              description="Learn from industry professionals with real-world experience"
              icon="🎓"
            />
            <FeatureCard
              title="Progress Tracking"
              description="Monitor your learning journey with detailed analytics"
              icon="📊"
            />
            <FeatureCard
              title="Recognized Certificates"
              description="Earn certificates that boost your professional profile"
              icon="🏆"
            />
            <FeatureCard
              title="Corporate Training"
              description="Bulk enrollment and team management for organizations"
              icon="🏢"
            />
            <FeatureCard
              title="AI Support"
              description="Get instant help with our AI-powered support system"
              icon="🤖"
            />
            <FeatureCard
              title="Flexible Payment"
              description="Multiple payment options including Stripe and invoicing"
              icon="💳"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" label="Active Learners" />
            <StatCard number="500+" label="Courses Available" />
            <StatCard number="50+" label="Expert Trainers" />
            <StatCard number="95%" label="Satisfaction Rate" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals advancing their careers
          </p>
          <Link href="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 inline-block">
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Knowledge Camp Global</h4>
              <p className="text-sm">Professional training and development platform</p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Platform</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/courses">Courses</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/help">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Knowledge Camp Global. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

