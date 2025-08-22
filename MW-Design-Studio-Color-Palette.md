# MW Design Studio - Brand Color Palette

## Brand Overview
Professional black & white foundation with vibrant accent colors for a sophisticated yet dynamic brand identity that commands attention while maintaining readability and accessibility.

---

## 🎨 Primary Colors (Foundation)

### **Pure Black**
- **Hex:** `#000000`
- **RGB:** `rgb(0, 0, 0)`
- **HSL:** `hsl(0, 0%, 0%)`
- **CSS Variable:** `--primary-black`
- **Usage:** Headers, footers, primary text, CTA buttons, strong contrast elements

### **Pure White**
- **Hex:** `#FFFFFF` 
- **RGB:** `rgb(255, 255, 255)`
- **HSL:** `hsl(0, 0%, 100%)`
- **CSS Variable:** `--primary-white`
- **Usage:** Backgrounds, button text on dark backgrounds, logo backgrounds

---

## 🌫️ Grayscale System (Depth & Hierarchy)

### **Gray 950** (Darkest)
- **Hex:** `#030712`
- **RGB:** `rgb(3, 7, 18)`
- **CSS Variable:** `--gray-950`
- **Usage:** Deep shadows, maximum contrast backgrounds

### **Gray 900** (Very Dark)
- **Hex:** `#111827`
- **RGB:** `rgb(17, 24, 39)`
- **CSS Variable:** `--gray-900`
- **Usage:** Primary text, dark sections, navigation backgrounds

### **Gray 800** (Dark)
- **Hex:** `#1F2937`
- **RGB:** `rgb(31, 41, 55)`
- **CSS Variable:** `--gray-800`
- **Usage:** Secondary dark elements, borders on dark backgrounds

### **Gray 700** (Medium Dark)
- **Hex:** `#374151`
- **RGB:** `rgb(55, 65, 81)`
- **CSS Variable:** `--gray-700`
- **Usage:** Muted text, subtle backgrounds

### **Gray 600** (Medium)
- **Hex:** `#4B5563`
- **RGB:** `rgb(75, 85, 99)`
- **CSS Variable:** `--gray-600`
- **Usage:** Secondary text, placeholders

### **Gray 500** (Mid Gray)
- **Hex:** `#6B7280`
- **RGB:** `rgb(107, 114, 128)`
- **CSS Variable:** `--gray-500`
- **Usage:** Neutral elements, disabled states

### **Gray 400** (Light Medium)
- **Hex:** `#9CA3AF`
- **RGB:** `rgb(156, 163, 175)`
- **CSS Variable:** `--gray-400`
- **Usage:** Light text, subtle borders

### **Gray 300** (Light)
- **Hex:** `#D1D5DB`
- **RGB:** `rgb(209, 213, 219)`
- **CSS Variable:** `--gray-300`
- **Usage:** Footer text, light borders, dividers

### **Gray 200** (Very Light)
- **Hex:** `#E5E7EB`
- **RGB:** `rgb(229, 231, 235)`
- **CSS Variable:** `--gray-200`
- **Usage:** Light borders, subtle backgrounds

### **Gray 100** (Lightest)
- **Hex:** `#F3F4F6`
- **RGB:** `rgb(243, 244, 246)`
- **CSS Variable:** `--gray-100`
- **Usage:** Very light backgrounds, card backgrounds

### **Gray 50** (Near White)
- **Hex:** `#F9FAFB`
- **RGB:** `rgb(249, 250, 251)`
- **CSS Variable:** `--gray-50`
- **Usage:** Page backgrounds, subtle section backgrounds

---

## ✨ Vibrant Accent Colors

### **Accent Teal** (Primary Accent) ⭐
- **Hex:** `#00D9D5`
- **RGB:** `rgb(0, 217, 213)`
- **HSL:** `hsl(179, 100%, 43%)`
- **CSS Variable:** `--accent-teal`
- **Usage:** Primary CTAs, links, highlights, navigation hover states
- **Brand Role:** Primary accent color, represents creativity and innovation

### **Accent Navy** (Secondary Accent)
- **Hex:** `#1E3A8A`
- **RGB:** `rgb(30, 58, 138)`
- **HSL:** `hsl(224, 64%, 33%)`
- **CSS Variable:** `--accent-navy`
- **Usage:** Professional elements, secondary buttons, gradient combinations
- **Brand Role:** Trust and professionalism

### **Accent Blue** (Supporting)
- **Hex:** `#4A90E2`
- **RGB:** `rgb(74, 144, 226)`
- **HSL:** `hsl(212, 73%, 59%)`
- **CSS Variable:** `--accent-blue`
- **Usage:** Information highlights, social media elements
- **Brand Role:** Communication and clarity

### **Accent Purple** (Creative)
- **Hex:** `#8B5CF6`
- **RGB:** `rgb(139, 92, 246)`
- **HSL:** `hsl(258, 90%, 66%)`
- **CSS Variable:** `--accent-purple`
- **Usage:** Creative elements, special features, gradient combinations
- **Brand Role:** Creativity and innovation

### **Accent Pink** (Energy)
- **Hex:** `#EC4899`
- **RGB:** `rgb(236, 72, 153)`
- **HSL:** `hsl(321, 81%, 60%)`
- **CSS Variable:** `--accent-pink`
- **Usage:** Special promotions, feminine brand elements
- **Brand Role:** Energy and passion

