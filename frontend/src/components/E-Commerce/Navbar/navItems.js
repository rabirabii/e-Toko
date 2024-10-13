import React from "react";
import { Linkedin, ShoppingBag, Info, Mail, BookOpen } from "lucide-react";

export const navItems = [
  { name: "Shop", path: "/shop", icon: ShoppingBag },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Mail },
  { name: "Blog", path: "/blog", icon: BookOpen },
  // Social media links without 'icon' components
];

export const socialMediaLinks = [
  {
    name: "Instagram",
    path: "https://www.instagram.com",
    isSocial: true,
    icon: Linkedin,
  },
  {
    name: "Twitter",
    path: "https://www.twitter.com",
    isSocial: true,
    icon: Linkedin,
  },
  {
    name: "LinkedIn",
    path: "https://www.linkedin.com",
    icon: Linkedin,
    isSocial: true,
  },
];
