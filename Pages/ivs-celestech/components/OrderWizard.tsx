
import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Wand2, DollarSign, Clock, Layers, FileText } from 'lucide-react';
import { ServiceItem, EstimateResult } from '../types';
import { generateEstimate } from '../services/geminiService';
import { useAppContext } from '../App';

interface Props {
  service: ServiceItem;
  onBack: () => void;
  onComplete: () => void;
}

const FEATURES_MAP: Record<string, string[]> = {
  web: ['Auth & Security', 'Online Payment', 'CMS', 'Advanced Search', 'Dark Mode', 'SEO Optimization', 'Analytics Dashboard'],
  mobile: ['Push Notifications', 'Offline Mode', 'Camera/Photo', 'GPS/Maps', 'Social Login', 'In-App Purchase'],
  automation: ['Email Processing', 'DB Sync', 'PDF Reporting', 'Chatbot Integration', 'Cron Jobs'],
  curriculum: ['Lesson Plans', 'Worksheets', 'Teacher Guide', 'Assessment Tools', 'Video Scripts'],
  elearning: ['Interactive Quizzes', 'Gamification', 'AI Voiceover', 'SCORM/xAPI', 'Progress Tracking'],
  data: ['API Development', 'Data Migration', 'Real-time Processing', 'BI Charts', 'Enterprise Security']
};

const OrderWizard: React.FC<Props> = ({ service, onBack, onComplete }) => {
  const { trans, language } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [briefText, setBriefText] = useState('');

  const availableFeatures = FEATURES_MAP[service.id] || FEATURES_MAP.web;

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };

  const handleNext = async () => {
    if (step === 2) {
      setIsLoading(true);
      const serviceName = language === 'vi' ? service.title : service.titleEn;
      const result = await generateEstimate(serviceName, selectedFeatures, language);
      setEstimate(result);
      setIsLoading(false);
    }
    setStep(prev => prev + 1);
  };

  const renderStep1 = () => (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-primary dark:text-dark-text">{trans.select_features}</h2>
        <p className="text-textSub dark:text-dark-textSub text-sm">{trans.feature_desc}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {availableFeatures.map(feature => (
          <div 
            key={feature}
            onClick={() => toggleFeature(feature)}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-between ${
              selectedFeatures.includes(feature)
                ? 'bg-blue-50 dark:bg-blue-900/30 border-secondary text-primary dark:text-blue-100 shadow-sm'
                : 'bg-white dark:bg-dark-bg border-borderSub dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="font-medium text-sm">{feature}</span>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
               selectedFeatures.includes(feature) ? 'border-secondary bg-secondary text-white' : 'border-gray-300 dark:border-gray-600'
            }`}>
               {selectedFeatures.includes(feature) && <CheckCircle2 className="w-3 h-3" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-primary dark:text-dark-text">{trans.project_context}</h2>
        <p className="text-textSub dark:text-dark-textSub text-sm">{trans.context_desc}</p>
      </div>
      <div className="bg-white dark:bg-dark-bg p-3 rounded-lg border border-borderSub dark:border-dark-border shadow-sm">
        <textarea
          className="w-full h-40 bg-transparent border-none focus:ring-0 text-textMain dark:text-dark-text placeholder-gray-400 resize-none text-sm leading-relaxed"
          placeholder={trans.context_placeholder}
          value={briefText}
          onChange={(e) => setBriefText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-60 space-y-4">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-primary dark:text-dark-text font-medium">{trans.ai_calculating}</p>
        </div>
      ) : (
        <div className="space-y-4">
           <div className="text-center mb-4">
             <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 mb-3">
               <Wand2 className="w-5 h-5 text-green-600 dark:text-green-400" />
             </div>
             <h2 className="text-xl font-bold text-primary dark:text-dark-text">{trans.estimate}</h2>
             <p className="text-textSub dark:text-dark-textSub text-xs">{trans.market_data}</p>
           </div>
           
           {/* Estimate Cards */}
           <div className="grid grid-cols-1 gap-3">
             <div className="bg-white dark:bg-dark-bg border border-borderSub dark:border-dark-border p-4 rounded-xl shadow-soft flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-secondary dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">{trans.cost}</p>
                    <p className="text-base font-bold text-primary dark:text-dark-text">{estimate?.estimatedCost}</p>
                  </div>
               </div>
             </div>
             
             <div className="bg-white dark:bg-dark-bg border border-borderSub dark:border-dark-border p-4 rounded-xl shadow-soft flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">{trans.time}</p>
                    <p className="text-base font-bold text-primary dark:text-dark-text">{estimate?.estimatedTime}</p>
                  </div>
               </div>
             </div>

             <div className="bg-white dark:bg-dark-bg border border-borderSub dark:border-dark-border p-4 rounded-xl shadow-soft">
               <div className="flex items-center gap-2 mb-2">
                 <Layers className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                 <p className="text-gray-400 text-[10px] uppercase font-bold">{trans.tech}</p>
               </div>
               <p className="text-sm font-semibold text-primary dark:text-dark-text pl-6">{estimate?.techStack.join(', ')}</p>
             </div>
           </div>

           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-xl mt-2">
             <h3 className="text-xs font-bold text-secondary dark:text-blue-300 mb-1 uppercase flex items-center gap-2">
               <FileText className="w-3 h-3" /> {trans.ai_summary}
             </h3>
             <p className="text-primary dark:text-blue-100 text-xs leading-relaxed">{estimate?.summary}</p>
           </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="pb-20">
      {/* Navigation Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 bg-white dark:bg-dark-bg rounded-full border border-borderSub dark:border-dark-border shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 text-textMain dark:text-dark-text">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-primary dark:text-dark-text truncate">
             {language === 'vi' ? service.title : service.titleEn}
          </h1>
          <div className="flex gap-2 mt-1.5">
            <span className={`h-1 rounded-full flex-1 transition-all ${step >= 1 ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700'}`}></span>
            <span className={`h-1 rounded-full flex-1 transition-all ${step >= 2 ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700'}`}></span>
            <span className={`h-1 rounded-full flex-1 transition-all ${step >= 3 ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700'}`}></span>
          </div>
        </div>
      </div>

      <div className="bg-surface dark:bg-dark-surface border border-borderSub dark:border-dark-border rounded-xl p-5 shadow-card min-h-[350px] transition-colors">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {/* Footer Controls */}
      <div className="mt-6 flex justify-end">
        {!isLoading && (
          <button
            onClick={step === 3 ? onComplete : handleNext}
            disabled={step === 1 && selectedFeatures.length === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {step === 3 ? trans.send_request : trans.continue}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderWizard;
