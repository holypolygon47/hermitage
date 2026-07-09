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
  { x: 920, y: 1995 }, //1
  { x: 852, y: 2220 }, //2
  { x: 596, y: 2378 }, //3
  { x: 405, y: 2565 }, //4
  { x: 415, y: 2813 }, //5
  { x: 572, y: 2945 }, //6
  { x: 780, y: 3050 }, //7
  { x: 1020, y: 3195 }, //8
  { x: 1062, y: 3372 }, //9
  { x: 990, y: 3515 }, //10
  { x: 750, y: 3675 }, //11
  { x: 535, y: 3797 }, //12
  { x: 345, y: 3927 }, //13
  { x: 255, y: 4175 }, //14
  { x: 353, y: 4320 }, //15
  { x: 592, y: 4310 }, //16
  { x: 870, y: 4295 }, //17
  { x: 925, y: 4560 }, //18
  { x: 777, y: 4747 }, //19
  { x: 565, y: 4920 }, //20
  { x: 459, y: 5110 }, //21
  { x: 395, y: 5308 }, //22
  { x: 415, y: 5505 }, //23
  { x: 709, y: 5600 }, //24
  { x: 980, y: 5663 }, //25
  { x: 1075, y: 5865 }, //26
  { x: 1037, y: 6045 }, //27
  { x: 933, y: 6233 }, //28
  { x: 753, y: 6437 }, //29
  { x: 646, y: 6592 }, //30
  { x: 477, y: 6812 }, //31
  { x: 489, y: 7035 }, //32
  { x: 670, y: 7320 }, //33
];

const cellSizes = [
  { w: 250, h: 215 },  // 1
  { w: 235, h: 155 },  // 2
  { w: 290, h: 255 },  // 3
  { w: 290, h: 252 },  // 4
  { w: 248, h: 240 },  // 5
  { w: 220, h: 220 },  // 6
  { w: 258, h: 212 },  // 7
  { w: 220, h: 143 },  // 8
  { w: 267, h: 160 },  // 9
  { w: 248, h: 178 },  // 10
  { w: 280, h: 206 },  // 11
  { w: 250, h: 173 },  // 12
  { w: 285, h: 210 },  // 13
  { w: 210, h: 245 },  // 14
  { w: 220, h: 256 },  // 15
  { w: 186, h: 280 },  // 16
  { w: 248, h: 215 },  // 17
  { w: 248, h: 263 },  // 18
  { w: 298, h: 157 },  // 19
  { w: 290, h: 140 },  // 20
  { w: 305, h: 187 },  // 21
  { w: 273, h: 186 },  // 22
  { w: 192, h: 202 },  // 23
  { w: 253, h: 258 },  // 24
  { w: 222, h: 200 },  // 25
  { w: 278, h: 147 },  // 26
  { w: 258, h: 178 },  // 27
  { w: 302, h: 159 },  // 28
  { w: 286, h: 132 },  // 29
  { w: 308, h: 147 },  // 30
  { w: 346, h: 205 },  // 31
  { w: 310, h: 263 },  // 32
  { w: 320, h: 270 },  // 33 
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