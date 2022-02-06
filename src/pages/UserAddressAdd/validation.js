const rules = {
  nama_alamat: {
    required: { value: true, message: "nama alamat Harus diisi" },
    maxlenght: { value: 500, message: "Panjang alamat maksimal 500 karakter" },
    minlenght: { value: 5, message: "Panjang alamat minimal 5 karakter" },
  },
  provinsi: {
    required: { value: true, message: " Provinsi Harus diisi" },
  },
  kabupaten: {
    required: { value: true, message: " kabupaten Harus diisi" },
  },
  kecamatan: {
    required: { value: true, message: " kecamatan Harus diisi" },
  },
  kelurahan: {
    required: { value: true, message: "kelurahan Harus diisi" },
  },
  detail_alamat: {
    required: { value: true, message: "detail alamat Harus diisi" },
    maxlenght: {
      value: 1000,
      message: "Panjang detail alamat maksimal 1000 karakter",
    },
  },
};

export { rules };
