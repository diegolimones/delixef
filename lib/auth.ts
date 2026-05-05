import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseServer } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña requeridos');
        }

        try {
          // Get admin user from Supabase
          const { data: adminUser, error } = await supabaseServer
            .from('admin_users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (error || !adminUser) {
            throw new Error('Usuario o contraseña inválidos');
          }

          // In a real application, use bcrypt to compare passwords
          // For now, using simple comparison (NOT for production)
          if (adminUser.password_hash !== credentials.password) {
            throw new Error('Usuario o contraseña inválidos');
          }

          return {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.full_name,
          };
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Error al autenticar';
          throw new Error(msg);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
