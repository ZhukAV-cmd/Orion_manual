document.addEventListener('DOMContentLoaded', function() {
    function createDropdownMenus() {
        const tabs = document.querySelectorAll('.md-tabs__item');
        
        tabs.forEach(tab => {
            const tabLink = tab.querySelector('.md-tabs__link');
            if (!tabLink) return;
            
            const tabText = tabLink.textContent.trim();
            const navSections = document.querySelectorAll('.md-nav__item');
            let dropdownContent = '';
            
            // Ищем соответствующий раздел в боковой навигации
            navSections.forEach(section => {
                const sectionLink = section.querySelector('.md-nav__link');
                if (sectionLink && sectionLink.textContent.trim() === tabText) {
                    const subItems = section.querySelectorAll('.md-nav__item .md-nav__link');
                    subItems.forEach(item => {
                        if (item.href && !item.closest('.md-nav__item--nested')) {
                            dropdownContent += `<a href="${item.href}">${item.textContent}</a>`;
                        }
                    });
                }
            });
            
            // Создаем выпадающее меню если есть содержимое
            if (dropdownContent) {
                const dropdown = document.createElement('div');
                dropdown.className = 'nav-dropdown';
                dropdown.innerHTML = dropdownContent;
                tab.appendChild(dropdown);
                
                // Добавляем обработчики событий
                tab.addEventListener('mouseenter', () => {
                    dropdown.style.display = 'block';
                    setTimeout(() => {
                        dropdown.style.opacity = '1';
                        dropdown.style.transform = 'translateY(0)';
                    }, 10);
                });
                
                tab.addEventListener('mouseleave', () => {
                    dropdown.style.opacity = '0';
                    dropdown.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (!dropdown.matches(':hover')) {
                            dropdown.style.display = 'none';
                        }
                    }, 300);
                });
                
                // Для мобильных устройств
                dropdown.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                });
            }
        });
    }
    
    // Инициализация после полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createDropdownMenus);
    } else {
        createDropdownMenus();
    }
});