# SamanthaAI - AI-Powered Calling Agents

A modern website showcasing AI-powered calling agents for customer service automation. Built with Next.js, React, and cutting-edge web technologies.

## Features

- 🎨 Modern UI with smooth animations and parallax effects
- 🔊 Interactive voice previews of AI agent conversations
- 📱 Fully responsive design
- 🎭 3D animated backgrounds
- ⚡ Optimized performance with Next.js

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- Howler.js
- GSAP

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/samantha-ai-website.git
cd samantha-ai-website
```

2. Install dependencies:

```bash
npm install
```

3. Add audio files:
   Place your demo audio files in the `public/audio` directory:

- `demo-support.mp3`
- `demo-appointment.mp3`
- `demo-product.mp3`

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   └── DemoSection.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── audio/
└── package.json
```

## Customization

1. Colors and Theme:

   - Edit the Tailwind configuration in `tailwind.config.js`
   - Modify gradient colors in component files

2. Content:

   - Update text and features in component files
   - Add or modify demo conversations in `DemoSection.tsx`

3. Audio:
   - Replace demo audio files in `public/audio/` with your own recordings
   - Update audio file paths in `DemoSection.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
