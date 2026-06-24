"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, User, Award, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function HomeDynamicSections({ topContributors = [], mostSaved = [] }) {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;
  const isPremiumUser = currentUser?.plan === "premium" || currentUser?.isPremium;

  return (
    <div className="bg-[#fcf8f9] pb-24">
      {/* SECTION 1: TOP CONTRIBUTORS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">
            Community Leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#670D2F] mt-2">
            Top Contributors of the Week
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            These active minds have shared the most wisdom with our community recently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topContributors.map((c, i) => (
            <motion.div
              key={c._id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] border border-[#670D2F]/10 p-6 flex items-center gap-5 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#670D2F]/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#670D2F]/10 flex items-center justify-center text-[#670D2F] font-bold">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white rounded-full p-1 border-2 border-white">
                  <Award className="w-4 h-4 text-amber-900" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight">{c.name || "Anonymous"}</h4>
                <p className="text-gray-500 text-sm mt-1">{c.count} lessons shared</p>
                {/* View all lessons by this contributor */}
                <Link
                  href={`/public-lessons?search=${c.name}`}
                  className="inline-flex items-center text-xs font-bold text-[#670D2F] mt-2 hover:underline"
                >
                  View lessons <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: MOST SAVED LESSONS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">
            Popular Wisdom
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#670D2F] mt-2">
            Most Saved Lessons
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            The most cherished insights stored by the community for daily reflection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mostSaved.map((lesson, i) => {
            const isLocked = (lesson.accesslevel === "premium" || lesson.accessLevel === "premium") && !isPremiumUser && currentUser?.role !== "admin";

            return (
              <motion.div
                key={lesson._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all flex flex-col justify-between relative min-h-[480px]"
              >
                {/* Blurred content wrapper when locked */}
                <div className={`flex-1 flex flex-col justify-between ${isLocked ? "filter blur-[4px] pointer-events-none select-none" : ""}`}>
                  <div>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {lesson.image ? (
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#670D2F]/5 flex items-center justify-center text-gray-300">
                          Wisdom Image
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#670D2F] z-10">
                        {lesson.category}
                      </div>
                      {lesson.accesslevel === "premium" || lesson.accessLevel === "premium" ? (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-amber-950 font-extrabold text-[10px] px-3 py-1 rounded-full tracking-wide shadow z-10">
                          ⭐ PREMIUM
                        </div>
                      ) : null}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-bold bg-pink-50 px-2.5 py-1 rounded-lg">
                          <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
                          {lesson.likesCount || 0} Saves
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(lesson.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#670D2F] line-clamp-2 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Button Placeholder (blurred) */}
                  <div className="px-6 pb-6 pt-2">
                    <div className="w-full text-center py-3 rounded-xl bg-[#670D2F] text-white font-bold">
                      See Details
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
      </section>
    </div>
  );
}
