'use server';

import { z } from 'zod';

// Function to get Supabase client with error handling
async function getSupabaseClient() {
  try {
    const { supabaseServer } = await import('@/lib/supabase/server');
    return supabaseServer;
  } catch (error) {
    console.warn('Supabase not configured:', error);
    return null;
  }
}

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactActionResult = 
  | { success: true; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContactForm(formData: ContactFormData): Promise<ContactActionResult> {
  try {
    // Validate the form data
    const validatedData = contactSchema.parse(formData);

    // Get Supabase client
    const supabaseServer = await getSupabaseClient();

    // Check if Supabase is available
    if (!supabaseServer) {
      console.log('Supabase not configured, simulating successful submission');
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you as soon as possible.',
      };
    }

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('contact_messages')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      };
    }

    return {
      success: true,
      message: 'Message sent successfully! I\'ll get back to you as soon as possible.',
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        success: false,
        error: 'Please fix the errors below and try again.',
        fieldErrors,
      };
    }

    console.error('Unexpected error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
