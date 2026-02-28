describe('Language Switching', function() {
  beforeAll(function() {
    // provide controlled translations so tests are deterministic
    window.langSystem.translations = {
      vi: { 'hero_tagline': 'IVS JSC: HỆ SINH THÁI GIÁO DỤC, CÔNG NGHỆ & NHÂN SỰ' },
      zh: { 'hero_tagline': 'IVS JSC: 教育, 科技 & 人力资源生态系统' },
      en: { 'hero_tagline': 'IVS JSC: EDUCATION, TECHNOLOGY & HR ECOSYSTEM' }
    };
    window.langSystem.defaultLanguage = 'vi';
    window.langSystem.currentLanguage = 'vi';
  });

  it('should switch language to Vietnamese and verify a translation', function() {
    changeLanguage('vi');
    expect(translate('hero_tagline')).toBe('IVS JSC: HỆ SINH THÁI GIÁO DỤC, CÔNG NGHỆ & NHÂN SỰ');
  });

  it('should switch language to Chinese and verify a translation', function() {
    changeLanguage('zh');
    expect(translate('hero_tagline')).toBe('IVS JSC: 教育, 科技 & 人力资源生态系统');
  });

  it('should switch language back to English and verify a translation', function() {
    changeLanguage('en');
    expect(translate('hero_tagline')).toBe('IVS JSC: EDUCATION, TECHNOLOGY & HR ECOSYSTEM');
  });
});
