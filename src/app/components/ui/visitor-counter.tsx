import React, { useRef, useEffect, useState } from "react";
import { Users, Eye, Globe, DoorOpen } from "lucide-react";
import { db } from "../../../lib/firebase";
import { doc, runTransaction, increment, onSnapshot, collection, query, orderBy, limit, documentId } from "firebase/firestore";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [todayCount, setTodayCount] = useState<number | null>(null);
    const [dailyAverage, setDailyAverage] = useState<number | null>(null);
    const [pageViews, setPageViews] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // Use local date (YYYY-MM-DD) so each device only increments once per day
    const todayId = new Date().toLocaleDateString("en-CA"); // e.g. 2026-01-13
    const LOCAL_KEY = `visitor_counted_${todayId}`;

    function AnimatedCounter({ target, suffix = "" }: { target: number | null; suffix?: string }) {
        const [count, setCount] = useState(0);
        const ref = useRef<HTMLSpanElement>(null);
        const isInView = useInView(ref, { once: true });

        useEffect(() => {
            if (!isInView) return;

            const targetNumber = target ?? 0;
            let startTime: number | null = null;
            const duration = 1000;

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                setCount(Math.floor(progress * targetNumber));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [isInView, target]);

        return <span ref={ref}>{count}{suffix}</span>;
    }

    useEffect(() => {
        const totalRef = doc(db, "counters", "visitors");
        const todayRef = doc(db, "dailyVisitors", todayId);
        const pageRef = doc(db, "counters", "pageViews");

        // Total visitors listener
        const unsubTotal = onSnapshot(
            totalRef,
            (snapshot) => {
                const value = snapshot.exists() ? (snapshot.data() as any).count ?? 0 : 0;
                setCount(value);
                setLoading(false);
            },
            (err) => {
                console.error("Visitor counter listener error:", err);
                setLoading(false);
            }
        );

        // Today's visitors listener
        const unsubToday = onSnapshot(
            todayRef,
            (snapshot) => {
                const value = snapshot.exists() ? (snapshot.data() as any).count ?? 0 : 0;
                setTodayCount(value);
            },
            (err) => {
                console.error("Today visitor listener error:", err);
            }
        );

        // Page views listener (read-only; do not increment on mount)
        const unsubPage = onSnapshot(
            pageRef,
            (snapshot) => {
                const value = snapshot.exists() ? (snapshot.data() as any).count ?? 0 : 0;
                setPageViews(value);
            },
            (err) => {
                console.error("Page views listener error:", err);
            }
        );

        // 30-day average listener (last 30 docs ordered by date / doc id)
        const q = query(collection(db, "dailyVisitors"), orderBy(documentId(), "desc"), limit(30));
        const unsubAvg = onSnapshot(
            q,
            (snapshot) => {
                let sum = 0;
                snapshot.forEach((d) => {
                    sum += (d.data() as any).count ?? 0;
                });
                const days = snapshot.size;
                setDailyAverage(days > 0 ? Math.round(sum / days) : 0);
            },
            (err) => {
                console.error("Daily average listener error:", err);
            }
        );

        // Increment once per device per day (avoid double counting during refreshes)
        const counted = localStorage.getItem(LOCAL_KEY);
        if (!counted) {
            runTransaction(db, async (tx) => {
                const snapTotal = await tx.get(totalRef);
                const snapToday = await tx.get(todayRef);

                // Update total
                if (!snapTotal.exists()) {
                    tx.set(totalRef, { count: 1 });
                } else {
                    tx.update(totalRef, { count: increment(1) });
                }

                // Update today's count
                if (!snapToday.exists()) {
                    tx.set(todayRef, { count: 1, date: todayId });
                } else {
                    tx.update(todayRef, { count: increment(1) });
                }
            })
                .then(() => {
                    try {
                        localStorage.setItem(LOCAL_KEY, Date.now().toString());
                    } catch (e) {
                        // ignore
                    }
                })
                .catch((e) => {
                    console.error("Failed to increment visitor counter", e);
                });
        }
        // Increment page views on each visit
        runTransaction(db, async (tx) => {
            const snapPage = await tx.get(pageRef);
            if (!snapPage.exists()) {
                tx.set(pageRef, { count: 1 });
            } else {
                tx.update(pageRef, { count: increment(1) });
            }
        }).catch((e) => {
            console.error("Failed to increment page views", e);
        });

        return () => {
            unsubTotal();
            unsubToday();
            unsubPage();
            unsubAvg();
        };
    }, [todayId]);

    const visitorStats = [
        { label: "Total Visitors", value: count ?? 0, icon: Globe, color: "text-green-600" },
        { label: "Today Visitors", value: todayCount ?? 0, icon: Users, color: "text-blue-600" },
        { label: "Page Views", value: pageViews ?? 0, icon: Eye, color: "text-purple-600" },
        { label: "Avg Daily Visitor", value: dailyAverage ?? 0, icon: DoorOpen, color: "text-orange-600" },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
                    <Eye className="size-6" />
                    <span className="uppercase tracking-wider">
                        Analytics
                    </span>
                </div>
                <h2 className="text-slate-900 mb-4">
                    Portfolio Visitor Statistics
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Real-time counter using firebase Firestore to track unique visitors and page views.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {visitorStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -8 }}
                            drag
                            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
                            dragElastic={0.3}
                            whileDrag={{ scale: 1.08, cursor: "grabbing", rotate: 4 }}
                            className="relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200 cursor-grab overflow-hidden group"
                        >
                            {/* Background gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">

                                <div className="flex items-center justify-center mb-4">
                                    <motion.div
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color === "text-green-600" ? "from-green-50 to-green-100" :
                                                stat.color === "text-blue-600" ? "from-blue-50 to-blue-100" :
                                                    stat.color === "text-purple-600" ? "from-purple-50 to-purple-100" :
                                                        "from-orange-50 to-orange-100"
                                            }`}
                                    >
                                        <Icon className={`size-6 ${stat.color}`} />
                                    </motion.div>
                                </div>

                                <motion.div
                                    className={`text-3xl font-bold ${stat.color} mb-2 text-center`}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <AnimatedCounter target={stat.value} />
                                </motion.div>

                                <div className="text-slate-600 text-sm font-medium text-center">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
