
# Image Loading Fixes

- Replaced broken Base64 data URLs in `constants.ts` with static paths: `/images/fallback.png`.
- Added a placeholder image at `public/images/fallback.png` that loads locally in dev and in production builds.
- (Optional) For real venue images, drop JPG/PNG files into `public/images/` and replace the `image:` and `gallery:` fields accordingly.
- Consider adding `onError` fallbacks on `<img>` tags in `LocationCard.tsx` and `LocationModal.tsx` for extra resilience.
