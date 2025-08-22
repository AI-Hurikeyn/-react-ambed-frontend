import { ReactNode } from 'react';

// Core application types
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isScrollLink?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  thumbnail: string;
  description?: string;
  gallery?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar: string;
  socialLinks?: SocialLink[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface SliderSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface CompanyInfo {
  name: string;
  tagline?: string;
  description: string;
  logo: {
    dark: string;
    light: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  socialLinks: SocialLink[];
  yearsOfExperience: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ContactFormResponse extends ApiResponse<null> {
  submitted: boolean;
}

// Component Props types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

// WordPress specific types (for preserving original functionality)
export interface WordPressAsset {
  handle: string;
  src: string;
  deps?: string[];
  version?: string;
  media?: string;
}

export interface ElementorData {
  id: string;
  type: string;
  settings: Record<string, any>;
  elements?: ElementorData[];
}

// Animation and interaction types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  trigger?: 'scroll' | 'hover' | 'click';
}

export interface SwiperConfig {
  slidesPerView: number;
  loop: boolean;
  autoplay?: {
    delay: number;
  };
  navigation?: boolean;
  pagination?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
}
