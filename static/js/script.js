// 导航栏切换功能
document.querySelectorAll('.nav-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const navItem = this.parentElement;
        const isOpening = !navItem.classList.contains('active');

        // 切换当前项状态
        navItem.classList.toggle('active');

        // 关闭其他打开的导航项
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item !== navItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
});

// 图片轮播功能
let currentImageIndex = 0;
const images = document.querySelectorAll('.image-gallery img');

function showNextImage() {
    if(images.length > 1) {
        images[currentImageIndex].style.transform = 'translateX(-100%)';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.transform = 'translateX(0)';
    }
}

// 自动轮播（多图时启用）
if(images.length > 1) {
    setInterval(showNextImage, 3000);
}