"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Star, TrendingUp, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Boost Your Sales",
      description: "Increase your revenue by up to 300% with our proven selling strategies and tools."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Reach More Customers",
      description: "Connect with millions of potential buyers across global markets effortlessly."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Secure Transactions",
      description: "Protected payments and fraud prevention ensure safe selling experience."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Seller",
      content: "This platform transformed my business. Sales increased 250% in just 3 months!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Online Retailer",
      content: "The tools and analytics helped me understand my customers better than ever.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Small Business Owner",
      content: "From zero to $10K monthly revenue. This platform made it possible.",
      rating: 5
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
                SellPro
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Account Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => router.push('/auth/login')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </button>
              <button 
              onClick={() => router.push('/auth/register')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t`}>
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            <div className="pt-3 border-t space-y-2">
              <button 
                onClick={() => router.push('/auth/login')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </button>
              <button className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Animation */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Sell More,
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Earn More</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your business with our powerful selling platform. Join thousands of successful sellers who've increased their revenue by 300%+
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  Start Selling Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                  <div className="text-gray-600 text-sm">Active Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">$2M+</div>
                  <div className="text-gray-600 text-sm">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">99%</div>
                  <div className="text-gray-600 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Animated Benefits */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose SellPro?</h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      style={{
                        animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
                      }}
                    >
                      <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Sellers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, manage, and grow your online business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
                title: "Analytics Dashboard",
                description: "Track your performance with detailed analytics and insights"
              },
              {
                icon: <Users className="w-12 h-12 text-green-600" />,
                title: "Customer Management",
                description: "Manage customer relationships and boost retention rates"
              },
              {
                icon: <Shield className="w-12 h-12 text-purple-600" />,
                title: "Secure Payments",
                description: "Accept payments safely with built-in fraud protection"
              },
              {
                icon: <Star className="w-12 h-12 text-yellow-600" />,
                title: "Review System",
                description: "Build trust with authentic customer reviews and ratings"
              },
              {
                icon: <CheckCircle className="w-12 h-12 text-indigo-600" />,
                title: "Order Management",
                description: "Streamline your order processing and fulfillment"
              },
              {
                icon: <ArrowRight className="w-12 h-12 text-red-600" />,
                title: "Marketing Tools",
                description: "Promote your products with built-in marketing features"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Sellers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of successful sellers</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl mb-6 italic">
                "{testimonials[currentSlide].content}"
              </blockquote>
              <div>
                <div className="font-semibold text-lg">{testimonials[currentSlide].name}</div>
                <div className="text-blue-200">{testimonials[currentSlide].role}</div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Selling?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of successful sellers and start your journey to financial freedom today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg mb-4 inline-block">
                SellPro
              </div>
              <p className="text-gray-400">
                Empowering sellers worldwide with cutting-edge e-commerce solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SellPro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;