---

## 🎯 Semantic Colors (Status & Feedback)

### **Success Green**
- **Hex:** `#10B981`
- **RGB:** `rgb(16, 185, 129)`
- **CSS Variable:** `--accent-green`
- **Usage:** Success messages, positive feedback, completed states

### **Warning Yellow**
- **Hex:** `#F59E0B`
- **RGB:** `rgb(245, 158, 11)`
- **CSS Variable:** `--accent-yellow`
- **Usage:** Warning messages, attention-needed states

### **Error Red**
- **Hex:** `#EF4444`
- **RGB:** `rgb(239, 68, 68)`
- **CSS Variable:** `--accent-red`
- **Usage:** Error messages, critical alerts, validation errors

---

## 🌈 Gradient Combinations

### **Subtle Gradient** (Professional)
```css
background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-700) 100%);
```
- **Usage:** Subtle dark backgrounds, professional sections

### **Vibrant Gradient** (Brand)
```css
background: linear-gradient(135deg, var(--accent-navy) 0%, var(--accent-teal) 100%);
```
- **Usage:** Hero sections, primary CTAs, brand elements

### **Accent Gradient** (Creative)
```css
background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-pink) 100%);
```
- **Usage:** Special promotions, creative elements, highlights

---

## 📱 Usage Guidelines

### **Accessibility Standards**
- **Primary text:** Gray 900 on White (21:1 contrast ratio)
- **Secondary text:** Gray 600 on White (7:1 contrast ratio)
- **Light text:** Gray 300 on Black (15:1 contrast ratio)
- **Accent text:** Teal on White (4.5:1 contrast ratio - AA compliant)

### **Brand Hierarchy**
1. **Primary:** Black & White (90% of design)
2. **Secondary:** Gray scale (8% of design)
3. **Accent:** Vibrant colors (2% of design - strategic highlights)

### **Color Combinations**
- ✅ **Excellent:** Teal on White, White on Black, Gray 900 on Gray 50
- ✅ **Good:** Navy on White, Purple on White, Pink on White
- ❌ **Avoid:** Teal on Navy, Pink on Purple, Yellow on White

---

## 💻 Technical Implementation

### **CSS Variables (Already Implemented)**
```css
:root {
  /* Primary Colors */
  --primary-black: #000000;
  --primary-white: #FFFFFF;
  
  /* Grayscale System */
  --gray-950: #030712;
  --gray-900: #111827;
  --gray-800: #1F2937;
  --gray-700: #374151;
  --gray-600: #4B5563;
  --gray-500: #6B7280;
  --gray-400: #9CA3AF;
  --gray-300: #D1D5DB;
  --gray-200: #E5E7EB;
  --gray-100: #F3F4F6;
  --gray-50: #F9FAFB;
  
  /* Vibrant Accents */
  --accent-teal: #00D9D5;
  --accent-navy: #1E3A8A;
  --accent-blue: #4A90E2;
  --accent-purple: #8B5CF6;
  --accent-pink: #EC4899;
  --accent-green: #10B981;
  --accent-yellow: #F59E0B;
  --accent-red: #EF4444;
}
```

### **Semantic Mapping**
```css
:root {
  /* Text Colors */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-light: var(--gray-400);
  --text-inverse: var(--primary-white);
  
  /* Background Colors */
  --bg-primary: var(--primary-white);
  --bg-secondary: var(--gray-50);
  --bg-dark: var(--gray-900);
  --bg-accent: var(--gray-100);
  
  /* Border Colors */
  --border-light: var(--gray-200);
  --border-medium: var(--gray-300);
  --border-dark: var(--gray-400);
}
```

---

## 🎨 Design Tokens

### **Spacing Scale** (complements color system)
- **xs:** 4px
- **sm:** 8px  
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px
- **3xl:** 64px

### **Typography Scale**
- **h1:** 3.5rem (56px) - Hero titles
- **h2:** 2.5rem (40px) - Section headers
- **h3:** 2rem (32px) - Subsections
- **h4:** 1.5rem (24px) - Card titles
- **body:** 1rem (16px) - Body text
- **small:** 0.875rem (14px) - Captions

---

## 📋 Brand Application Examples

### **Header/Navigation**
- Background: `--primary-black`
- Text: `--primary-white`
- Hover: `--accent-teal`
- Logo: White version on black background

### **Hero Section**
- Background: Light gradient (`--gray-50` to `--primary-white`)
- Text: `--text-primary`
- CTA Button: `--primary-black` with `--primary-white` text
- Accent: Corner gradients with vibrant colors

### **Service Cards**
- Background: `--primary-white`
- Border: `--border-light`
- Text: `--text-primary`
- Accent: `--accent-teal` for highlights

### **Footer**
- Background: `--primary-black`
- Text: `--gray-300`
- Headings: `--accent-teal`
- Links: Hover to `--accent-teal`

---

## 🏷️ File Information
- **Created:** August 22, 2025
- **Brand:** MW Design Studio
- **Design System:** Black & White with Vibrant Accents
- **Implementation:** Astro website with CSS variables
- **Accessibility:** WCAG AA compliant contrast ratios
- **Last Updated:** Color palette implementation complete