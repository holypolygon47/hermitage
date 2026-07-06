import { cellsData } from './data.js';

// DOM элементы модалки
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalAuthor = document.getElementById('modalAuthor');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalCounter = document.getElementById('modalCounter');

let currentIndex = 0;

// Открытие модалки
export function openModal(index) {
  currentIndex = index;
  renderModalData(index);
  updateNavigationButtons();
  modalOverlay.classList.remove('hidden');
  modalOverlay.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

// Закрытие модалки
export function closeModal() {
  modalOverlay.classList.add('hidden');
  modalOverlay.classList.remove('flex');
  document.body.style.overflow = '';
}

// Рендер данных
function renderModalData(index) {
  const data = cellsData[index];
  if (!data) return;
  
  modalTitle.textContent = data.modalTitle || 'Без названия';
  modalImage.src = data.imageSrc || 'https://via.placeholder.com/600x400?text=No+Image';
  modalImage.alt = data.modalTitle || 'Картина';
  modalImage.style.objectFit = 'contain'; // Чтобы картинка отображалась полностью
  modalAuthor.textContent = data.imageAuthor || 'Неизвестный автор';
  modalDescription.textContent = data.descriptionText || 'Описание отсутствует.';
  modalCounter.textContent = `${index + 1} / ${cellsData.length}`;
}

// Обновление кнопок навигации
function updateNavigationButtons() {
  modalPrev.style.display = currentIndex === 0 ? 'none' : 'flex';
  modalNext.style.display = currentIndex === cellsData.length - 1 ? 'none' : 'flex';
}

// Переключение на следующую ячейку
export function nextCell() {
  if (currentIndex < cellsData.length - 1) {
    currentIndex++;
    renderModalData(currentIndex);
    updateNavigationButtons();
  }
}

// Переключение на предыдущую ячейку
export function prevCell() {
  if (currentIndex > 0) {
    currentIndex--;
    renderModalData(currentIndex);
    updateNavigationButtons();
  }
}

// Инициализация обработчиков событий
export function initModalEvents() {
  // Закрытие по крестику
  modalClose.addEventListener('click', closeModal);
  
  // Закрытие по оверлею
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight' && !modalOverlay.classList.contains('hidden')) nextCell();
    if (e.key === 'ArrowLeft' && !modalOverlay.classList.contains('hidden')) prevCell();
  });
  
  // Кнопки навигации
  modalPrev.addEventListener('click', prevCell);
  modalNext.addEventListener('click', nextCell);
}