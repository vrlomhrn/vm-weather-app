#!/bin/bash

# Quick deployment script
echo "🚀 Building VM Weather App..."
npm run build

echo "✅ Build complete! Your app is ready to deploy."
echo ""
echo "📁 Upload the 'dist' folder to:"
echo "  • Vercel: vercel.com"
echo "  • Netlify: netlify.com"
echo "  • GitHub Pages: Enable in repo settings"
echo ""
echo "🔑 Don't forget to add your environment variable:"
echo "  VITE_OPENWEATHER_API_KEY = your_api_key"