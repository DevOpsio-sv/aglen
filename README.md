# Aglen Tourism Platform

A premium tourism website for **Aglen (Ъглен), Bulgaria** — designed to showcase local attractions, cultural heritage, accommodation, outdoor activities, and immersive travel experiences near the River Vit.

The platform serves as the primary digital entry point for visitors exploring Aglen and acts as a gateway to future tourism products, guided experiences, and interactive regional initiatives.

---

## Overview

**Project Type:** Static Tourism Website
**Technology Stack:** React + TypeScript + Vite
**Deployment Platform:** Cloudflare Pages
**Target Audience:** Domestic and international travelers
**Primary Goals:**

* Promote tourism in Aglen and the surrounding region
* Present attractions, activities, and local experiences
* Provide multilingual visitor information
* Deliver excellent SEO performance
* Ensure fast global content delivery
* Maintain a premium mobile-first user experience

---

## Local Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will be available locally through the Vite development server.

---

## Production Build

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Build artifacts are generated in:

```text
dist/
```

---

## Deployment

### Cloudflare Pages

Cloudflare Pages is the recommended hosting platform.

**Configuration**

| Setting          | Value              |
| ---------------- | ------------------ |
| Framework        | Vite               |
| Build Command    | npm run build      |
| Output Directory | dist               |
| Project Name     | aglen-tourism-site |

### CLI Deployment

Authenticate with Cloudflare:

```bash
npx wrangler login
```

Deploy:

```bash
npm run deploy:cloudflare
```

### Dashboard Deployment

Alternatively:

1. Connect the Git repository to Cloudflare Pages.
2. Configure build settings:

   * Build Command: `npm run build`
   * Output Directory: `dist`
3. Enable automatic deployments from the main branch.

---

## Content & Media

The project reuses approved tourism content originating from:

https://vasilevasilvena.wixsite.com/aglen

Automated extraction was able to retrieve textual content, tourism descriptions, and service information. Media assets require manual export and verification before production use.

Refer to:

```text
public/assets/README.md
```

for the complete media migration and validation checklist.

---

## Architecture

Detailed technical architecture documentation:

```text
docs/ARCHITECTURE.md
```

Includes:

* Application structure
* Component organization
* Internationalization strategy
* SEO architecture
* Performance optimization approach
* Deployment architecture

---

## Design System

Design specifications and UI guidelines:

```text
docs/DESIGN.md
```

Includes:

* Visual identity
* Typography
* Color system
* Layout principles
* Accessibility requirements
* Responsive design standards

---

## Quality Standards

The platform is designed to meet modern web standards:

* Mobile-first responsive design
* WCAG accessibility principles
* Core Web Vitals optimization
* Search Engine Optimization (SEO)
* Multilingual support
* Cloudflare edge delivery
* Fast page load performance
* Scalable static-site architecture

---

## Maintained By

**DevOpsIO Europe**

Cloud Architecture • DevOps • Platform Engineering • Digital Experience Delivery

For architecture, infrastructure, deployment, and platform support, refer to the internal project documentation.
