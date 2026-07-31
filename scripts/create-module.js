#!/usr/bin/env node

/**
 * CLI-генератор модулей.
 *
 * Использование:
 *   npm run create-module -- --name Qualification
 *   node scripts/create-module.js --name Qualification
 *
 * Что делает:
 *   1. Копирует src/Modules/ModuleRawTemplate/ → src/Modules/<Name>/
 *   2. Переименовывает файлы (ModuleDetail.tsx → <Name>Detail.tsx и т.д.)
 *   3. Заменяет все вхождения строк внутри файлов
 *   4. Подставляет имя модуля в API-эндпоинт
 *
 * Без внешних зависимостей — только Node.js stdlib.
 */

const fs = require('fs');
const path = require('path');

// ─── Парсинг аргументов ──────────────────────────────────────────────

const args = process.argv.slice(2);
const nameIndex = args.indexOf('--name');

if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error('❌ Укажите имя модуля: --name <ModuleName>');
  console.error('   Пример: npm run create-module -- --name Qualification');
  process.exit(1);
}

const moduleName = args[nameIndex + 1];

// Валидация имени (PascalCase, начинается с буквы)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(moduleName)) {
  console.error(`❌ Имя модуля "${moduleName}" должно быть в PascalCase (например: Qualification, PaymentOrder)`);
  process.exit(1);
}

// ─── Пути ────────────────────────────────────────────────────────────

const projectRoot = path.resolve(__dirname, '..');
const templateDir = path.join(projectRoot, 'src', 'Modules', 'ModuleTemplate');
const targetDir = path.join(projectRoot, 'src', 'Modules', moduleName);

if (!fs.existsSync(templateDir)) {
  console.error(`❌ Шаблон не найден: ${templateDir}`);
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`❌ Модуль "${moduleName}" уже существует: ${targetDir}`);
  process.exit(1);
}

// ─── Утилиты ─────────────────────────────────────────────────────────

/**
 * Преобразует PascalCase в kebab-case.
 * Qualification → qualification
 * PaymentOrder → payment-order
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Возвращает карту замен для содержимого файлов.
 */
function getReplacements(name) {
  const kebab = toKebabCase(name);
  return [
    // Имя экспортируемого компонента/интерфейса точки входа
    ['ModuleTemplate', name],
    // Имена компонентов Detail/Prefill
    ['ModuleDetail', `${name}Detail`],
    ['ModulePrefill', `${name}Prefill`],
    // Имена StatusTracker, Error, Dialogs, Fields
    ['ModuleStatusTracker', `${name}StatusTracker`],
    ['ModuleDetailError', `${name}DetailError`],
    ['ModuleDetailDialogs', `${name}DetailDialogs`],
    ['ModuleDetailFields', `${name}DetailFields`],
    ['ModulePrefillFields', `${name}PrefillFields`],
    // Типы данных и хуки (файлы и экспорты)
    ['useFetchModuleData', `useFetch${name}Data`],
    ['useSaveModuleData', `useSave${name}Data`],
    ['ModuleData', `${name}Data`],
    // API endpoint в хуках
    ['module-template', kebab],
  ];
}

/**
 * Возвращает карту переименования файлов.
 */
function getFileRenames(name) {
  return [
    ['ModuleDetail', `${name}Detail`],
    ['ModulePrefill', `${name}Prefill`],
    ['ModuleStatusTracker', `${name}StatusTracker`],
    ['ModuleDetailError', `${name}DetailError`],
    ['ModuleDetailDialogs', `${name}DetailDialogs`],
    ['ModuleDetailFields', `${name}DetailFields`],
    ['ModulePrefillFields', `${name}PrefillFields`],
    ['useFetchModuleData', `useFetch${name}Data`],
    ['useSaveModuleData', `useSave${name}Data`],
    ['useErrorController', `useErrorController`], // не переименовываем, но включаем для полноты
  ];
}

/**
 * Рекурсивно копирует директорию с переименованием файлов и заменой содержимого.
 */
function copyDir(src, dest, replacements, fileRenames) {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  const createdFiles = [];

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);

    // Переименование файла
    let destName = entry.name;
    for (const [from, to] of fileRenames) {
      destName = destName.replace(from, to);
    }
    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      const nested = copyDir(srcPath, destPath, replacements, fileRenames);
      createdFiles.push(...nested);
    } else {
      // Читаем файл и делаем замены в содержимом
      let content = fs.readFileSync(srcPath, 'utf-8');

      // Применяем замены только к текстовым файлам
      const ext = path.extname(entry.name);
      if (['.ts', '.tsx', '.less', '.css', '.js', '.jsx', '.json', '.md'].includes(ext)) {
        for (const [from, to] of replacements) {
          // Глобальная замена
          content = content.split(from).join(to);
        }
      }

      fs.writeFileSync(destPath, content, 'utf-8');
      createdFiles.push(path.relative(projectRoot, destPath));
    }
  }

  return createdFiles;
}

// ─── Генерация ───────────────────────────────────────────────────────

console.log(`\n🚀 Генерация модуля "${moduleName}" из шаблона ModuleTemplate...\n`);

const replacements = getReplacements(moduleName);
const fileRenames = getFileRenames(moduleName);
const createdFiles = copyDir(templateDir, targetDir, replacements, fileRenames);

console.log('📁 Созданные файлы:');
createdFiles.forEach((f) => { console.log(`   ✅ ${f}`) });

console.log(`\n✨ Модуль "${moduleName}" успешно создан!`);
console.log(`   Путь: src/Modules/${moduleName}/`);
console.log(`   API:  /api/v1/${toKebabCase(moduleName)}/data`);
console.log(`\n📝 Следующие шаги:`);
console.log(`   1. Добавьте MSW-хэндлеры в src/mocks/handlers.ts для /api/v1/${toKebabCase(moduleName)}/data`);
console.log(`   2. Зарегистрируйте модуль в src/mfe-entrypoint.tsx`);
console.log(`   3. Отредактируйте поля в components/${moduleName}DetailFields.tsx`);
console.log(`   4. Обновите типы данных в hooks/useFetch${moduleName}Data.ts\n`);
