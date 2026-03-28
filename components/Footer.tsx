"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Heart
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Youtube className="w-5 h-5" />, href: "#" },
  ];

  const quickLinks = [
    { name: t.footer.links.about, href: "#about" },
    { name: t.footer.links.destinations, href: "#destinations" },
    { name: t.footer.links.events, href: "#events" },
    { name: t.footer.links.gallery, href: "#gallery" },
  ];

  const legalLinks = [
    { name: t.footer.links.privacy, href: "#" },
    { name: t.footer.links.terms, href: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black text-white tracking-tighter">
                GoWith<span className="text-indigo-500">Flow</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -5, color: "#6366f1" }}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 transition-colors border border-slate-700"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-500 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t.footer.contactUs}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0 border border-slate-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-slate-400 pt-2 leading-tight">
                  {t.footer.address}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0 border border-slate-700">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-slate-400">
                  {t.footer.phone}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0 border border-slate-700">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-slate-400">
                  {t.footer.email}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6 p-8 bg-indigo-600/10 rounded-3xl border border-indigo-500/10 backdrop-blur-sm">
            <h4 className="text-white font-bold text-lg leading-tight">
              Ready for your next adventure?
            </h4>
            <p className="text-sm text-slate-400">
              Join our newsletter for exclusive tour packages and travel tips.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="absolute right-1.5 top-1.5 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500">
            © {currentYear} GoWithFlow Travel Agency. {t.footer.rights}
          </p>
          <div className="flex items-center gap-8">
            {legalLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> in Sylhet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
