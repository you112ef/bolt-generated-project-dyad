# 🚀 تعليمات النشر إلى Cloudflare Pages

## 📋 المتطلبات الأساسية

1. **حساب Cloudflare** مع Pages مفعل
2. **GitHub repository** مع Actions مفعلة
3. **API tokens** للخدمات المطلوبة

## ⚙️ إعداد Cloudflare Pages

### 1. إنشاء مشروع جديد
- اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
- اختر **Pages** > **Create a project**
- اربط مع GitHub repository

### 2. إعداد Build Configuration
```
Build command: npm run build
Build output directory: dist
Root directory: / (leave empty)
```

### 3. إعداد Environment Variables
```
VITE_APP_NAME=Dyad Web Demo
VITE_OPENAI_API_KEY=your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
VITE_GITHUB_TOKEN=your_github_token
```

## 🔑 إعداد GitHub Secrets

### 1. اذهب إلى Repository Settings > Secrets and variables > Actions
### 2. أضف هذه Secrets:

```
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

## 🚀 النشر التلقائي

### 1. عند Push إلى main branch:
- يتم تشغيل GitHub Actions تلقائياً
- بناء المشروع
- النشر إلى Cloudflare Pages

### 2. النشر اليدوي:
```bash
npm run deploy
```

## 📱 اختبار النشر

1. **Preview URL**: `https://preview.your-project.pages.dev`
2. **Production URL**: `https://your-project.pages.dev`

## 🔧 استكشاف الأخطاء

### مشكلة Build Output Directory:
- تأكد من أن `pages_build_output_dir = "dist"` موجود في `wrangler.toml`
- تأكد من أن Vite يخرج إلى مجلد `dist`

### مشكلة Environment Variables:
- تأكد من إضافة المتغيرات في Cloudflare Pages
- تأكد من أن المتغيرات تبدأ بـ `VITE_`

## 📞 الدعم

إذا واجهت مشاكل:
1. تحقق من Cloudflare Pages logs
2. تحقق من GitHub Actions logs
3. تأكد من صحة `wrangler.toml`