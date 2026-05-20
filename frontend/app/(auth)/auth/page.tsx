'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type AuthMode = 'idle' | 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('idle');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center overflow-hidden font-sans'>
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none' />

      <AnimatePresence>
        {mode !== 'idle' && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setMode('idle')}
            className='absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors z-50 bg-slate-900/40 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-full'
          >
            <ArrowLeft size={16} /> Back
          </motion.button>
        )}
      </AnimatePresence>
      <div className='relative w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center select-none'>
        <div className='relative flex flex-col items-center justify-center tracking-tighter leading-none font-black text-[10vw] md:text-[8vw] uppercase pointer-events-none'>
          {/* LOG IN టెక్స్ట్ */}
          <motion.div
            animate={{
              scale: mode === 'login' ? 1.2 : mode === 'register' ? 0.8 : 1,
              opacity:
                mode === 'login' ? 0.15 : mode === 'register' ? 0.02 : 0.4,
              y: mode === 'login' ? -40 : mode === 'register' ? -100 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'text-transparent bg-clip-text bg-linear-to-b from-slate-200 to-slate-500 transition-all duration-500',
              mode === 'idle' &&
                'hover:opacity-80 pointer-events-auto cursor-pointer',
            )}
            onClick={() => mode === 'idle' && setMode('login')}
          >
            LOG IN
          </motion.div>

          {/* REGISTER టెక్స్ట్ */}
          <motion.div
            animate={{
              scale: mode === 'register' ? 1.2 : mode === 'login' ? 0.8 : 1,
              opacity:
                mode === 'register' ? 0.15 : mode === 'login' ? 0.02 : 0.4,
              y: mode === 'register' ? 40 : mode === 'login' ? 100 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'text-transparent bg-clip-text bg-linear-to-b from-slate-300 to-slate-600 mt-2 transition-all duration-500',
              mode === 'idle' &&
                'hover:opacity-80 pointer-events-auto cursor-pointer',
            )}
            onClick={() => mode === 'idle' && setMode('register')}
          >
            REGISTER
          </motion.div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-10'>
          <AnimatePresence mode='wait'>
            {/* 1. లాగిన్ ఫార్మ్ */}
            {mode === 'login' && (
              <motion.form
                key='login-form'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onSubmit={(e) => e.preventDefault()}
                className='w-full max-w-sm flex flex-col gap-4 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl pointer-events-auto'
              >
                <div className='mb-2'>
                  <h3 className='text-xl font-bold text-white'>Welcome Back</h3>
                  <p className='text-xs text-slate-400 mt-1'>
                    Login to your account
                  </p>
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-semibold text-slate-400'>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type='email'
                    placeholder='name@example.com'
                    className='w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1 relative'>
                  <label className='text-xs font-semibold text-slate-400'>
                    PASSWORD
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-7 text-slate-500 hover:text-slate-300 transition-colors'
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type='submit'
                  className='w-full mt-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]'
                >
                  Sign In <ArrowRight size={16} />
                </button>
              </motion.form>
            )}
            {mode === 'register' && (
              <motion.form
                key='register-form'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onSubmit={(e) => e.preventDefault()}
                className='w-full max-w-md flex flex-col gap-4 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl pointer-events-auto'
              >
                <div className='mb-2'>
                  <h3 className='text-xl font-bold text-white'>
                    Create Account
                  </h3>
                  <p className='text-xs text-slate-400 mt-1'>
                    Continue your journeyn today
                  </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-xs font-semibold text-slate-400'>
                      FULL NAME
                    </label>
                    <input
                      type='text'
                      placeholder='John Doe'
                      className='w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-xs font-semibold text-slate-400'>
                      EMAIL ADDRESS
                    </label>
                    <input
                      type='email'
                      placeholder='name@example.com'
                      className='w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-1 relative'>
                    <label className='text-xs font-semibold text-slate-400'>
                      PASSWORD
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1 relative'>
                    <label className='text-xs font-semibold text-slate-400'>
                      CONFIRM PASSWORD
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors'
                      required
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full mt-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]'
                >
                  Register Now <ArrowRight size={16} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        {mode === 'idle' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className='absolute -bottom-15 text-xs tracking-widest text-slate-400 uppercase pointer-events-none'
          >
            Click any option to continue
          </motion.p>
        )}
      </div>
    </div>
  );
}
