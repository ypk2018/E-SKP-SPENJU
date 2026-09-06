import React from 'react';

interface LogoSekolahProps {
  customLogoUrl?: string;
  className?: string;
  size?: number;
  alt?: string;
}

/**
 * Komponen Logo Sekolah Resmi
 * Jika pengguna mengunggah logo sendiri (customLogoUrl), maka gambar tersebut yang ditampilkan.
 * Jika belum mengunggah, menampilkan Lambang Sekolah Tut Wuri Handayani / SMP Negeri 7 Sentani SVG berkualitas tinggi.
 */
export const LogoSekolah: React.FC<LogoSekolahProps> = ({
  customLogoUrl,
  className = 'w-24 h-24 mx-auto',
  size,
  alt = 'Logo Resmi Sekolah SMP Negeri 7 Sentani',
}) => {
  const style = size ? { width: size, height: size } : undefined;

  if (customLogoUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <img
          src={customLogoUrl}
          alt={alt}
          className="max-h-full max-w-full object-contain drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Lambang Resmi Tut Wuri Handayani Pendidikan / SMP Negeri 7 Sentani SVG
  return (
    <div className={`flex items-center justify-center ${className}`} style={style}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lambang Sekolah SMP Negeri 7 Sentani Tut Wuri Handayani"
      >
        <defs>
          <linearGradient id="sekolahNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="sekolahGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
        </defs>

        {/* Lingkaran Luar Biru Keemasan */}
        <circle cx="200" cy="200" r="190" fill="url(#sekolahNavyGrad)" stroke="url(#sekolahGoldGrad)" strokeWidth="6" />
        <circle cx="200" cy="200" r="176" fill="none" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 4" />

        {/* Teks Lingkar Atas & Bawah */}
        <path id="textPathTop" d="M 45 200 A 155 155 0 0 1 355 200" fill="none" />
        <text fill="#FEF08A" fontSize="19" fontWeight="bold" letterSpacing="3" textAnchor="middle">
          <textPath href="#textPathTop" startOffset="50%">
            SMP NEGERI 7 SENTANI
          </textPath>
        </text>

        <path id="textPathBottom" d="M 355 200 A 155 155 0 0 1 45 200" fill="none" />
        <text fill="#E2E8F0" fontSize="16" fontWeight="bold" letterSpacing="3.5" textAnchor="middle">
          <textPath href="#textPathBottom" startOffset="50%">
            TUT WURI HANDAYANI
          </textPath>
        </text>

        {/* Bintang Emas Samping */}
        <polygon points="40,200 45,208 55,208 47,214 50,224 40,218 30,224 33,214 25,208 35,208" fill="url(#sekolahGoldGrad)" />
        <polygon points="360,200 365,208 375,208 367,214 370,224 360,218 350,224 353,214 345,208 355,208" fill="url(#sekolahGoldGrad)" />

        {/* Segi Lima / Perisai Pendidikan */}
        <polygon
          points="200,68 318,154 273,292 127,292 82,154"
          fill="#1E40AF"
          stroke="url(#sekolahGoldGrad)"
          strokeWidth="4"
        />

        {/* Sayap Pendidikan Kiri & Kanan (Tut Wuri Handayani) */}
        {/* Sayap Kiri */}
        <path
          d="M 200 240 C 170 230 130 200 110 160 C 135 175 160 190 200 210 Z"
          fill="url(#sekolahGoldGrad)"
          stroke="#78350F"
          strokeWidth="1"
        />
        <path
          d="M 200 240 C 160 250 130 235 100 200 C 130 215 165 225 200 230 Z"
          fill="url(#sekolahGoldGrad)"
          stroke="#78350F"
          strokeWidth="1"
        />

        {/* Sayap Kanan */}
        <path
          d="M 200 240 C 230 230 270 200 290 160 C 265 175 240 190 200 210 Z"
          fill="url(#sekolahGoldGrad)"
          stroke="#78350F"
          strokeWidth="1"
        />
        <path
          d="M 200 240 C 240 250 270 235 300 200 C 270 215 235 225 200 230 Z"
          fill="url(#sekolahGoldGrad)"
          stroke="#78350F"
          strokeWidth="1"
        />

        {/* Buku Terbuka (Simbol Ilmu Pengetahuan) */}
        <path
          d="M 200 242 C 180 232 150 232 130 240 L 130 220 C 150 212 180 212 200 222 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <path
          d="M 200 242 C 220 232 250 232 270 240 L 270 220 C 250 212 220 212 200 222 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <line x1="200" y1="222" x2="200" y2="243" stroke="#1E293B" strokeWidth="2" />

        {/* Obor Menyala (Semangat Belajar Pantang Padam) */}
        {/* Tangkai Obor */}
        <polygon points="196,220 204,220 201,175 199,175" fill="url(#sekolahGoldGrad)" stroke="#78350F" strokeWidth="1" />
        <ellipse cx="200" cy="175" rx="10" ry="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />

        {/* Api Obor */}
        <path
          d="M 200 173 C 185 160 190 135 200 115 C 210 135 215 160 200 173 Z"
          fill="url(#fireGrad)"
        />
        <path
          d="M 200 170 C 192 162 195 145 200 132 C 205 145 208 162 200 170 Z"
          fill="#FEF08A"
        />

        {/* Bintang Kejora di Puncak */}
        <polygon
          points="200,82 203,92 214,92 205,98 208,108 200,102 192,108 195,98 186,92 197,92"
          fill="url(#sekolahGoldGrad)"
          stroke="#92400E"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
