describe("Language System", function() {
    beforeAll(function() {
        // Mock translations for testing
        window.langSystem.translations = {
            'vi': {
                'test_key': 'Xin chào',
                'another_key': 'Tạm biệt'
            },
            'en': {
                'another_key': 'Goodbye'
            }
        };
        window.langSystem.defaultLanguage = 'vi';
    });

    it("should return the key if translation is not found in any language", function() {
        window.langSystem.currentLanguage = 'en';
        expect(translate('non_existent_key')).toEqual('non_existent_key');
    });

    it("should return the default language translation if key is missing in the current language", function() {
        window.langSystem.currentLanguage = 'en';
        expect(translate('test_key')).toEqual('Xin chào');
    });
});