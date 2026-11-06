/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Zap, 
  Receipt, 
  HelpCircle, 
  CheckCircle2, 
  Printer, 
  TrendingUp,
  Info
} from 'lucide-react';

interface TariffTier {
  range: string;
  minKwh: number;
  maxKwh: number;
  ratePerKwh: number; // in ETB
}

// Ethiopian standard progressive residential tariff blocks (in Ethiopian Birr - ETB)
const RESIDENTIAL_TIERS: TariffTier[] = [
  { range: "0 - 50 kWh", minKwh: 0, maxKwh: 50, ratePerKwh: 0.35 },
  { range: "51 - 100 kWh", minKwh: 50, maxKwh: 100, ratePerKwh: 0.65 },
  { range: "101 - 200 kWh", minKwh: 100, maxKwh: 200, ratePerKwh: 1.15 },
  { range: "201 - 300 kWh", minKwh: 200, maxKwh: 300, ratePerKwh: 1.70 },
  { range: "301 - 400 kWh", minKwh: 300, maxKwh: 400, ratePerKwh: 2.10 },
  { range: "401 - 500 kWh", minKwh: 400, maxKwh: 500, ratePerKwh: 2.50 },
  { range: "Above 500 kWh", minKwh: 500, maxKwh: Infinity, ratePerKwh: 3.00 },
];

const COMMERCIAL_RATE = 2.40; // Flat commercial rate per kWh in ETB

