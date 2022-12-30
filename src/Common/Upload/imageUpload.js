export const checkImage = (file) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File không tồn tại.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "Kích thước ảnh không được quá 1mb";

  if (!types.includes(file.type)) err = "Ảnh phải có định dạng png/jpg";

  return err;
};

export const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "qpmm8yzq");
  formData.append("cloud_name", "truongdev");

  const res = await fetch("https://api.cloudinary.com/v1_1/truongdev/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
