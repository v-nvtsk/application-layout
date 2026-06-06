#!/bin/bash

# Имя итогового файла
OUTPUT_FILE="all_code.txt"

# Очищаем файл, если он уже существует
> "$OUTPUT_FILE"

# Ищем файлы и записываем их в итоговый файл
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.less" \) | while read -r file; do
    echo "========================================" >> "$OUTPUT_FILE"
    echo "ФАЙЛ: $file" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\n" >> "$OUTPUT_FILE"
done

echo "Готово! Все файлы собраны в $OUTPUT_FILE"