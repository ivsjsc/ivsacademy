
import React, { useState } from 'react';
import { Monitor, Smartphone, Database, BookOpen, Layers, Cpu, ArrowRight, Filter, X, CheckCircle, Info } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '../types';
import { useAppContext } from '../App';

// Enhanced Data with Detailed Descriptions
const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web',
    title: 'Nền tảng Web Doanh nghiệp',
    titleEn: 'Enterprise Web Platform',
    category: ServiceCategory.TECH,
    description: 'Cổng thông tin mở rộng, Landing page tối ưu chuyển đổi và hệ sinh thái E-commerce bảo mật.',
    descriptionEn: 'Scalable portals, high-converting landing pages, and secure e-commerce ecosystems.',
    longDescription: 'Chúng tôi xây dựng các giải pháp web doanh nghiệp toàn diện, không chỉ là "trang web" mà là nền tảng vận hành số. Tập trung vào bảo mật, khả năng mở rộng (Scalability) và tối ưu hóa công cụ tìm kiếm (SEO) ngay từ cấu trúc mã nguồn.',
    longDescriptionEn: 'We build comprehensive enterprise web solutions, not just "websites" but digital operating platforms. Focusing on security, scalability, and Search Engine Optimization (SEO) right from the code structure.',
    features: [
      'Kiến trúc Microservices / Monolithic linh hoạt',
      'Tối ưu Core Web Vitals (Tốc độ tải trang)',
      'CMS quản trị nội dung tùy biến (Headless CMS)',
      'Tích hợp cổng thanh toán & ERP'
    ],
    featuresEn: [
      'Flexible Microservices / Monolithic Architecture',
      'Core Web Vitals Optimization (Page Speed)',
      'Customizable Content Management (Headless CMS)',
      'Payment Gateway & ERP Integration'
    ],
    deliverables: ['Source Code (React/Next.js)', 'Tài liệu kỹ thuật', 'Bảo hành 12 tháng'],
    deliverablesEn: ['Source Code (React/Next.js)', 'Technical Documentation', '12-Month Warranty'],
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mobile',
    title: 'Phát triển Mobile App',
    titleEn: 'Mobile App Development',
    category: ServiceCategory.TECH,
    description: 'Ứng dụng Native iOS/Android và Đa nền tảng (Flutter) tập trung vào trải nghiệm người dùng (UX).',
    descriptionEn: 'Native iOS/Android and Cross-platform (Flutter) apps focused on user experience (UX).',
    longDescription: 'Biến ý tưởng thành ứng dụng di động mượt mà. Chúng tôi ưu tiên trải nghiệm "Thumb-friendly" (thân thiện ngón cái), hiệu năng cao và khả năng hoạt động ngoại tuyến (Offline-first).',
    longDescriptionEn: 'Turning ideas into smooth mobile applications. We prioritize "Thumb-friendly" experiences, high performance, and Offline-first capabilities.',
    features: [
      'Phát triển Đa nền tảng (Flutter/React Native)',
      'Native Performance (Swift/Kotlin)',
      'Tích hợp Sinh trắc học & GPS',
      'Thông báo đẩy (Push Notification) thông minh'
    ],
    featuresEn: [
      'Cross-platform Development (Flutter/React Native)',
      'Native Performance (Swift/Kotlin)',
      'Biometrics & GPS Integration',
      'Smart Push Notifications'
    ],
    deliverables: ['App iOS & Android', 'Tài khoản Developer', 'UI/UX Design Kit'],
    deliverablesEn: ['iOS & Android Apps', 'Developer Accounts', 'UI/UX Design Kit'],
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'automation',
    title: 'Tự động hóa (BPA)',
    titleEn: 'Business Automation (BPA)',
    category: ServiceCategory.TECH,
    description: 'Bot RPA và quy trình làm việc tự động giúp giảm chi phí vận hành và sai sót thủ công.',
    descriptionEn: 'RPA bots and automated workflows to reduce operational costs and manual errors.',
    longDescription: 'Giải phóng nhân sự khỏi các tác vụ lặp lại. Hệ thống RPA (Robotic Process Automation) của chúng tôi có thể tự động xử lý hóa đơn, nhập liệu, gửi email và tổng hợp báo cáo 24/7.',
    longDescriptionEn: 'Free up staff from repetitive tasks. Our RPA (Robotic Process Automation) systems can automatically process invoices, enter data, send emails, and aggregate reports 24/7.',
    features: [
      'Bot tự động hóa quy trình nghiệp vụ',
      'Xử lý văn bản thông minh (OCR)',
      'Tích hợp Workflow (Zapier/Custom API)',
      'Báo cáo Real-time Dashboard'
    ],
    featuresEn: [
      'Business Process Automation Bots',
      'Intelligent Document Processing (OCR)',
      'Workflow Integration (Zapier/Custom API)',
      'Real-time Dashboard Reporting'
    ],
    deliverables: ['Hệ thống Bot Automation', 'Kịch bản vận hành', 'Đào tạo nhân sự'],
    deliverablesEn: ['Bot Automation System', 'Operation Scripts', 'Staff Training'],
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'curriculum',
    title: 'Giáo trình STEAM K-12',
    titleEn: 'STEAM K-12 Curriculum',
    category: ServiceCategory.EDTECH,
    description: 'Kế hoạch bài giảng, hướng dẫn giáo viên và phiếu bài tập chuẩn quốc tế.',
    descriptionEn: 'Lesson plans, teacher guides, and worksheets aligned with international standards.',
    longDescription: 'Chúng tôi cung cấp giải pháp nội dung giáo dục trọn gói. Giáo trình được biên soạn bởi các chuyên gia giáo dục, tuân thủ chuẩn NGSS (Mỹ) hoặc khung chương trình Bộ GD&ĐT, tích hợp tư duy công nghệ.',
    longDescriptionEn: 'We provide comprehensive educational content solutions. Curricula are compiled by education experts, complying with NGSS (USA) standards or MOET frameworks, integrating technological thinking.',
    features: [
      'Kế hoạch bài giảng chi tiết (Lesson Plans)',
      'Slide bài giảng tương tác',
      'Phiếu học tập & Công cụ đánh giá',
      'Tích hợp Robotics & Coding'
    ],
    featuresEn: [
      'Detailed Lesson Plans',
      'Interactive Lecture Slides',
      'Worksheets & Assessment Tools',
      'Robotics & Coding Integration'
    ],
    deliverables: ['Bộ giáo trình bản mềm/cứng', 'Video hướng dẫn', 'Workshop chuyển giao'],
    deliverablesEn: ['Soft/Hard Copy Curriculum', 'Instructional Videos', 'Handover Workshop'],
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'elearning',
    title: 'Số hóa E-Learning',
    titleEn: 'E-Learning Digitization',
    category: ServiceCategory.EDTECH,
    description: 'Chuyển đổi tài liệu thành bài giảng tương tác chuẩn SCORM và HTML5 sinh động.',
    descriptionEn: 'Transforming documents into interactive SCORM standards and lively HTML5 lessons.',
    longDescription: 'Biến tài liệu PDF/PPT khô khan thành trải nghiệm học tập thú vị. Chúng tôi sử dụng Articulate Storyline/Rise để tạo ra các bài giảng chuẩn SCORM, dễ dàng tích hợp lên mọi hệ thống LMS.',
    longDescriptionEn: 'Turn dry PDF/PPT documents into engaging learning experiences. We use Articulate Storyline/Rise to create SCORM-compliant lessons, easily integrable into any LMS.',
    features: [
      'Thiết kế Instructional Design (ID)',
      'Gamification (Trò chơi hóa)',
      'Animation & Voice-over chuyên nghiệp',
      'Chuẩn SCORM / xAPI / HTML5'
    ],
    featuresEn: [
      'Instructional Design (ID)',
      'Gamification',
      'Professional Animation & Voice-over',
      'SCORM / xAPI / HTML5 Standards'
    ],
    deliverables: ['Gói SCORM 1.2/2004', 'Source file thiết kế', 'Ngân hàng câu hỏi'],
    deliverablesEn: ['SCORM 1.2/2004 Packages', 'Design Source Files', 'Question Bank'],
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'data',
    title: 'Hạ tầng Dữ liệu & Cloud',
    titleEn: 'Data & Cloud Infrastructure',
    category: ServiceCategory.DATA,
    description: 'Tích hợp API, thiết lập Cloud (AWS/Azure) và giải pháp Kho dữ liệu (Data Warehouse).',
    descriptionEn: 'API integration, Cloud setup (AWS/Azure), and Data Warehouse solutions.',
    longDescription: 'Xây dựng nền móng vững chắc cho doanh nghiệp số. Chúng tôi thiết kế kiến trúc Cloud tối ưu chi phí, bảo mật cao và xây dựng các luồng dữ liệu (Data Pipelines) để phục vụ báo cáo thông minh (BI).',
    longDescriptionEn: 'Build a solid foundation for digital business. We design cost-optimized, high-security Cloud architectures and build Data Pipelines for Business Intelligence (BI).',
    features: [
      'Thiết kế kiến trúc Cloud (AWS/Azure/GCP)',
      'Xây dựng Data Warehouse / Data Lake',
      'ETL & Data Pipeline Automation',
      'Bảo mật & Tuân thủ (Security & Compliance)'
    ],
    featuresEn: [
      'Cloud Architecture Design (AWS/Azure/GCP)',
      'Data Warehouse / Data Lake Setup',
      'ETL & Data Pipeline Automation',
      'Security & Compliance'
    ],
    deliverables: ['Sơ đồ kiến trúc hệ thống', 'Tài khoản quản trị Cloud', 'Báo cáo BI mẫu'],
    deliverablesEn: ['System Architecture Diagrams', 'Cloud Admin Accounts', 'Sample BI Reports'],
    icon: 'Database',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800'
  }
];

