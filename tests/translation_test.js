describe('Language Switching', function() {
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
