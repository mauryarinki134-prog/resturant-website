import { useEffect, useRef } from 'react';

export function CanvasAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameCount = 240;

    const currentFrame = (index: number) => `/frames/frame_${index.toString().padStart(6, '0')}.jpg`;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            imagesRef.current[i] = img;
        }

        // Setup first image to get dimensions
        const firstImg = new Image();
        firstImg.src = currentFrame(1);
        firstImg.onload = () => {
            canvas.width = firstImg.width;
            canvas.height = firstImg.height;
            context.drawImage(firstImg, 0, 0);
        };

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
            
            // Avoid division by zero if page is not scrollable yet
            if (maxScrollTop <= 0) return;
            
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollFraction * frameCount)
            );
            
            const safeIndex = Math.max(1, frameIndex);

            requestAnimationFrame(() => {
                const img = imagesRef.current[safeIndex];
                if (img && img.complete) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial draw in case we are already scrolled
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-10] pointer-events-none">
            <canvas 
                ref={canvasRef} 
                className="absolute top-1/2 left-1/2 min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 object-cover"
            />
            {/* Optional overlay to make text more readable */}
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
    );
}
