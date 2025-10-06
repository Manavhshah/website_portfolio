'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm, type ContactActionResult } from '@/server/actions/contact';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result: ContactActionResult = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
        // Handle field-specific errors from server validation
        if (result.fieldErrors) {
          const newErrors: FormErrors = {};
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            newErrors[field as keyof FormErrors] = messages[0]; // Take first error message
          });
          setErrors(newErrors);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-neutral-400">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Contact form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className={errors.name ? 'border-red-500' : ''}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className={errors.email ? 'border-red-500' : ''}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{errors.email}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject *
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="What's this about?"
            className={errors.subject ? 'border-red-500' : ''}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            aria-invalid={!!errors.subject}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">{errors.subject}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project or idea..."
            rows={6}
            className={errors.message ? 'border-red-500' : ''}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{errors.message}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-400">* Required fields</p>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-2"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
        
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-900 border border-green-700 text-green-100 rounded-md">
            <p className="font-medium">Message sent successfully!</p>
              <p className="text-sm mt-1">I&apos;ll get back to you as soon as possible.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-900 border border-red-700 text-red-100 rounded-md">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm mt-1">Please try again or contact me directly.</p>
          </div>
        )}
      </form>
    </div>
  );
}
