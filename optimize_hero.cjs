const sharp = require('h:/K-market/node_modules/sharp');

const srcPath = 'h:\\K-market\\public\\images\\hero.webp';
const destPath = 'h:\\K-market\\public\\images\\hero-desktop.webp';

async function generateZoomedOutImage() {
  try {
    // 1. 원본 이미지를 배경으로 사용하기 위해 로드
    const background = sharp(srcPath);

    // 2. 오버레이용으로 원본을 768x768로 축소 (25% 축소)
    const overlayResized = await sharp(srcPath)
      .resize({ width: 768, height: 768 })
      .toBuffer();

    // 3. 오버레이의 좌측 경계선(x=0 ~ x=300)을 부드럽게 페이드아웃하기 위한 SVG 마스크 생성
    const svgMask = Buffer.from(`
      <svg width="768" height="768">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="white" stop-opacity="0" />
            <stop offset="10%" stop-color="white" stop-opacity="0" />
            <stop offset="35%" stop-color="white" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="768" height="768" fill="url(#grad)" />
      </svg>
    `);

    // 4. 오버레이 이미지에 SVG 마스크 적용 (dest-in)
    const maskedOverlay = await sharp(overlayResized)
      .composite([{
        input: svgMask,
        blend: 'dest-in'
      }])
      .toBuffer();

    // 5. 배경 위에 마스킹된 오버레이를 우측 하단에 합성
    const composited = await background
      .composite([{
        input: maskedOverlay,
        top: 256,
        left: 256
      }])
      .toBuffer();

    // 6. 데스크톱용 규격(y=430 ~ y=980)으로 최종 크롭하여 저장
    await sharp(composited)
      .extract({ left: 0, top: 430, width: 1024, height: 550 })
      .toFile(destPath);

    console.log('Optimized 25% zoomed out image with soft gradient blending created successfully!');
  } catch (err) {
    console.error('Error in image composition:', err);
  }
}

generateZoomedOutImage();
