# i18next Namespaces Guide: `common`, `validation`, `glossary`

This guide explains how to organize, use, and write code with i18next namespaces in your project.

---

## 1. Project Structure

Organize your translation files by language and namespace:

```
public/locales/
├── en/
│   ├── common.json      # Generic UI labels and actions
│   ├── validation.json  # Validation and error messages
│   ├── glossary.json    # Domain-specific terms
│   ├── dashboard.json   # Dashboard-specific translations
│   └── [feature].json   # Other feature-specific translations
└── vi/
    ├── common.json
    ├── validation.json
    ├── glossary.json
    ├── dashboard.json
    └── [feature].json
```

---

## 2. Workflow Steps

1. **Update Translation Files**
   - Add new translations to appropriate namespace files in `public/locales/en/`
   - Keep translations flat without nesting
   - Use `glossary` for domain-specific terms
   - Use `common` for reusable UI elements
   - Use `validation` for error messages
   - Create feature-specific files for feature-specific translations

2. **Generate TypeScript Interfaces**
   ```bash
   bun i18n:interface
   ```
   This command generates type definitions in `src/types/resources.d.ts`

3. **Use Translations in Components**
   ```typescript
   const { t } = useTranslation()
   t('key', { ns: 'namespace' })
   ```

---

## 3. Example Translation Files

### `common.json`
_Generic UI labels and actions._

**en/common.json**
```json
{
  "save": "Save",
  "cancel": "Cancel",
  "edit": "Edit",
  "delete": "Delete",
  "search": "Search",
  "viewAll": "View All"
}
```

**vi/common.json**
```json
{
  "save": "Lưu",
  "cancel": "Hủy",
  "edit": "Sửa",
  "delete": "Xóa",
  "search": "Tìm kiếm",
  "viewAll": "Xem tất cả"
}
```

---

### `validation.json`
_All validation and error messages._

**en/validation.json**
```json
{
  "required": "This field is required.",
  "invalidEmail": "Invalid email address.",
  "minLength": "Must be at least {{count}} characters."
}
```

**vi/validation.json**
```json
{
  "required": "Trường này là bắt buộc.",
  "invalidEmail": "Địa chỉ email không hợp lệ.",
  "minLength": "Phải có ít nhất {{count}} ký tự."
}
```

---

### `glossary.json`
_Key terms, product names, and technical words that must be translated consistently._

**en/glossary.json**
```json
{
  "user": "User",
  "email": "Email",
  "task": "Task",
  "project": "Project",
  "status": "Status",
  "title": "Title",
  "actions": "Actions",
  "priority": "Priority",
  "progress": "Progress",
  "date": "Date",
  "date.due": "Due Date"
}
```

**vi/glossary.json**
```json
{
  "user": "Người dùng",
  "email": "Email",
  "task": "Công việc",
  "project": "Dự án",
  "status": "Trạng thái",
  "title": "Tiêu đề",
  "actions": "Thao tác",
  "priority": "Độ ưu tiên",
  "progress": "Tiến độ",
  "date": "Ngày",
  "date.due": "Ngày đến hạn"
}
```

---

### Feature-specific files (e.g., `dashboard.json`)
_Feature-specific translations that don't belong in common or glossary._

**en/dashboard.json**
```json
{
  "welcome": "Welcome Back, Mahfuzul!",
  "description": "Here's an overview of your team's project activity today",
  "kpi.totalProjects": "Total Projects",
  "kpi.tasksCompleted": "Tasks Completed",
  "kpi.tasksInProgress": "Tasks In Progress"
}
```

**vi/dashboard.json**
```json
{
  "welcome": "Chào mừng trở lại, Mahfuzul!",
  "description": "Đây là tổng quan hoạt động dự án của đội của bạn hôm nay",
  "kpi.totalProjects": "Tổng số dự án",
  "kpi.tasksCompleted": "Công việc đã hoàn thành",
  "kpi.tasksInProgress": "Công việc đang thực hiện"
}
```

---

## 4. Using Namespaces in Code

### Import the hook
```tsx
import { useTranslation } from 'react-i18next'
```

### Use the `common` namespace
```tsx
const { t } = useTranslation('common')

<Button>{t('save')}</Button>
```
**or**
```tsx
const { t } = useTranslation()

<Button>{t('save', { ns: 'common' })}</Button>
```

### Use the `validation` namespace
```tsx
const { t } = useTranslation('validation')

<span>{t('required')}</span>
```
**or**
```tsx
const { t } = useTranslation()

<span>{t('required', { ns: 'validation' })}</span>
```

### Use the `glossary` namespace
```tsx
const { t } = useTranslation('glossary')

t('user')
t('project')
t('task')
```
**or**
```tsx
const { t } = useTranslation()

t('user', { ns: 'glossary' })
t('project', { ns: 'glossary' })
t('task', { ns: 'glossary' })
```

### Use feature-specific namespaces
```tsx
const { t } = useTranslation('dashboard')

t('welcome')
t('description')
t('kpi.totalProjects')
```
**or**
```tsx
const { t } = useTranslation()

t('welcome', { ns: 'dashboard' })
t('description', { ns: 'dashboard' })
t('kpi.totalProjects', { ns: 'dashboard' })
```

---

## 5. Regenerating TypeScript Types for i18n

After updating any translation files in `public/locales`, run the following script to regenerate TypeScript types for your translation keys:

If you use **npm**:
```sh
npm run i18n:interface
```
If you use **bun**:
```sh
bun i18n:interface
```
If you use **yarn**:
```sh
yarn i18n:interface
```

This will update `src/types/resources.d.ts` with the latest translation keys for type-safe usage in your code.

### Type Safety Benefits
- No need for default values in translation calls
- TypeScript validates translation keys at compile time
- Autocomplete support for translation keys
- Prevents typos and missing translations

### Troubleshooting
- If you get a `SyntaxError: Unexpected end of JSON input`, check all your JSON files for syntax errors or empty files.
- Make sure every JSON file is valid. You can use [jsonlint.com](https://jsonlint.com/) or your code editor's built-in JSON validation.
- Always run `bun i18n:interface` after updating translation files to keep types in sync

---

## 6. Best Practices

- **Consistency:** Use `glossary` for key terms to ensure consistent translation everywhere.
- **Reusability:** Use `common` for generic UI text and actions.
- **Clarity:** Use `validation` for all error and validation messages.
- **Flat Structure:** Keep translation keys flat without nesting for better maintainability.
- **Feature-specific:** Create separate files (like `dashboard.json`) for feature-specific translations.
- **Organization:** Group related translations in feature-specific files to maintain a clean structure.
- **Type Safety:** Always run `bun i18n:interface` after updating translation files.
- **No Default Values:** Let TypeScript validate translation keys instead of using default values.
- **Namespace Clarity:** Pass namespace explicitly for better code readability.

---

## 7. References
- [i18next Namespaces Best Practices](https://www.i18next.com/principles/namespaces)

---

Happy translating!