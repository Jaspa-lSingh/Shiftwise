import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { HiCalendar, HiClock, HiUserGroup, HiCurrencyDollar, HiChartBar, HiShieldCheck, HiCheck } from 'react-icons/hi';

const Features = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [isAnnual, setIsAnnual] = useState(false);

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  // Animation variants for staggered text animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <HiCalendar className="w-8 h-8 text-blue-600" />,
      title: "Smart Scheduling",
      description: "Intuitive algorithms that analyze employee preferences and business demands to create optimal shift assignments.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <HiClock className="w-8 h-8 text-blue-600" />,
      title: "Time Tracking",
      description: "Accurate attendance records with geolocation verification and biometric options for reliable timekeeping.",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <HiUserGroup className="w-8 h-8 text-blue-600" />,
      title: "Team Management",
      description: "Manage employee profiles, skills, certifications, and availability all in one centralized location.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <HiCurrencyDollar className="w-8 h-8 text-blue-600" />,
      title: "Payroll Integration",
      description: "Seamlessly export time data to your payroll system, with automatic calculation of regular and overtime hours.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <HiChartBar className="w-8 h-8 text-blue-600" />,
      title: "Forecasting Tools",
      description: "Scheduling tools that predict busy periods and staffing needs based on historical data and external factors.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <HiShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Compliance Automation",
      description: "Built-in rules engine that ensures schedules comply with labor laws, union agreements, and company policies.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      quote: "Shiftwise's scheduling has reduced our management time by 70% while improving employee satisfaction. It's been a game changer for our retail operation.",
      author: "Sarah Johnson",
      position: "Operations Manager, Retail Chain",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      quote: "The payroll integration is seamless. We've eliminated timesheet errors and our payroll processing time has been cut in half.",
      author: "Michael Chen",
      position: "Finance Director, Healthcare Services",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      quote: "Our staff loves the mobile app for shift swapping and checking their schedule. Communication has improved and no-shows have decreased significantly.",
      author: "Emma Rodriguez",
      position: "HR Director, Hospitality Group",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const subscriptionPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Up to 10 employees",
        "Basic scheduling",
        "Time tracking",
        "Mobile app access",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with advanced needs",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "Up to 50 employees",
        "Advanced scheduling",
        "Time tracking & attendance",
        "Payroll integration",
        "Mobile app access",
        "Priority support",
        "Advanced reporting",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Unlimited employees",
        "Custom scheduling rules",
        "Advanced integrations",
        "Dedicated account manager",
        "24/7 priority support",
        "Custom reporting",
        "API access",
        "SSO & advanced security",
      ],
      highlighted: false,
    },
  ];

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 40%),
                            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.div
                variants={itemVariants}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-6"
              >
                Advanced Workforce Management
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Next-Gen Shift{" "}
                <span className="text-blue-600 inline-block">Scheduling</span>
                <br />
                That Works For
                <br />
                Everyone
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Shiftwise combines smart scheduling algorithms with intuitive design to create the perfect schedule for your team, while automating payroll management.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Free Trial →</span>
                  <motion.div
                    className="absolute inset-0 bg-blue-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  View Demo
                </motion.button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex items-center gap-2 text-gray-600"
              >
                <HiShieldCheck className="text-green-500 text-xl" />
                <span>No credit card required for trial</span>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 50 
              }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80"
                  alt="Workforce Management"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">Live Demo Available</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-grid-pattern"
        />
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Powerful Features, <span className="text-blue-600">Built for Teams</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Shiftwise solves the most complex scheduling challenges while keeping the human experience at the center.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                </div>
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform">
                  {feature.icon}
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* After Features Grid section and before Testimonials section */}
      {/* Pricing Section */}
      <section className="py-20 px-4 md:px-8 bg-white/90 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, <span className="text-blue-600">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <span className={`text-lg ${!isAnnual ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isAnnual ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isAnnual ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                Annually <span className="text-green-500 text-sm">(Save 20%)</span>
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'border-2 border-blue-500 shadow-xl'
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/month</span>
                  {isAnnual && (
                    <div className="text-green-500 text-sm mt-1">
                      Billed annually (${plan.yearlyPrice}/year)
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <HiCheck className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Enterprise Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center bg-gray-50 rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer tailored solutions for large enterprises with specific requirements.
              Get in touch with our sales team to discuss your needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Trusted by <span className="text-blue-600">Businesses Worldwide</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              See what our customers have to say about how Shiftwise has transformed their workforce management.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-yellow-400"
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your workforce management?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses already using Shiftwise to save time, reduce costs, and create happier teams.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">Start Your Free Trial →</span>
              <motion.div
                className="absolute inset-0 bg-gray-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features; 