export const SmartMeterCalculatorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [customerType, setCustomerType] = useState<'residential' | 'commercial'>('residential');
  const [meterType, setMeterType] = useState<'prepaid' | 'postpaid'>('prepaid');
  const [kwhUnits, setKwhUnits] = useState<number>(185);
  const [serviceCharge, setServiceCharge] = useState<number>(15.00); // Fixed monthly service charge in ETB
  const [includeVat, setIncludeVat] = useState<boolean>(true);
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  // Calculate tier breakdown
  let energyCharge = 0;
  const breakdown: { range: string; kwh: number; rate: number; cost: number }[] = [];

  if (customerType === 'residential') {
    let remaining = kwhUnits;
    for (const tier of RESIDENTIAL_TIERS) {
      if (remaining <= 0) break;
      const tierCapacity = tier.maxKwh - tier.minKwh;
      const consumedInTier = Math.min(remaining, tierCapacity);
      const tierCost = consumedInTier * tier.ratePerKwh;
      energyCharge += tierCost;
      breakdown.push({
        range: tier.range,
        kwh: consumedInTier,
        rate: tier.ratePerKwh,
        cost: tierCost
      });
      remaining -= consumedInTier;
    }
  } else {
    energyCharge = kwhUnits * COMMERCIAL_RATE;
    breakdown.push({
      range: "Commercial Flat Tariff",
      kwh: kwhUnits,
      rate: COMMERCIAL_RATE,
      cost: energyCharge
    });
  }

  const vatAmount = includeVat ? (energyCharge + serviceCharge) * 0.15 : 0; // 15% VAT
  const totalBillETB = energyCharge + serviceCharge + vatAmount;

  // Simulated 20-digit STS Prepaid Smart Token
  const simulatedToken = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopyToken = () => {
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B111E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#59A650]/10 text-[#59A650] border border-[#59A650]/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  EEU Smart Meter & Progressive Tariff Calculator
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[#F4984A]/20 text-[#F4984A] border border-[#F4984A]/30">
                  ETB Currency
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Designed to provide transparent billing breakdowns for Ethiopian Electric Utility customers
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Controls & Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Customer Category */}
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Customer Category</label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCustomerType('residential')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    customerType === 'residential'
                      ? 'bg-[#F4984A] text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerType('commercial')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    customerType === 'commercial'
                      ? 'bg-[#F4984A] text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            {/* Meter Technology */}
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Meter Technology</label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMeterType('prepaid')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    meterType === 'prepaid'
                      ? 'bg-[#59A650] text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Prepaid Token
                </button>
                <button
                  type="button"
                  onClick={() => setMeterType('postpaid')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    meterType === 'postpaid'
                      ? 'bg-[#59A650] text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Postpaid Monthly
                </button>
              </div>
            </div>

            {/* Tax / Service Setting */}
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800 flex flex-col justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Regulatory Tax (VAT)</label>
              <label className="flex items-center gap-2 cursor-pointer mt-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={includeVat}
                  onChange={(e) => setIncludeVat(e.target.checked)}
                  className="w-4 h-4 rounded text-[#F4984A] focus:ring-0 bg-slate-800 border-slate-700"
                />
                Apply 15% Ethiopian VAT
              </label>
              <span className="text-[11px] text-slate-500 mt-1">Service charge: ETB 15.00/mo</span>
            </div>
          </div>

          {/* Interactive Consumption Slider */}
          <div className="p-5 rounded-xl bg-[#0E1726] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#F4984A]" />
                  Monthly Electricity Consumption
                </span>
                <p className="text-xs text-slate-400">Slide to test different household or commercial load levels</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={kwhUnits}
                  onChange={(e) => setKwhUnits(Math.max(0, Number(e.target.value)))}
                  className="w-24 px-3 py-1.5 rounded-lg bg-[#080C14] border border-slate-700 text-right font-mono font-bold text-white text-base focus:outline-none focus:border-[#F4984A]"
                />
                <span className="text-sm font-semibold text-slate-300">kWh</span>
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="800"
              step="5"
              value={kwhUnits}
              onChange={(e) => setKwhUnits(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F4984A]"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>0 kWh (Lifeline)</span>
              <span>100 kWh</span>
              <span>200 kWh (Avg Household)</span>
              <span>400 kWh</span>
              <span>800+ kWh (Heavy)</span>
            </div>
          </div>

          {/* Detailed Itemized Statement & Cost Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Tariff Breakdown Table */}
            <div className="lg:col-span-7 bg-[#0E1726] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#59A650]" />
                  Itemized Tariff Calculation
                </h4>
                <span className="text-xs text-slate-400">Rate (ETB/kWh)</span>
              </div>

              <div className="space-y-2 text-xs">
                {breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/60 font-mono">
                    <span className="text-slate-300 font-sans">{item.range}</span>
                    <span className="text-slate-400">{item.kwh.toFixed(1)} kWh @ {item.rate.toFixed(2)}</span>
                    <span className="text-white font-semibold">{item.cost.toFixed(2)} ETB</span>
                  </div>
                ))}

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60 font-mono text-slate-400">
                  <span className="font-sans">Fixed Customer Service Charge</span>
                  <span>1 Month</span>
                  <span className="text-slate-300">{serviceCharge.toFixed(2)} ETB</span>
                </div>

                {includeVat && (
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60 font-mono text-slate-400">
                    <span className="font-sans">Value Added Tax (15% VAT)</span>
                    <span>15%</span>
                    <span className="text-slate-300">{vatAmount.toFixed(2)} ETB</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#59A650]" />
                  Average Effective Cost:
                </span>
                <span className="font-mono text-white font-bold">
                  {(totalBillETB / (kwhUnits || 1)).toFixed(2)} ETB per kWh
                </span>
              </div>
            </div>

            {/* Total Billing Receipt Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111C30] to-[#0E1726] border border-[#F4984A]/30 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Projected Customer Payable
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {totalBillETB.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-[#F4984A]">ETB</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Calculated for {kwhUnits} kWh ({customerType} tier)
                </p>
              </div>

              {/* Simulated Token for Prepaid */}
              {meterType === 'prepaid' ? (
                <div className="p-3 rounded-lg bg-[#080C14] border border-slate-800 space-y-1.5">
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    Simulated STS Token (Smart Keypad):
                  </span>
                  <p className="font-mono text-xs text-[#59A650] font-bold tracking-wider break-all select-all">
                    {simulatedToken}
                  </p>
                  <button
                    onClick={handleCopyToken}
                    className="text-[11px] text-[#F4984A] hover:underline flex items-center gap-1 mt-1 font-medium"
                  >
                    {copiedToken ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#59A650]" />
                        Token Copied to Clipboard!
                      </>
                    ) : (
                      "Copy Simulated Token"
                    )}
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-[#080C14] border border-slate-800 text-xs text-slate-400">
                  <span className="text-slate-300 font-semibold block mb-1">Postpaid Due Date Notice:</span>
                  Standard EEU cycle payable within 15 calendar days from billing issuance to avoid disconnection.
                </div>
              )}

              {/* Energy Saving Customer Tip */}
              <div className="p-3 rounded-lg bg-[#59A650]/10 border border-[#59A650]/20 text-[11px] text-slate-300 space-y-1">
                <span className="font-semibold text-[#59A650] flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Customer Support Insight:
                </span>
                <p className="text-slate-400">
                  {kwhUnits > 200 
                    ? "Keeping monthly consumption under 200 kWh prevents transitioning into higher tariff tiers (saving up to 35% on progressive energy costs)."
                    : "Excellent energy efficiency! This usage qualifies for Ethiopia's subsidized lifeline consumption bracket."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#080C14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>EEU Smart Meter Billing Engine | Designed by Zekarias Zenebe Ababu</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
