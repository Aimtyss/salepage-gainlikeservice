# Facebook Conversions API Setup for GitHub Pages

Since you're hosting on GitHub Pages, here are the best ways to use your Conversions API token:

## Current Implementation ✅
- Enhanced client-side Facebook Pixel with better iOS tracking
- User data collection (Facebook click IDs, browser IDs)
- Detailed event tracking with custom parameters
- Engagement tracking (scroll depth, time on page)

## Option 1: Zapier Integration (Recommended)
1. Create a Zapier account
2. Set up webhook triggers from your website
3. Use your CAPI token to send events to Facebook
4. Add this webhook caller to your site:

```javascript
// Add this to your tracking functions
function sendToZapier(eventData) {
    fetch('YOUR_ZAPIER_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    });
}
```

## Option 2: Netlify Functions (If you migrate)
- Move to Netlify (free tier available)
- Use serverless functions for CAPI calls
- Keep your current domain

## Option 3: Third-party CAPI Services
- Stape.io
- Segment
- ConversionAPI.io

## Your Current Token
Store in your deployment environment:
```
FACEBOOK_CAPI_TOKEN=EAAFoNYnxoaoBP8UfMZB0aVKbHuZAUvh2gAJfQeJLNzFiZCKStPVIRYBTZC9w2TF7ZA3iaW2Sothx37PYUhkQpuZBdBswWnhirpudiM2sr6oZB5ZAL6NF8d3MNTfvGXSVzTDWflTZBkH68LkFuQR2wTZBT0bZBh3b5x6NmIHzPJqZC6cuk2SRXAhSerBpuizzWhexbu3hVwZDZD
```

## Benefits for iOS Tracking
- Bypasses iOS 14.5+ tracking limitations
- Server-side events are more reliable
- Better attribution and conversion measurement
- Enhanced audience building for ads

## Next Steps
1. Test current enhanced pixel implementation
2. Consider Zapier integration for full CAPI benefits
3. Monitor Facebook Events Manager for improved data quality