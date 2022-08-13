const newsModel = require('./news.mongo')

const DEFAULT_LATEST_ID = 0

const news = {
    title: 'Harga Mie Instan Naik 3 Kali Lipat?',
    mksa: 'Intinya… Menteri Pertanian Syahrul Yasin Limpo mengungkapkan bakal ada dampak besar dari perang antara Rusia dan Ukraina, salah satunya adalah kenaikan harga mie instan 3 (tiga) kali lipat.',
    content: `Menteri Pertanian Syahrul Yasin Limpo mengungkapkan bakal ada dampak besar dari perang antara Rusia dan Ukraina, salah satunya adalah kenaikan harga mie instan. Ia memprediksi nilai kenaikannya bakal terasa signifikan dari yang terjadi saat ini.

    "Belum selesai dengan climate change, kita dihadapkan Perang Ukraina-Rusia, dimana ada 180 juta ton gandum gak bisa keluar, jadi hati-hati yang makan mie banyak dari gandum, besok harganya (naik) 3x lipat," katanya dalam webinar Direktorat Jenderal Tanaman Pangan, Senin (8/8/22).
    
    Kenaikan harga itu otomatis bakal terjadi karena bahan baku mie instan tersebut sangat bergantung pada impor. "Saya bicara ekstrem aja, ada gandum tapi harganya mahal banget. Sementara kita impor terus," kata Syahrul.
    
    Rusia dan Ukraina merupakan negara penghasil gandum terbesar dunia. Kedua negara menyuplai sekitar 30-40% dari kebutuhan gandum dunia. Dengan situasi perang saat ini, gandum menjadi langka karena pasokan terhambat. Sementara gandum adalah salah satu bahan baku mie instan. Alhasil, kenaikan harga gandum di pasar internasional otomatis ikut mengerek harga mie instan di dalam negeri.
    
    Sebelumnya, detikFinance mengabarkan Presiden Joko Widodo (Jokowi) dan Kepala Staf Kepresidenan, Moeldoko juga sudah mewanti-wanti adanya kenaikan harga mie instan di pasaran. Hal ini tidak bisa dihindari. "Harga Supermie, Indomie, tetek bengek mie-mie itu akan naik, gak bisa dihindari," kata Moeldoko dalam Seminar Wawasan Kebangsaan: Strategi Pemerintahan Jokowi Menjaga Keseimbangan Stabilitas & Keterbukaan di Era Disrupsi Informasi beberapa waktu yang lalu.
    
    Seorang pegawai minimarket di Tendean, Jakarta Selatan menginformasikan harga mie instan sudah pasti akan naik. "Sekarang sih (yang dijual di rak toko) masih harga sebelumnya, habiskan stok," katanya.
    "Naiknya mungkin nanti sekitar Rp300-500 per bungkus. Sudah gak ada lagi mie instan yang Rp2.000" lanjutnya.
    
    Untuk saat ini harga mie instan di E-commerce dijual mulai dari Rp2.000-Rp3.050 tergantung jenis mie dan tokonya. Sedangkan untuk harga mie instan di Indomaret mulai dari Rp3.000 ke atas.`,
    date: new Date().toLocaleDateString('id'),
    autor: 'Assami Muzaki',
    newsId: 1
}

async function firstNews(data){
    const allDocs = await newsModel.find()
    if (!allDocs){
        return saveNews(data)
    }
    return
}

async function saveNews(data){
    await newsModel.create(data)
}

async function getLatestDoc(){
    const allDocs = await newsModel.find()
    if (!allDocs){
        return DEFAULT_LATEST_ID
    }
    return allDocs.length; 
}

async function addNewNews(data){
    const newData = Object.assign(data, {
        date: new Date().toLocaleDateString('id'),
        autor: 'Assami Muzaki',
        newsId: await getLatestDoc() + 1
    })
    saveNews(newData)
}

module.exports = {
    addNewNews,
}
