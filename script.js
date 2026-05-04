// ============================================
// DATA PAKET STATIS (belum termasuk PPN 11%)
// ============================================
const dataPaket = {
    'internet-saja': {
        title: 'Internet Saja',
        icon: 'radio',
        subtitle: 'Biaya pasang baru Rp 99.000 (sekali bayar) · Harga belum termasuk PPN 11%',
        items: [
            { speed: '20 Mbps', harga: 170000 },
            { speed: '50 Mbps', harga: 230000 },
            { speed: '75 Mbps', harga: 250000, populer: true },
            { speed: '150 Mbps', harga: 325000 },
            { speed: '200 Mbps', harga: 490000 },
        ]
    },
    'internet-stb': {
        title: 'Internet + STB TV',
        icon: 'monitor-play',
        subtitle: 'Biaya pasang baru Rp 99.000 (sekali bayar) · Harga belum termasuk PPN 11% (Pemasangan dengan deposit yang di bayar di muka)',
        items: [
            { speed: '50 Mbps', harga: 345000 },
            { speed: '75 Mbps', harga: 365000, populer: true },
            { speed: '150 Mbps', harga: 460000 },
            { speed: '200 Mbps', harga: 625000 },
        ]
    },
    'internet-kuota': {
        title: 'Internet + Kuota 15GB',
        icon: 'signal',
        subtitle: 'Biaya pasang baru Rp 99.000 + Kuota 15GB · Harga belum termasuk PPN 11%',
        items: [
            { speed: '50 Mbps', harga: 270000 },
            { speed: '75 Mbps', harga: 285000, populer: true },
            { speed: '150 Mbps', harga: 355000 },
            { speed: '300 Mbps', harga: 888000 },
        ]
    },
    'internet-game': {
        title: 'IndiHome + Game',
        icon: 'gamepad-2',
        subtitle: 'Biaya pasang baru Rp 99.000 (sekali bayar) · Harga belum termasuk PPN 11%',
        items: [
            { speed: '50 Mbps', harga: 290000 },
            { speed: '75 Mbps', harga: 310000, populer: true },
            { speed: '150 Mbps', harga: 385000 },
            { speed: '200 Mbps', harga: 550000 },
        ]
    }
};

// ============================================
// UTILITIES
// ============================================
function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ============================================
// MODAL LOGIC
// ============================================
function bukaModal(kategori) {
    const data = dataPaket[kategori];
    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalSubtitle').innerText = data.subtitle;

    let html = '';
    data.items.forEach(item => {
        const hargaFmt = formatRupiah(item.harga);
        const populerBadge = item.populer
            ? '<span style="font-size:10px; background:#e60000; color:white; padding:2px 10px; border-radius:50px; margin-left:8px; font-weight:700;">Populer</span>'
            : '';
        const bgStyle = item.populer
            ? 'background:#fff5f5; border:2px solid #ffcccc;'
            : 'background:#f8f9fa; border:1px solid #e8e8e8;';

        const pesanText = encodeURIComponent(
            `Halo, saya ingin pasang IndiHome di Yogyakarta\n\n` +
            `*Paket*: ${data.title} ${item.speed}\n` +
            `*Harga*: ${hargaFmt}/bulan (belum termasuk PPN 11%)\n\n` +
            `Mohon info ketersediaan jaringan di lokasi saya. Terima kasih!`
        );

        html += `
        <div style="${bgStyle} border-radius:12px; padding:14px 16px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
            <div>
                <div style="font-size:15px; font-weight:800; color:#0a0a0a; display:flex; align-items:center; flex-wrap:wrap; gap:4px; margin-bottom:4px;">
                    ${item.speed} ${populerBadge}
                </div>
                <div style="font-size:18px; font-weight:900; color:#e60000;">${hargaFmt}<span style="font-size:11px; font-weight:500; color:#666;">/bln</span></div>
                <div style="font-size:11px; color:#e60000; margin-top:2px; font-weight:600;">
                    *Belum termasuk PPN 11% ${kategori === 'internet-stb' ? '& Biaya Jaminan Deposit' : ''}
                </div>
            </div>
            <a href="https://wa.me/6285187414484?text=${pesanText}" target="_blank" style="text-decoration:none;">
                <button style="background:#e60000; color:white; border:none; padding:10px 18px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; flex-shrink:0; white-space:nowrap;">
                    Pilih Paket
                </button>
            </a>
        </div>`;
    });

    document.getElementById('modalListContainer').innerHTML = html;
    document.getElementById('paketModal').style.display = 'flex';
}

function tutupModal() {
    document.getElementById('paketModal').style.display = 'none';
}

// ============================================
// KIRIM WA - CEK JARINGAN
// ============================================
function kirimWA() {
    const nama   = (document.getElementById('nama').value || '').trim();
    const alamat = (document.getElementById('alamat').value || '').trim();
    const lokasi = (document.getElementById('lokasi').value || '').trim();
    const paket  = (document.getElementById('paket').value || '').trim();
    const hp     = (document.getElementById('hp').value || '').trim();

    if (!nama || !alamat || !hp) {
        alert('Mohon isi Nama, Alamat, dan Nomor HP terlebih dahulu.');
        return;
    }

    const teks =
        'Halo, saya ingin cek ketersediaan jaringan IndiHome di Yogyakarta\n\n' +
        'Nama      : ' + nama + '\n' +
        'Alamat    : ' + alamat + '\n' +
        'Lokasi    : ' + (lokasi || '-') + '\n' +
        'Paket     : ' + (paket || 'Belum ditentukan') + '\n' +
        'No HP     : ' + hp + '\n\n' +
        'Mohon dicek ketersediaan jaringannya. Terima kasih!';

    window.location.href = 'https://wa.me/6285187414484?text=' + encodeURIComponent(teks);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons
    lucide.createIcons();

    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isOpen) item.classList.add('active');
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('paketModal');
        if (e.target === modal) tutupModal();
    });

    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.paket-card, .cara-step, .faq-item, .fitur-item').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});
