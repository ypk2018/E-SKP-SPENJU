import React from 'react';

interface GarudaEmasProps {
  customLogoUrl?: string;
  className?: string;
  size?: number;
  alt?: string;
}

export const GarudaEmas: React.FC<GarudaEmasProps> = ({
  customLogoUrl,
  className = 'w-24 h-24 mx-auto',
  size,
  alt = 'Lambang Negara Republik Indonesia Garuda Pancasila',
}) => {
  const style = size ? { width: size, height: size } : undefined;

  if (customLogoUrl) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`} style={style}>
        <img
          src={customLogoUrl}
          alt={alt}
          className="max-h-full max-w-full object-contain drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={style}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lambang Negara Republik Indonesia Garuda Pancasila Emas"
      >
        <defs>
          {/* Gradients for Golden Feather & Body */}
          <linearGradient id="garudaGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="25%" stopColor="#F5B324" />
            <stop offset="50%" stopColor="#E29210" />
            <stop offset="75%" stopColor="#FBD44C" />
            <stop offset="100%" stopColor="#B36B00" />
          </linearGradient>

          <linearGradient id="garudaGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C98B12" />
            <stop offset="50%" stopColor="#8C4E00" />
            <stop offset="100%" stopColor="#5E3200" />
          </linearGradient>

          <linearGradient id="shieldRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B91C1C" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          <linearGradient id="shieldWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          <filter id="goldShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#78350F" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- SAYAP KIRI (17 Helai Bulu) --- */}
        <g id="sayap-kiri" fill="url(#garudaGoldLight)" stroke="url(#garudaGoldDark)" strokeWidth="1.5">
          <path d="M 235 220 C 200 190 140 160 50 110 C 65 140 85 170 115 195 C 75 165 40 150 25 140 C 45 180 75 210 110 235 C 70 205 35 195 20 190 C 40 230 75 260 115 280 C 70 255 35 250 20 250 C 45 285 85 315 130 330 C 85 310 50 310 35 315 C 65 345 105 365 155 375 C 105 365 70 370 55 380 C 95 400 145 405 195 400 C 150 405 120 415 110 425 C 155 430 195 420 230 400 Z" />
          {/* Rincian bulu terbang primer kiri */}
          <path d="M 120 190 C 180 230 220 250 235 265" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <path d="M 115 235 C 170 265 215 280 235 295" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <path d="M 120 280 C 170 300 210 315 235 325" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <path d="M 135 330 C 175 340 210 350 235 355" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
        </g>

        {/* --- SAYAP KANAN (17 Helai Bulu) --- */}
        <g id="sayap-kanan" fill="url(#garudaGoldLight)" stroke="url(#garudaGoldDark)" strokeWidth="1.5">
          <path d="M 265 220 C 300 190 360 160 450 110 C 435 140 415 170 385 195 C 425 165 460 150 475 140 C 455 180 425 210 390 235 C 430 205 465 195 480 190 C 460 230 425 260 385 280 C 430 255 465 250 480 250 C 455 285 415 315 370 330 C 415 310 450 310 465 315 C 435 345 395 365 345 375 C 395 365 430 370 445 380 C 405 400 355 405 305 400 C 350 405 380 415 390 425 C 345 430 305 420 270 400 Z" />
          {/* Rincian bulu terbang primer kanan */}
          <path d="M 380 190 C 320 230 280 250 265 265" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <path d="M 385 235 C 330 265 285 280 265 295" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <path d="M 380 280 C 330 300 290 315 265 325" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <path d="M 365 330 C 325 340 290 350 265 355" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
        </g>

        {/* --- EKOR (8 Helai Bulu) & PANGKAL EKOR (19 Helai) --- */}
        <g id="ekor" fill="url(#garudaGoldLight)" stroke="url(#garudaGoldDark)" strokeWidth="1.5">
          {/* Pangkal ekor */}
          <path d="M 215 380 C 215 410 205 430 180 460 C 210 450 235 440 250 435 C 265 440 290 450 320 460 C 295 430 285 410 285 380 Z" />
          {/* 8 Helai bulu ekor utama mekar ke bawah */}
          <path d="M 210 440 L 175 485 L 205 480 L 225 490 L 250 495 L 275 490 L 295 480 L 325 485 L 290 440 Z" />
          <line x1="250" y1="435" x2="250" y2="495" stroke="url(#garudaGoldDark)" strokeWidth="1.5" />
          <line x1="230" y1="438" x2="215" y2="485" stroke="url(#garudaGoldDark)" strokeWidth="1.2" />
          <line x1="270" y1="438" x2="285" y2="485" stroke="url(#garudaGoldDark)" strokeWidth="1.2" />
        </g>

        {/* --- KAKI & CAKAR MENCENGKERAM PITA --- */}
        <g id="cakar" fill="url(#garudaGoldLight)" stroke="url(#garudaGoldDark)" strokeWidth="2">
          {/* Cakar Kiri */}
          <path d="M 195 410 C 190 425 180 435 170 445 C 185 442 195 435 205 425 Z" />
          <circle cx="180" cy="442" r="4" fill="url(#garudaGoldDark)" />
          <circle cx="192" cy="443" r="4" fill="url(#garudaGoldDark)" />
          <circle cx="204" cy="440" r="4" fill="url(#garudaGoldDark)" />

          {/* Cakar Kanan */}
          <path d="M 305 410 C 310 425 320 435 330 445 C 315 442 305 435 295 425 Z" />
          <circle cx="320" cy="442" r="4" fill="url(#garudaGoldDark)" />
          <circle cx="308" cy="443" r="4" fill="url(#garudaGoldDark)" />
          <circle cx="296" cy="440" r="4" fill="url(#garudaGoldDark)" />
        </g>

        {/* --- PITA PUTIH "BHINNEKA TUNGGAL IKA" --- */}
        <g id="pita">
          {/* Lekukan ujung pita kiri */}
          <path d="M 80 455 L 110 435 L 125 465 L 95 475 Z" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
          <path d="M 80 455 L 95 475 L 70 480 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />

          {/* Lekukan ujung pita kanan */}
          <path d="M 420 455 L 390 435 L 375 465 L 405 475 Z" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
          <path d="M 420 455 L 405 475 L 430 480 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />

          {/* Pita Utama */}
          <path
            d="M 110 435 C 180 455 320 455 390 435 L 405 465 C 330 485 170 485 95 465 Z"
            fill="#FFFFFF"
            stroke="#334155"
            strokeWidth="1.5"
            filter="url(#goldShadow)"
          />
          {/* Teks Bhinneka Tunggal Ika */}
          <text
            x="250"
            y="462"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="2.5"
            fill="#0F172A"
          >
            BHINNEKA TUNGGAL IKA
          </text>
        </g>

        {/* --- LEHER & KEPALA (Menghadap ke Kanan) (45 Helai Bulu Leher) --- */}
        <g id="leher-kepala" fill="url(#garudaGoldLight)" stroke="url(#garudaGoldDark)" strokeWidth="1.5">
          {/* Bulu leher */}
          <path d="M 225 210 C 220 160 230 130 250 110 C 270 130 280 160 275 210 Z" />
          <path d="M 232 170 C 240 185 260 185 268 170" stroke="url(#garudaGoldDark)" strokeWidth="1" />
          <path d="M 236 195 C 244 205 256 205 264 195" stroke="url(#garudaGoldDark)" strokeWidth="1" />

          {/* Kepala & Jambul Emas Gagah */}
          <path d="M 240 120 C 240 85 260 65 280 50 C 278 70 290 75 305 70 C 295 85 300 95 315 95 C 295 105 285 115 280 130 Z" />
          {/* Paruh Mengarah ke Kanan */}
          <path d="M 275 90 C 295 90 320 95 335 105 C 315 115 295 120 275 120 C 285 110 285 100 275 90 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <path d="M 290 106 L 330 106" stroke="#92400E" strokeWidth="1.2" />

          {/* Mata Garuda */}
          <circle cx="270" cy="88" r="4.5" fill="#FFFFFF" stroke="#78350F" strokeWidth="1" />
          <circle cx="272" cy="88" r="2.2" fill="#1E293B" />
        </g>

        {/* --- PERISAI PANCASILA (Di Dada Garuda) --- */}
        <g id="perisai" filter="url(#goldShadow)">
          {/* Border Luar Perisai Emas */}
          <path
            d="M 180 200 L 320 200 C 320 280 300 350 250 385 C 200 350 180 280 180 200 Z"
            fill="#D97706"
            stroke="url(#garudaGoldLight)"
            strokeWidth="5"
          />
          {/* Garis batas dalam */}
          <path
            d="M 184 204 L 316 204 C 316 278 296 345 250 380 C 204 345 184 278 184 204 Z"
            fill="#1E293B"
            stroke="#FEF08A"
            strokeWidth="2"
          />

          {/* 4 Kuadran Perisai (Merah Putih Silang) */}
          {/* Kanan Atas: Merah (Kepala Banteng) */}
          <path d="M 250 204 L 316 204 C 316 242 310 275 295 290 L 250 290 Z" fill="url(#shieldRed)" />
          {/* Kiri Atas: Putih (Pohon Beringin) */}
          <path d="M 184 204 L 250 204 L 250 290 L 205 290 C 190 275 184 242 184 204 Z" fill="url(#shieldWhite)" />
          {/* Kiri Bawah: Merah (Padi dan Kapas) */}
          <path d="M 205 290 L 250 290 L 250 380 C 230 365 212 335 205 290 Z" fill="url(#shieldRed)" />
          {/* Kanan Bawah: Putih (Rantai Emas) */}
          <path d="M 250 290 L 295 290 C 288 335 270 365 250 380 Z" fill="url(#shieldWhite)" />

          {/* Garis Khatulistiwa Hitam Tebal Melintang */}
          <line x1="184" y1="290" x2="316" y2="290" stroke="#0F172A" strokeWidth="6" />

          {/* 1. Sila ke-2: Kanan Bawah (Rantai Emas) */}
          <g transform="translate(262, 312) scale(0.6)">
            <circle cx="20" cy="10" r="7" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <rect x="25" y="18" width="12" height="12" fill="none" stroke="#F59E0B" strokeWidth="3" rx="2" />
            <circle cx="40" cy="35" r="7" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <rect x="30" y="45" width="12" height="12" fill="none" stroke="#F59E0B" strokeWidth="3" rx="2" />
            <circle cx="15" cy="55" r="7" fill="none" stroke="#F59E0B" strokeWidth="3" />
          </g>

          {/* 2. Sila ke-3: Kiri Atas (Pohon Beringin) */}
          <g transform="translate(200, 218) scale(0.7)">
            {/* Daun beringin hijau */}
            <path
              d="M 25 15 C 10 15 5 25 10 35 C 0 40 5 55 18 55 C 15 65 35 68 40 60 C 45 68 65 65 62 55 C 75 55 80 40 70 35 C 75 25 70 15 55 15 C 50 5 30 5 25 15 Z"
              fill="#15803D"
              stroke="#166534"
              strokeWidth="1.5"
            />
            {/* Batang pohon beringin */}
            <path d="M 37 55 L 37 72 L 43 72 L 43 55 Z" fill="#78350F" />
            <path d="M 28 60 C 33 65 37 68 37 72" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 52 60 C 47 65 43 68 43 72" stroke="#78350F" strokeWidth="1.5" />
          </g>

          {/* 3. Sila ke-4: Kanan Atas (Kepala Banteng) */}
          <g transform="translate(262, 222) scale(0.65)">
            {/* Tanduk hitam */}
            <path d="M 12 18 C 8 8 20 0 35 5 C 28 10 22 18 25 24" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <path d="M 58 18 C 62 8 50 0 35 5 C 42 10 48 18 45 24" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            {/* Kepala Banteng */}
            <path
              d="M 22 22 C 22 16 48 16 48 22 C 55 30 52 50 45 62 C 40 70 30 70 25 62 C 18 50 15 30 22 22 Z"
              fill="#0F172A"
              stroke="#475569"
              strokeWidth="1.5"
            />
            {/* Moncong merah gelap */}
            <ellipse cx="35" cy="54" rx="9" ry="6" fill="#334155" />
            <circle cx="31" cy="54" r="1.5" fill="#0F172A" />
            <circle cx="39" cy="54" r="1.5" fill="#0F172A" />
            {/* Mata merah banteng */}
            <circle cx="27" cy="33" r="2.5" fill="#DC2626" />
            <circle cx="43" cy="33" r="2.5" fill="#DC2626" />
          </g>

          {/* 4. Sila ke-5: Kiri Bawah (Padi dan Kapas) */}
          <g transform="translate(202, 305) scale(0.65)">
            {/* Padi Kuning Kiri */}
            <path d="M 16 75 C 14 55 18 35 30 20" stroke="#CA8A04" strokeWidth="2" fill="none" />
            <ellipse cx="20" cy="65" rx="3.5" ry="2" fill="#FACC15" stroke="#A16207" strokeWidth="0.8" transform="rotate(-30 20 65)" />
            <ellipse cx="18" cy="52" rx="3.5" ry="2" fill="#FACC15" stroke="#A16207" strokeWidth="0.8" transform="rotate(-30 18 52)" />
            <ellipse cx="20" cy="40" rx="3.5" ry="2" fill="#FACC15" stroke="#A16207" strokeWidth="0.8" transform="rotate(-30 20 40)" />
            <ellipse cx="26" cy="28" rx="3.5" ry="2" fill="#FACC15" stroke="#A16207" strokeWidth="0.8" transform="rotate(-30 26 28)" />

            {/* Kapas Putih & Kelopak Hijau Kanan */}
            <circle cx="38" cy="62" r="4.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
            <circle cx="42" cy="48" r="4.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
            <circle cx="40" cy="34" r="4.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
          </g>

          {/* 5. Sila ke-1: Jantung Perisai / Bintang Emas Berlatar Hitam */}
          <g transform="translate(225, 265)">
            {/* Perisai kecil hitam */}
            <path
              d="M 5 0 L 45 0 C 45 25 38 42 25 50 C 12 42 5 25 5 0 Z"
              fill="#0F172A"
              stroke="#FDE047"
              strokeWidth="2"
            />
            {/* Bintang Emas Bersudut Lima */}
            <polygon
              points="25,8 29,20 42,20 32,28 35,40 25,32 15,40 18,28 8,20 21,20"
              fill="url(#garudaGoldLight)"
              stroke="#B45309"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
