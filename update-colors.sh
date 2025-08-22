#!/bin/bash

# Color Update Script for MW Design Studio
# Updates all old colors to new black/white/vibrant color palette

echo "🎨 Updating all pages to new color palette..."

# Old Navy Blues to Black/Gray
find src/pages -name "*.astro" -exec sed -i '' \
  -e 's/#1E3A8A/var(--primary-black)/g' \
  -e 's/#1e3a8a/var(--primary-black)/g' \
  -e 's/#2c5282/var(--gray-800)/g' \
  -e 's/#1a365d/var(--gray-900)/g' \
  {} \;

# Old Teal to New Vibrant Teal
find src/pages -name "*.astro" -exec sed -i '' \
  -e 's/#4FD1C7/var(--accent-teal)/g' \
  -e 's/#4fd1c7/var(--accent-teal)/g' \
  -e 's/#38B2AC/var(--accent-teal)/g' \
  -e 's/#38b2ac/var(--accent-teal)/g' \
  {} \;

# Old Purple Gradients to New Vibrant Gradients
find src/pages -name "*.astro" -exec sed -i '' \
  -e 's/#667eea/var(--accent-purple)/g' \
  -e 's/#764ba2/var(--accent-pink)/g' \
  {} \;

# Update specific gradient patterns
find src/pages -name "*.astro" -exec sed -i '' \
  -e 's/linear-gradient(135deg, var(--primary-black) 0%, var(--accent-teal) 100%)/var(--gradient-vibrant)/g' \
  -e 's/linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-pink) 100%)/var(--gradient-purple-pink)/g' \
  {} \;

# Update gray colors to use CSS variables
find src/pages -name "*.astro" -exec sed -i '' \
  -e 's/#f8f9fa/var(--gray-50)/g' \
  -e 's/#f0f0f0/var(--gray-100)/g' \
  -e 's/#e9ecef/var(--gray-200)/g' \
  -e 's/#dee2e6/var(--gray-300)/g' \
  -e 's/#ced4da/var(--gray-400)/g' \
  -e 's/#adb5bd/var(--gray-500)/g' \
  -e 's/#6c757d/var(--gray-600)/g' \
  -e 's/#495057/var(--gray-700)/g' \
  -e 's/#343a40/var(--gray-800)/g' \
  -e 's/#212529/var(--gray-900)/g' \
  {} \;

echo "✅ Color palette update complete!"
echo "📝 Updated colors:"
echo "  - Navy blues → Black/Gray variables"
echo "  - Old teals → New vibrant teal"
echo "  - Purple gradients → New vibrant gradients"
echo "  - Gray values → CSS variables"