"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Bookmark, Lock } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const FeaturedLessons = ({ lesson = [] }) => {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;
  const isPremiumUser = currentUser?.plan === "premium" || currentUser?.isPremium;

  return (
    <section className="py-20 px-6 bg-[#fcf8f9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">Handpicked Wisdom</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#670D2F] mt-2">Featured Insights</h2>
          </div>
          <Link href="/public-lessons" className="flex items-center gap-2 text-[#670D2F] font-semibold hover:gap-4 transition-all">
            Explore All Lessons <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lesson.map((lesson, i) => {
            const isLocked = (lesson.accesslevel === "premium" || lesson.accessLevel === "premium") && !isPremiumUser && currentUser?.role !== "admin";

            return (
              <motion.div
                key={lesson._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all relative flex flex-col justify-between min-h-[480px]"
              >
                {/* Blurred content wrapper when locked */}
                <div className={`flex-1 flex flex-col justify-between ${isLocked ? "filter blur-[4px] pointer-events-none select-none" : ""}`}>
                  <div>
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden bg-gray-100">
                      <img 
                        src={lesson.image || "/logo.webp"} 
                        alt={lesson.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#670D2F] z-10">
                        {lesson.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {lesson.views || 0}</span>
                        <span className="flex items-center gap-1"><Bookmark className="w-3 h-3" /> {lesson.savedCount || 0}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#670D2F] mb-3 group-hover:text-pink-600 transition">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="w-full text-center py-3 rounded-xl bg-[#670D2F] text-white font-bold">
                      Read Insight
                    </div>
                  </div>
                </div>

                {/* Overlay upgrade option when locked */}
                {isLocked ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-[2px] z-20">
                    <Lock className="w-10 h-10 text-[#670D2F] mb-3" />
                    <span className="text-[10px] font-black text-amber-900 bg-yellow-400 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow">
                      Premium Lesson
                    </span>
                    <Link 
                      href="/pricing" 
                      className="w-full text-center py-3 bg-[#670D2F] hover:bg-[#5a0b27] text-white rounded-xl font-bold transition shadow-lg shadow-[#670D2F]/20 cursor-pointer"
                    >
                      Upgrade to Unlock
                    </Link>
                  </div>
                ) : (
                  <Link href={`/lesson/${lesson._id}`} className="absolute inset-0 z-10" />
                )}

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;