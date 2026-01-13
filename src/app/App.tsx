import {
  Linkedin,
  Mail,
  Code,
  Briefcase,
  Calendar,
  Zap,
  WandSparkles,
} from "lucide-react";
import { ImageWithFallback } from "./components/ui/ImageWithFallback";
import VisitorCounter from "./components/ui/visitor-counter";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import photo from "./assets/images/photo.jpeg";
import cv from "./assets/doc/cv.pdf";


export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        "Nuxt.js",
        "TypeScript",
        "Tailwind CSS",
        "Javascript", 
        "Bootstrap", 
      ],
    },
    {
      category: "Backend",
      technologies: [
        "Java(Spring Framework, Quarkus)",
        "PHP(CodeIgniter, Laravel)",
      ],
    },
    {
      category: "Tools",
      technologies: [
        "Git",
        "Docker",
        "Netbeans",
        "VS Code",
        "Postman",
      ],
    },
    {
      category: "Other",
      technologies: [
        "Oracle DB",
        "REST APIs",
        "PostgreSQL",
        "MySQL",
        "Kafka",
      ],
    },
  ];

  const projects = [
    {
      title: "Microservices",
      description:
        "Backend microservice application for handling various business logic and data processing tasks.",
      tech: ["Java Quarkus", "PostgreSQL", "Oracle DB"],
      link: "#",
      year: "Current Project",
    },
    {
      title: "Management Personal Data",
      description:
        "A web application for managing personal data with features like data entry, validation, realtime chat, and reporting.",
      tech: ["Nuxt.js", "Java Springboot", "PostgreSQL", "Tailwind CSS", "Websocket", "JWT"],
      link: "#",
      year: "2025",
    },
    {
      title: "Cash Management System",
      description:
        "A comprehensive cash management system for tracking transactions, generating reports, and managing financial data.",
      tech: ["PHP Codeigniter", "Javascript", "Bootstrap", "MySQL"],
      link: "#",
      year: "2024",
    },
    {
      title: "Tax Reporting System",
      description:
        "A web application for generating and managing tax reports and export features.",
      tech: ["PHP", "Javascript", "Bootstrap", "MySQL"],
      link: "#",
      year: "2024",
    },
    {
      title: "Infrastructure and Project Management Dashboard",
      description:
        "A dashboard for monitoring infrastructure or project metrics with data visualization and reporting features.",
      tech: ["Nuxt.js", "Java Springboot", "PostgreSQL", "Tailwind CSS", "JWT"],
      link: "#",
      year: "2024",
    },
    {
      title: "Data Management",
      description:
        "A web application for managing data.",
      tech: ["Bootstrap", "Java Springboot", "Oracle DB", "PostgreSQL"],
      link: "#",
      year: "2022-2023",
    },
  ];

  const experiences = [
    {
      role: "Senior Backend Developer",
      company: "PLN Icon Plus",
      period: "2025 - Present",
      description:
        "Backend developer responsible for implementing scalable microservices architecture to support various business functionalities.",
      highlights: [
        "Implemented reactive microservices architecture using Java Quarkus",
        "Migrate oracle database to postgreSQL database",
        "Migrate oracle PL/SQL to Java services",
      ],
    },
    {
      role: "Software Engineer",
      company: "Mega Bank",
      period: "2024 - 2025",
      description:
        "Developed dashboard web application for internal use, focusing on performance and user experience improvements.",
      highlights: [
        "Built responsive web applications using modern frameworks",
        "Analyzed system design and database architecture with business team",
        "Implemented authentication and authorization mechanisms using JWT or sessions",
        "Create realtime chat feature using WebSocket technology",
        "Do testing and debugging to ensure high-quality software delivery",
        "Create reporting feature to export data in various formats",
        "Create documentation for application features and functionalities",
      ],
    },
    {
      role: "Junior Fullstack Developer",
      company: "Astra Honda Motor",
      period: "2023 - 2024",
      description:
        "Create java website data management based on business needs and improve website performance.",
      highlights: [
        "Developed data management web application",
        "Optimize code and database queries to enhance performance",
        "Migrate application to newer versions of frameworks and libraries",
      ],
    },
  ];

  const email = "patriasp809@gmail.com";
  const linkedIn = "https://www.linkedin.com/in/patria-sp/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-6 py-24"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                drag
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full mb-6 cursor-grab"
              >
                <span className="text-blue-300 flex items-center gap-2">
                  <WandSparkles className="size-4" />
                  Software Engineer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                Hello, I'm{" "}
                <motion.span 
                  className="text-blue-400 inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Patria Satridwi Pangga
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-300 mb-8 max-w-2xl"
              >
                Experience software engineer with
                clean code and modern technologies. Passionate
                about creating scalable applications that solve
                many problems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4 justify-center md:justify-start"
              >
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  View Work
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={cv}
                  download
                  className="px-8 py-3 bg-green-700 hover:bg-green-600 rounded-lg transition-colors"
                >
                  Download CV
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-6 mt-8 justify-center md:justify-start"
              >
                {[
                  { icon: Linkedin, href: linkedIn },
                  { icon: Mail, href: "mailto:" + email },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target={social.icon !== Mail ? "_blank" : undefined}
                    rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <social.icon className="size-6" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-80 h-80 rounded-2xl overflow-hidden border-4 border-blue-500/20 shadow-2xl"
              >
                <ImageWithFallback
                  src={photo}
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
              <Code className="size-6" />
              <span className="uppercase tracking-wider">
                Tech Stack
              </span>
            </div>
            <h2 className="text-slate-900 mb-4">
              Technologies I Work With
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              This is some of the technologies and tools I use
              to build modern applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                drag
                dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.08, cursor: "grabbing", rotate: 3 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-slate-200 cursor-grab"
              >
                <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="size-5 text-blue-600" />
                  {stack.category}
                </h3>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {stack.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ scale: 1.1 }}
                      drag
                      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                      dragElastic={0.5}
                      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm transition-colors hover:bg-blue-500 hover:text-white cursor-grab"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
              <Code className="size-6" />
              <span className="uppercase tracking-wider">
                Portfolio
              </span>
            </div>
            <h2 className="text-slate-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A selection some of my projects
              private and professional work 
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.05, cursor: "grabbing", rotate: 2 }}
                className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300 cursor-grab"
              >
                <div className="flex justify-between items-start mb-4">
                  <motion.h3 
                    className="text-slate-900"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.span 
                    className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    drag
                    dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.15, cursor: "grabbing" }}
                  >
                    {project.year}
                  </motion.span>
                </div>
                <p className="text-slate-600 mb-6">
                  {project.description}
                </p>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      drag
                      dragConstraints={{ left: -15, right: 15, top: -15, bottom: 15 }}
                      dragElastic={0.5}
                      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
                      className="px-3 py-1 bg-blue-100 text-slate-700 rounded-md text-sm cursor-grab"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                {/* <motion.a
                  whileHover={{ x: 5 }}
                  href={project.link}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>View Project</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink className="size-4" />
                  </motion.div>
                </motion.a> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
              <Briefcase className="size-6" />
              <span className="uppercase tracking-wider">
                Experience
              </span>
            </div>
            <h2 className="text-slate-900 mb-4">
              Work History
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              My professional journey and key achievements in
              software development
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                drag
                dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.03, cursor: "grabbing", rotate: 1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-grab"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <motion.h3 
                      className="text-slate-900 mb-2"
                      whileHover={{ x: 5 }}
                    >
                      {exp.role}
                    </motion.h3>
                    <p className="text-blue-600">
                      {exp.company}
                    </p>
                  </div>
                  <motion.div 
                    className="inline-flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    drag
                    dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                  >
                    <Calendar className="size-4" />
                    <span>{exp.period}</span>
                  </motion.div>
                </div>
                <p className="text-slate-600 mb-6">
                  {exp.description}
                </p>
                <motion.ul 
                  className="space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <motion.li
                      key={highlightIndex}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <motion.div 
                        className="size-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: highlightIndex * 0.2 }}
                      />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Counter Section */} 
      <section id="visitorcounter" className="relative py-16 px-6 bg-white/50 backdrop-blur-sm">
        <VisitorCounter />
      </section>
      
      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            Let's Work Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 mb-8 text-xl"
          >
            I'm always interested in hearing about new projects
            and opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href={"mailto:" + email}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Mail className="size-5" />
              <span>Send Email</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Linkedin className="size-5" />
              <span>Connect on LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          <p>
            © 2023 Patria Satridwi Pangga
          </p>
        </motion.div>
      </footer>
    </div>
  );
}