"use client";

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { CAAMButton } from "./CAAMButton"

// Define types outside the component for SSG
type NavItem = {
  title: string;
  href?: string;
  items?: {
    title: string;
    href: string;
    description: string;
  }[];
};

// Define navigation items outside the component for SSG
const navItems: NavItem[] = [
  {
    title: "Events",
    items: [
      // { title: "CAAM Conference 2025", href: "/conference", description: "Join our annual flagship conference" },
      // { title: "Ayurveda Day 2024", href: "/ayurvedaday", description: "Celebrate the ancient wisdom of Ayurveda" },
      { title: "Clinical Immersion", href: "/clinical-immersion", description: "Hands-on clinical training experiences" },
      { title: "Chai with CAAM", href: "/chai-with-caam", description: "Community conversations" },
      { title: "Event Calendar", href: "/calendar", description: "Browse all upcoming events" },
    ],
  },
  {
    title: "Learn",
    items: [
      { title: "What is Ayurveda?", href: "/what-is-ayurveda", description: "Discover the science of life" },
      { title: "Study Ayurveda", href: "/study-ayurveda", description: "Educational pathways and resources" },
      { title: "Professional Directory", href: "/professional-directory", description: "Find Ayurvedic practitioners" },
      { title: "Blog & Resources", href: "/blog", description: "Articles, research and community insights" },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { title: "Become a Member", href: "/membership", description: "Join our thriving community" },
      { title: "Volunteer", href: "/volunteer", description: "Contribute your skills and time" },
      { title: "Marketplace", href: "/classifieds", description: "Products, services and opportunities" },
    ],
  },
  {
    title: "About Us",
    items: [
      { title: "Our Story", href: "/history", description: "The journey of CAAM" },
      { title: "Board & Leadership", href: "/meet-the-board", description: "Meet our dedicated team" },
      { title: "Committees", href: "/committees", description: "Our specialized working groups" },
      { title: "Contact Us", href: "/contact", description: "Get in touch with our team" },
    ],
  },
];

// Static ListItem component for SSG
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-gold-light/10",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none mb-2 text-dark-green">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug navigation-menu-content">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Client-side only mobile menu component
const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        className="h-10 w-10 rounded-full p-0 text-dark-green hover:bg-gold-light/20 hover:text-gold-light"
        size="icon"
        onClick={toggleMenu}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-24 inset-x-0 mobile-menu rounded-b-lg z-50 overflow-hidden">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="font-medium text-lg mobile-menu-item">{item.title}</div>
                {item.items && (
                  <div className="pl-4 space-y-2 border-l-2 border-emerald-100">
                    {item.items.map((subItem) => (
                      <Link 
                        key={subItem.title} 
                        href={subItem.href}
                        className="block text-sm mobile-menu-item transition-all duration-200"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
              <CAAMButton
                href="https://donate.stripe.com/bIY5lE08J4nmbMQaEE"
                variant="secondary"
                external={true}
                className="w-full animate-pulse-subtle"
              >
                Donate
              </CAAMButton>
              <CAAMButton
                href="https://caam-connect.mn.co/"
                external={true}
                className="w-full"
              >
                Member Login
              </CAAMButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Navbar styles including donate button animation
const NavbarStyles = () => (
  <style jsx global>{`
    /* Subtle pulse animation for the donate button */
    @keyframes pulse-subtle {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      50% {
        transform: scale(1.03);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
    }
    
    .donate-button-pulse {
      animation: pulse-subtle 3s ease-in-out infinite;
    }
  `}</style>
);

// Hydration-safe Navbar component
const Navbar = () => {
  // Track if we're on the client side for hydration-sensitive components
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full navbar">
      {/* Global styles for navbar */}
      <NavbarStyles />
      <div className="container">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/" className="flex items-center space-x-2 transition-all duration-200 hover:opacity-90">
              <div className="relative h-14 w-14 overflow-hidden">
                <Image
                  src="/assets/logos/caam-logo-dark.png"
                  alt="CAAM Logo"
                  fill
                  priority
                  sizes="56px"
                  className="object-contain"
                />
              </div>
            </Link>
          
            {/* Desktop Navigation - Only render client-side interactive elements when mounted */}
            {isMounted ? (
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="gap-1">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.items ? (
                        <>
                          <NavigationMenuTrigger 
                            className="text-base navbar-menu-item bg-transparent"
                          >
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="mobile-menu">
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {item.items.map((subItem) => (
                                <ListItem
                                  key={subItem.title}
                                  title={subItem.title}
                                  href={subItem.href}
                                >
                                  {subItem.description}
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link href={item.href || '#'} legacyBehavior passHref>
                          <NavigationMenuLink>
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              // Static placeholder during SSR to prevent hydration mismatch
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <div key={item.title} className="text-base font-medium text-dark py-2">
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <CAAMButton
              href="https://donate.stripe.com/bIY5lE08J4nmbMQaEE"
              variant="secondary"
              external={true}
              className="animate-pulse-subtle"
            >
              Donate
            </CAAMButton>
            <CAAMButton
              href="https://caam-connect.mn.co/"
              external={true}
            >
              Member Login
            </CAAMButton>
          </div>

          {/* Mobile menu button - Only rendered client-side */}
          {isMounted ? (
            <MobileMenu />
          ) : (
            // Static placeholder during SSR
            <div className="md:hidden h-10 w-10"></div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
