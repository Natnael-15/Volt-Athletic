import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, ShieldAlert, BadgePercent, LockOpen, CreditCard, Sparkles } from 'lucide-react';
import { MEMBERSHIPS_DATA } from '../data';

interface MembershipsProps {
  onJoinClick: (tierId?: string) => void;
}

export default function Memberships({ onJoinClick }: MembershipsProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const discountFactor = billingCycle === 'annual' ? 0.8 : 1.0;

  return (
    <section id="memberships" className="py-24 bg-steel-bg text-gray-200 border-t border-steel-border/20 relative overflow-hidden">
      
      {/* Abstract Spotlight behind Elite */}
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-80 h-80 bg-neon/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col gap-16">
        
        {/* Header with Title and Billing Cycle Toggler */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-steel-border/50 pb-8">
          <div className="text-center md:text-left">
            <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Uncompromising Gateways</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              SELECT ACCESS
            </h2>
          </div>

          {/* Luxury Billing Toggler Grid */}
          <div className="flex items-center gap-3 bg-steel-low border border-steel-border/60 p-1.5 rounded-none">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-wider transition-luxury rounded-none ${
                billingCycle === 'monthly'
                  ? 'bg-steel-high text-white font-bold border border-steel-border'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Term
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-wider transition-luxury rounded-none flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-neon text-steel-black font-bold border border-neon'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual Saver <span className="text-[10px] bg-zinc-950 text-neon px-1.5 py-0.5 font-sans font-black">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Matrix Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIPS_DATA.map((tier) => {
            const calculatedPrice = Math.floor(tier.price * discountFactor);
            const isElite = tier.id === 'member-elite';

            return (
              <div
                key={tier.id}
                className={`relative bg-steel-low border transition-luxury flex flex-col justify-between p-6 md:p-8 rounded-none ${
                  isElite
                    ? 'border-neon py-8 md:py-10 bg-gradient-to-b from-steel-low via-steel-low to-neon/5 glow-primary-glow'
                    : 'border-steel-border/40 hover:border-white'
                }`}
              >
                {/* Popular Spotlight Tag */}
                {isElite && tier.popularLabel && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-neon text-zinc-950 font-mono font-black text-[9px] uppercase tracking-[0.2em] px-4 py-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-zinc-950" /> {tier.popularLabel}
                  </div>
                )}

                {/* Top Section */}
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                      {tier.id.replace('member-', '')} Tier Specs
                    </span>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-wider mt-1 leading-none">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Pricing Frame */}
                  <div className="border-y border-steel-border/30 py-4 flex items-baseline gap-1.5">
                    <span className="font-mono text-xs text-gray-500">£</span>
                    <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter leading-none">
                      {calculatedPrice}
                    </span>
                    <span className="font-mono text-xs text-gray-500 uppercase">
                      /{tier.period}
                    </span>
                  </div>

                  {/* Feature Checks List */}
                  <ul className="space-y-3.5">
                    {/* Active inclusions */}
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-neon filter drop-shadow-[0_0_2px_rgba(195,244,0,0.8)] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}

                    {/* Exclusions showing premium options */}
                    {tier.omittedFeatures.map((omit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <X className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                        <span className="line-through">{omit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Submit */}
                <div className="pt-8 mt-8 border-t border-steel-border/30">
                  <button
                    onClick={() => onJoinClick(tier.id)}
                    className={`w-full py-4 font-mono font-bold text-xs uppercase tracking-widest transition-luxury rounded-none text-center ${
                      isElite
                        ? 'bg-neon hover:bg-white text-zinc-950 hover:text-zinc-950 active:scale-95 duration-200'
                        : 'bg-transparent border border-gray-600 hover:border-white text-white hover:bg-white/5 active:scale-95 duration-200'
                    }`}
                  >
                    Lock Current Pricing
                  </button>
                  <span className="text-[9px] font-mono text-gray-500 text-center block mt-2.5 uppercase tracking-wider leading-none">
                    * Cancel anytime with a 30-day notice period
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Trust Callout Banner */}
        <div className="mt-4 flex flex-col md:flex-row items-center gap-6 p-6 bg-steel-low border border-dashed border-steel-border">
          <div className="w-12 h-12 bg-white/5 border border-steel-border flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-neon" />
          </div>
          <div className="flex-grow space-y-1">
            <h4 className="font-display font-bold text-white text-md uppercase leading-none">Corporate & Family Wellness Rates</h4>
            <p className="font-sans text-xs text-gray-400">We offer custom operational contracts for sports squads, executive teams, and corporate cohorts starting at 5+ members.</p>
          </div>
          <button
            onClick={() => onJoinClick()}
            className="font-mono text-xs uppercase tracking-widest border border-steel-border py-3 px-6 text-white hover:text-neon hover:border-neon transition-luxury shrink-0"
          >
            Inquire Rates →
          </button>
        </div>

      </div>
    </section>
  );
}
