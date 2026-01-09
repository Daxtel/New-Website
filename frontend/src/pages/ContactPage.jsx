import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/mock';
import { toast } from 'sonner';

const ContactPage = () => {
  const { language } = useLanguage();
  const contactContent = content[language].contact;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - will be replaced with backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(
      language === 'en' 
        ? 'Message sent! We\'ll be in touch within 24 hours.' 
        : 'メッセージを送信しました！24時間以内にご返信いたします。'
    );
    
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="font-black text-[#d9fb06] text-[clamp(3rem,7vw,5rem)] uppercase leading-[0.85] tracking-tight">
              {contactContent.title}
            </h1>
            <p className="mt-6 text-[#888680] text-lg md:text-xl">
              {contactContent.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#d9fb06] text-sm font-medium mb-2 uppercase tracking-wider">
                      {contactContent.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#302f2c] border border-[#3f4816]/50 text-[#d9fb06] px-5 py-4 focus:outline-none focus:border-[#d9fb06]/50 transition-colors placeholder-[#888680]/50"
                      placeholder={language === 'en' ? 'Your name' : 'お名前'}
                    />
                  </div>
                  <div>
                    <label className="block text-[#d9fb06] text-sm font-medium mb-2 uppercase tracking-wider">
                      {contactContent.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#302f2c] border border-[#3f4816]/50 text-[#d9fb06] px-5 py-4 focus:outline-none focus:border-[#d9fb06]/50 transition-colors placeholder-[#888680]/50"
                      placeholder={language === 'en' ? 'your@email.com' : 'your@email.com'}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#d9fb06] text-sm font-medium mb-2 uppercase tracking-wider">
                    {contactContent.form.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#302f2c] border border-[#3f4816]/50 text-[#d9fb06] px-5 py-4 focus:outline-none focus:border-[#d9fb06]/50 transition-colors placeholder-[#888680]/50"
                    placeholder={language === 'en' ? 'Company name (optional)' : '会社名（任意）'}
                  />
                </div>

                <div>
                  <label className="block text-[#d9fb06] text-sm font-medium mb-2 uppercase tracking-wider">
                    {contactContent.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#302f2c] border border-[#3f4816]/50 text-[#d9fb06] px-5 py-4 focus:outline-none focus:border-[#d9fb06]/50 transition-colors placeholder-[#888680]/50 resize-none"
                    placeholder={language === 'en' ? 'Tell us about your project...' : 'プロジェクトについて教えてください...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? (language === 'en' ? 'Sending...' : '送信中...')
                    : contactContent.form.submit
                  }
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-[#302f2c] p-8 md:p-10">
                <h3 className="text-[#d9fb06] font-bold text-xl mb-8 uppercase tracking-wider">
                  {language === 'en' ? 'Contact Information' : '連絡先'}
                </h3>
                
                <div className="space-y-6">
                  <a
                    href={`mailto:${contactContent.info.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#d9fb06]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d9fb06]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#d9fb06]" />
                    </div>
                    <div>
                      <p className="text-[#888680] text-sm uppercase tracking-wider">Email</p>
                      <p className="text-[#d9fb06] font-medium mt-1 group-hover:opacity-80 transition-opacity">
                        {contactContent.info.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d9fb06]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#d9fb06]" />
                    </div>
                    <div>
                      <p className="text-[#888680] text-sm uppercase tracking-wider">
                        {language === 'en' ? 'Location' : '拠点'}
                      </p>
                      <p className="text-[#d9fb06] font-medium mt-1">
                        {contactContent.info.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick CTA */}
                <div className="mt-10 pt-8 border-t border-[#3f4816]/50">
                  <p className="text-[#888680] mb-4">
                    {language === 'en' 
                      ? 'Prefer a call? Book a consultation.'
                      : '電話でのご相談をご希望の方'
                    }
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#d9fb06] font-medium hover:opacity-80 transition-opacity">
                    {language === 'en' ? 'Schedule a Call' : '電話相談を予約'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