interface Props {
  onSelectService: (service: ServiceItem) => void;
}

const ServiceCatalog: React.FC<Props> = ({ onSelectService }) => {
  const { trans, language } = useAppContext();
  const [filter, setFilter] = useState<ServiceCategory | 'All'>('All');
  const [selectedDetail, setSelectedDetail] = useState<ServiceItem | null>(null);

  const filteredServices = filter === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === filter);

  return (
    <>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="bg-surface dark:bg-dark-surface rounded-xl p-5 shadow-sm border border-borderSub dark:border-dark-border flex flex-col gap-4 transition-colors">
          <div>
            <h1 className="text-xl font-bold text-primary dark:text-dark-text">{trans.service_store}</h1>
            <p className="text-textSub dark:text-dark-textSub text-sm mt-1">{trans.service_desc}</p>
          </div>
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 no-scrollbar">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {['All', ...Object.values(ServiceCategory)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat === 'All' ? 'All' : cat as ServiceCategory)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat === 'All' ? trans.all : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid - Cards Layout */}
        <div className="grid grid-cols-1 gap-5">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedDetail(service)}
              className="group bg-surface dark:bg-dark-surface rounded-xl overflow-hidden shadow-card border border-borderSub dark:border-dark-border hover:border-secondary/30 transition-all duration-300 flex flex-col cursor-pointer active:scale-95"
            >
              {/* Image Section */}
              <div className="h-40 w-full relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                  {service.category}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                   <div className="opacity-0 group-hover:opacity-100 bg-white/90 text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                     {language === 'vi' ? 'Xem chi tiết' : 'View Details'}
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-primary dark:text-dark-text mb-2 group-hover:text-secondary transition-colors">
                    {language === 'vi' ? service.title : service.titleEn}
                  </h3>
                  <p className="text-textSub dark:text-dark-textSub text-xs leading-relaxed line-clamp-2">
                    {language === 'vi' ? service.description : service.descriptionEn}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{trans.price_from} {language === 'vi' ? '20tr VNĐ' : '$800'}</span>
                  <div className="flex items-center gap-1.5 text-secondary text-xs font-bold">
                    {trans.setup} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedDetail(null)}
          ></div>
          
          <div className="bg-white dark:bg-slate-900 w-full md:w-[450px] md:rounded-2xl rounded-t-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Modal Header Image */}
            <div className="relative h-48 w-full flex-shrink-0">
               <img 
                  src={selectedDetail.image} 
                  alt={selectedDetail.title} 
                  className="w-full h-full object-cover md:rounded-t-2xl rounded-t-2xl" 
                />
               <button 
                onClick={() => setSelectedDetail(null)}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
               <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="absolute bottom-4 left-4 right-4">
                 <span className="text-[10px] font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded backdrop-blur uppercase tracking-wider mb-2 inline-block">
                   {selectedDetail.category}
                 </span>
                 <h2 className="text-xl font-bold text-white leading-tight">
                   {language === 'vi' ? selectedDetail.title : selectedDetail.titleEn}
                 </h2>
               </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white dark:bg-slate-900 transition-colors">
               
               {/* Long Description */}
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                   {language === 'vi' ? selectedDetail.longDescription : selectedDetail.longDescriptionEn}
                 </p>
               </div>

               {/* Features */}
               <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                  <h3 className="text-sm font-bold text-primary dark:text-blue-200 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary dark:text-blue-400" />
                    {language === 'vi' ? 'Tính năng nổi bật' : 'Key Features'}
                  </h3>
                  <ul className="space-y-2">
                    {(language === 'vi' ? selectedDetail.features : selectedDetail.featuresEn).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 bg-secondary dark:bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Deliverables */}
               <div>
                  <h3 className="text-sm font-bold text-primary dark:text-dark-text mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500" />
                    {language === 'vi' ? 'Bàn giao' : 'Deliverables'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'vi' ? selectedDetail.deliverables : selectedDetail.deliverablesEn).map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
               </div>

               {/* Price Note */}
               <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                 <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                 <p className="text-[11px] text-amber-800 dark:text-amber-200">
                   {language === 'vi' 
                     ? 'Mức giá cuối cùng sẽ phụ thuộc vào quy mô và yêu cầu cụ thể của dự án.' 
                     : 'Final pricing will depend on the specific scope and requirements of the project.'}
                 </p>
               </div>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 md:rounded-b-2xl">
              <button 
                onClick={() => {
                  onSelectService(selectedDetail);
                  setSelectedDetail(null);
                }}
                className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
              >
                {trans.setup} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCatalog;
