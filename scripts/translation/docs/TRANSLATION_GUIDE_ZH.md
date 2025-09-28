# 指南：完成 zh.json 翻译流程

## 现状
- zh.candidate.full.json 已创建，包含 4072 个 key（从 en.json 导出）
- 目前 zh.json 仅有 88 个 key 已用中文填充
- 仍有 3984 个 key 需要翻译

## 下一步操作

### 1. 使用自动翻译服务（可选）
可以使用以下 API 或工具来自动翻译：
- Google Cloud Translation API
- DeepL API
- Microsoft Translator API

示例代码（使用 Google Translate API）：
```javascript
const fs = require('fs');
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;

// 配置 Google Cloud Translation API
const translate = new Translate({
  projectId: 'your-google-project-id',
  keyFilename: 'path/to/your/google-key.json',
});

async function translateToChineseBatch(inputFile, outputFile) {
  const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const translatedData = {};
  const keys = Object.keys(jsonData);
  const totalKeys = keys.length;
  const batchSize = 100;
  for (let i = 0; i < totalKeys; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const values = batch.map(key => jsonData[key]);
    const [translations] = await translate.translate(values, { from: 'en', to: 'zh-CN' });
    batch.forEach((key, index) => {
      translatedData[key] = translations[index];
    });
    fs.writeFileSync(outputFile.replace('.json', `_progress_${i + batch.length}.json`), JSON.stringify(translatedData, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2));
}
translateToChineseBatch(path.join(__dirname, '../../lang/zh.candidate.full.json'), path.join(__dirname, '../../lang/zh.translated.json'));
```

### 2. 手工/人工校对
- 自动翻译完成后，务必进行人工校对，尤其是占位符、HTML 片段、专有名词。
- 使用 `lang/backups` 恢复旧版本（如需）。

### 3. 合并并应用翻译
- 使用 `scripts/translation/apply_zh_translation.js` 将审核后的翻译合并到 `lang/zh.json`（会创建备份）。

### 4. 验证
- 运行 `node scripts/translation/check_translations_status.js` 查看覆盖率和潜在问题。
- 启动本地静态服务器并检查页面显示。

## 注意事项
- 保护占位符（如 `{0}`、`%s`、`{{var}}`）不被翻译。
- 避免将英文原文直接写入 `zh.json`（应保留空字符串或明确占位）。
- 推荐先译少量并人工验证，再批量处理。
