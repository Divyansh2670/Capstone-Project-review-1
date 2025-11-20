'use client';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { CheckCircle, Users, BarChart, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '../lib/placeholder-images';
import { Logo } from '../components/logo';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';


const features = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Contact Management',
    description: 'Effortlessly organize and track your contacts with a clean, intuitive interface.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Task Tracking',
    description: 'Link tasks to contacts and never miss a follow-up. Stay on top of your schedule.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Dashboard Insights',
    description: 'Get a quick overview of your CRM activity with at-a-glance analytics.',
  },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    frequency: '/ month',
    description: 'For individuals and small teams just getting started.',
    features: [
      'Basic Contact Management',
      'Task Tracking for up to 10 tasks',
      'Standard Dashboard',
    ],
    cta: 'Get Started for Free',
    isFeatured: false,
  },
  {
    name: 'Pro',
    price: '$5',
    frequency: '/ month',
    description: 'For growing businesses that need more power.',
    features: [
      'Everything in Free',
      'Unlimited Tasks',
      'AI-Powered Note Summarization',
      'Priority Support',
    ],
    cta: 'Choose Pro',
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: '$15',
    frequency: '/ month',
    description: 'For large organizations with advanced needs.',
    features: [
      'Everything in Pro',
      'Advanced Analytics',
      'Custom Integrations',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    isFeatured: false,
  },
];

const resources = [
    {
        id: 'resource-what-is-crm',
        title: 'What is a CRM?',
        description: 'CRM software is a system for managing customer relationships. Learn more about the benefits of a modern CRM and why it might be time to ditch the spreadsheets.',
    },
    {
        id: 'resource-getting-started',
        title: 'Getting Started with Your CRM',
        description: 'Learn more about the main components of ClientCraft CRM and how to start managing your CRM database effectively from day one.',
    },
    {
        id: 'resource-integrations',
        title: 'The Power of CRM Integrations',
        description: 'Find out how integrating with third-party apps and tools can extend the power of your free ClientCraft CRM and streamline your workflow.',
    },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'landing-hero');

export default function Home() {
    const [isPricingVisible, setIsPricingVisible] = useState(false);
    const pricingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            setIsPricingVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
        );

        if (pricingRef.current) {
        observer.observe(pricingRef.current);
        }

        return () => {
        if (pricingRef.current) {
            observer.unobserve(pricingRef.current);
        }
        };
    }, []);

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo href="/" />
          <nav className="hidden items-center gap-4 md:flex">
             <Button variant="ghost" asChild>
                <Link href="/about-us">About Us</Link>
            </Button>
            <Button variant={isPricingVisible ? 'default' : 'ghost'} asChild>
                <Link href="/#pricing">Pricing</Link>
            </Button>
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                <Link href="/register">Get Started</Link>
                </Button>
            </div>
          </nav>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                 <Link href="/about-us" className="text-muted-foreground hover:text-foreground">About Us</Link>
                 <Link href="/#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                 <Link href="/login" className="text-muted-foreground hover:text-foreground">Login</Link>
                 <Link href="/register" className="text-foreground">Get Started</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background pt-12 pb-20 md:pb-32">
          <div className="container grid grid-cols-1 items-center gap-8 text-center md:grid-cols-2 md:text-left">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Simple. Fast. Effective.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                ClientCraft is a minimalistic and modern CRM designed to help you manage relationships, not just contacts. Focus on what truly matters.
              </p>
              <Button size="lg" asChild>
                <Link href="/register">Get Started for Free</Link>
              </Button>
            </div>
            <div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="mx-auto rounded-xl object-cover shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        {/* Why This CRM? Section */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Why ClientCraft CRM?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Built for speed and simplicity, not for overwhelming you with features.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" ref={pricingRef} className="py-20 md:py-24 text-center">
            <div className="container">
                <div className="mb-12 text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Find the Right Plan for You</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Simple, transparent pricing that scales with your needs.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                {pricingTiers.map((tier) => (
                    <Card key={tier.name} className={`flex flex-col ${tier.isFeatured ? 'border-primary shadow-lg' : ''}`}>
                        <CardHeader>
                            <CardTitle>{tier.name}</CardTitle>
                            <CardDescription>{tier.description}</CardDescription>
                            <div>
                                <span className="text-4xl font-bold">{tier.price}</span>
                                <span className="text-muted-foreground">{tier.frequency}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4 text-left">
                            {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className={`w-full ${!tier.isFeatured ? 'bg-primary' : ''}`} variant={tier.isFeatured ? 'default' : 'outline'} asChild>
                                <Link href="/register">{tier.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 md:py-24 bg-background">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">See How CRM Can Propel Your Growth</h2>
              <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
                New to CRM? Check out these helpful resources to learn why growing businesses consider CRM software essential, and how it creates a competitive advantage from day one.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {resources.map((resource) => {
                const image = PlaceHolderImages.find(p => p.id === resource.id);
                return (
                  <Card key={resource.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                     {image && (
                      <Image
                        src={image.imageUrl}
                        alt={resource.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle>
                        <Link href="#" className="hover:underline">{resource.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>


        {/* Call to Action Footer Section */}
        <section className="bg-muted py-20">
          <div className="container text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Streamline Your Workflow?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join now and experience a CRM that works for you, not against you.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/register">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background py-6">
        <div className="container flex items-center justify-between">
          <Logo href="/" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ClientCraft CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
