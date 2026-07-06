import { cellsData } from './data.js';
import { openModal, initModalEvents } from './modal.js';

// Инициализация обработчиков модалки
initModalEvents();

// Координаты тропы во фрейме: x: 80, y: 1714, width: 1160, height: 5982
// Размер фрейма: 1440x8772
const trailX = 80 / 1440 * 100; // 5.56%
const trailY = 1714 / 8772 * 100; // 19.54%
const trailWidth = 1160 / 1440 * 100; // 80.56%
const trailHeight = 5982 / 8772 * 100; // 68.20%

// === ИСПРАВЛЕННЫЕ КООРДИНАТЫ ЦЕНТРОВ ЯЧЕЕК ===
const cellCenters = [
  { x: 931, y: 1985 },
  { x: 872, y: 2230 },
  { x: 596, y: 2348 },
  { x: 425, y: 2535 },
  { x: 389, y: 2770 },
  { x: 572, y: 2935 },
  { x: 778, y: 3022 },
  { x: 1030, y: 3178 },
  { x: 1065, y: 3360 },
  { x: 999, y: 3510 },
  { x: 743, y: 3628 },
  { x: 523, y: 3754 },
  { x: 345, y: 3915 },
  { x: 250, y: 4170 },
  { x: 350, y: 4320 },
  { x: 592, y: 4320 },
  { x: 870, y: 4295 },
  { x: 927, y: 4560 },
  { x: 777, y: 4750 },
  { x: 551, y: 4920 },
  { x: 445, y: 5125 },
  { x: 382, y: 5338 },
  { x: 398, y: 5541 },
  { x: 709, y: 5605 },
  { x: 980, y: 5680 },
  { x: 1075, y: 5865 },
  { x: 1037, y: 6050 },
  { x: 940, y: 6235 },
  { x: 746, y: 6440 },
  { x: 649, y: 6600 },
  { x: 477, y: 6825 },
  { x: 480, y: 7065 },
  { x: 670, y: 7320 },
];

// === ОРИГИНАЛЬНЫЕ РАЗМЕРЫ ЯЧЕЕК ===
const cellSizes = [
  { w: 290, h: 250 },
  { w: 275, h: 182 },
  { w: 338, h: 297 },
  { w: 337, h: 293 },
  { w: 288, h: 279 },
  { w: 255, h: 256 },
  { w: 300, h: 246 },
  { w: 257, h: 167 },
  { w: 310, h: 186 },
  { w: 289, h: 208 },
  { w: 327, h: 240 },
  { w: 292, h: 202 },
  { w: 331, h: 245 },
  { w: 245, h: 285 },
  { w: 255, h: 298 },
  { w: 217, h: 325 },
  { w: 288, h: 250 },
  { w: 288, h: 306 },
  { w: 346, h: 183 },
  { w: 338, h: 163 },
  { w: 354, h: 218 },
  { w: 318, h: 217 },
  { w: 224, h: 235 },
  { w: 294, h: 300 },
  { w: 258, h: 232 },
  { w: 323, h: 171 },
  { w: 300, h: 207 },
  { w: 351, h: 185 },
  { w: 333, h: 154 },
  { w: 358, h: 171 },
  { w: 402, h: 239 },
  { w: 361, h: 306 },
  { w: 320, h: 270 },
];

// === ТОНКАЯ НАСТРОЙКА СМЕЩЕНИЯ ===
const offsetX = 0.0;
const offsetY = 0.0;

// Функция для конвертации пикселей в проценты
function pxToPercent(px, total) {
  return (px / total) * 100;
}

// Генерация ячеек тропы
function generateTrailCells() {
  const container = document.querySelector('.trail-container');
  
  const existingCells = container.querySelectorAll('.trail-cell');
  existingCells.forEach(cell => cell.remove());
  
  cellsData.forEach((cell, index) => {
    const center = cellCenters[index] || cellCenters[0];
    const size = cellSizes[index] || cellSizes[0];
    
    const button = document.createElement('button');
    button.className = 'trail-cell absolute';
    button.setAttribute('data-index', index);
    
    const xPercent = pxToPercent(center.x, 1440);
    const yPercent = pxToPercent(center.y, 8772);
    
    const wPercent = pxToPercent(size.w, 1440);
    const hPercent = pxToPercent(size.h, 8772);
    
    let relativeX = ((xPercent - trailX) / trailWidth) * 100;
    let relativeY = ((yPercent - trailY) / trailHeight) * 100;
    
    relativeX += offsetX;
    relativeY += offsetY;
    
    const relativeW = (wPercent / trailWidth) * 100;
    const relativeH = (hPercent / trailHeight) * 100;
    
    const leftPos = relativeX - (relativeW / 2);
    const topPos = relativeY - (relativeH / 2);
    
    button.style.left = `${leftPos}%`;
    button.style.top = `${topPos}%`;
    button.style.width = `${relativeW}%`;
    button.style.height = `${relativeH}%`;
    
    const img = document.createElement('img');
    const cellNumber = index + 1;
    
    if (cellNumber === 33) {
      img.src = 'assets/images/vectors/logo-hermitage-trail.svg';
      img.alt = 'Логотип Эрмитажа';
      img.style.objectFit = 'contain';
      img.style.padding = '10%';
    } else {
      img.src = `assets/images/cells/${cellNumber}_4x.webp`;
      img.alt = `Ячейка ${cellNumber}`;
    }
    
    img.loading = 'lazy';
    img.draggable = false;
    
    button.appendChild(img);
    
    button.addEventListener('click', () => {
      openModal(index);
    });
    
    container.appendChild(button);
  });
}

document.addEventListener('DOMContentLoaded', generateTrailCells);