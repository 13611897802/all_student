// 年份导航栏功能
class YearNavigation {
    constructor() {
        this.years = [];
        this.visibleCount = 4; // 前四个年份直接显示
        this.init();
    }

    async init() {
        try {
            await this.loadYears();
            this.renderNavigation();
            this.bindEvents();
        } catch (error) {
            console.error('加载年份数据失败:', error);
            this.showError();
        }
    }

    async loadYears() {
        const response = await fetch('static/template/years.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.years = data.years;
    }

    renderNavigation() {
        const navContainer = document.getElementById('yearNav');
        if (!navContainer) return;

        // 清空容器
        navContainer.innerHTML = '';

        // 创建年份导航容器
        const yearNavContainer = document.createElement('div');
        yearNavContainer.className = 'year-nav-container';

        // 添加前四个年份按钮
        this.years.slice(0, this.visibleCount).forEach(year => {
            const yearButton = this.createYearButton(year);
            yearNavContainer.appendChild(yearButton);
        });

        // 如果有更多年份，添加"更多"按钮
        if (this.years.length > this.visibleCount) {
            const moreButton = this.createMoreButton();
            yearNavContainer.appendChild(moreButton);
        }

        navContainer.appendChild(yearNavContainer);
    }

    createYearButton(yearData) {
        const button = document.createElement('a');
        button.href = `static/template/${yearData.url}`;
        button.className = 'year-button';
        button.textContent = yearData.title;
        button.title = `跳转到${yearData.title}页面`;
        return button;
    }

    createMoreButton() {
        const moreButton = document.createElement('button');
        moreButton.className = 'more-button';
        moreButton.textContent = '更多年份';
        moreButton.title = '点击展开更多年份';

        // 创建下拉菜单
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';

        // 添加隐藏的年份到下拉菜单
        this.years.slice(this.visibleCount).forEach(year => {
            const dropdownItem = document.createElement('a');
            dropdownItem.href = `static/template/${year.url}`;
            dropdownItem.className = 'dropdown-item';
            dropdownItem.textContent = year.title;
            dropdownItem.title = `跳转到${year.title}页面`;
            dropdownMenu.appendChild(dropdownItem);
        });

        moreButton.appendChild(dropdownMenu);
        return moreButton;
    }

    bindEvents() {
        // 绑定"更多"按钮点击事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('more-button')) {
                this.toggleDropdown(e.target);
            }
        });

        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.more-button')) {
                this.closeAllDropdowns();
            }
        });

        // ESC键关闭下拉菜单
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    toggleDropdown(button) {
        const dropdown = button.querySelector('.dropdown-menu');
        const isActive = dropdown.classList.contains('active');

        // 关闭所有其他下拉菜单
        this.closeAllDropdowns();

        // 切换当前下拉菜单
        if (!isActive) {
            dropdown.classList.add('active');
            button.classList.add('active');
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
        document.querySelectorAll('.more-button').forEach(button => {
            button.classList.remove('active');
        });
    }

    showError() {
        const navContainer = document.getElementById('yearNav');
        if (navContainer) {
            navContainer.innerHTML = `
                <div style="color: #f44336; padding: 20px; text-align: center;">
                    <p>加载年份数据失败，请刷新页面重试</p>
                </div>
            `;
        }
    }
}

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

// 页面加载完成后初始化年份导航
document.addEventListener('DOMContentLoaded', () => {
    new YearNavigation();
});